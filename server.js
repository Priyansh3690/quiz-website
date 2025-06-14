const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const pool = require('./db');
const port = 3000;

//image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-z0-9.\-]/gi, '_');
    const uniqueName = Date.now() + '-' + safeName;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect('/user/index.html');
});


//for sign in 
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const resultForUsername = await pool.query('select * from "user" where username=$1', [username]);
  if (resultForUsername.rows.length > 0) {
    res.json({ username: 'uniqe' });
  } else {
    const resForEmail = await pool.query('select * from "user" where email=$1', [email]);

    if (resForEmail.rows.length > 0) {
      res.json({ email: 'uniqe' });
    } else {
      await pool.query('insert into "user"(username,email,pass) values($1,$2,$3)', [username, email, password]);
      res.json({ inserted: 'success' });
    }
  }
});

// for login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const resForPassword = await pool.query('select * from "user" where email=$1 AND pass=$2', [email, password]);
  if (resForPassword.rows.length == 0) {
    res.json({ password: 'Incorrect' });
  } else {
    res.json({ success: resForPassword.rows[0] });
  }
});

// send perticular User Info
app.post('/getPerticularUserInfo', async (req, res) => {
  const { userid } = req.body;
  const result = await pool.query(`
  SELECT 
    id, 
    username, 
    email, 
    TO_CHAR(date_time, 'DD Mon YYYY HH12:MI:SS AM') AS date_time 
  FROM 
    "user" 
  WHERE 
    id=$1 
  ORDER BY 
   date_time DESC;
`, [userid]);

  if (result.rowCount > 0) {
    return res.json({ success: result.rows[0] });
  }
  res.json({ not: 'Error:Somthing_Went_wrong' });
});

// for Admin login
app.post('/Adminlogin', async (req, res) => {
  const { email, password } = req.body;
  const resForPassword = await pool.query('select * from admin where email=$1 AND pass=$2', [email, password]);
  if (resForPassword.rows.length == 0) {
    res.json({ password: 'Incorrect' });
  } else {
    res.json({ success: resForPassword.rows[0] });
  }
});

//  for Add new category
app.post('/addcat', upload.single('image'), async (req, res) => {
  const { name, type } = req.body;
  const image = req.file;
  // console.log(category,type);
  if (!name) {
    return res.json({ category: 'Incorrect' });
  }
  if (!image) {
    return res.json({ img: 'Incorrect' });
  }
  else {
    const resforcategory = await pool.query('select * from category where name=$1;', [name]);
    if (resforcategory.rows.length > 0) {
      return res.json({ category: 'Incorrect' });
    } else {
      await pool.query('insert into category(name,type,path) values($1,$2,$3);', [name, type, `/images/${image.filename}`]);
      res.json({ success: 'success' });
    }
  }
});

// fetch categorys for listing
app.get('/listcategory', async (req, res) => {
  const result = await pool.query(`
    SELECT id, name, type, path 
    FROM category 
    ORDER BY 
      CASE 
        WHEN type = 'easy' THEN 3
        WHEN type = 'medium' THEN 2
        WHEN type = 'hard' THEN 1
        ELSE 4
      END
  `);
  res.json(result.rows);
});

// delete category
app.post('/delecate', async (req, res) => {
  try {
    const didd = req.body.didd;
    await pool.query('delete from category where id=$1', [didd]);
    res.json({ success: 'success' });
  } catch (error) {
    return res.json({ error: error });
  }
});

// get info of edit category
app.post('/editcate', async (req, res) => {
  const didd = req.body.didd;
  const result = await pool.query('select * from category where id=$1', [didd]);
  res.json(result.rows[0]);
});

// update Edit category final
app.post('/updatecategory', upload.single('img'), async (req, res) => {
  const { id, name, type, existingImg } = req.body;
  let imagepath;
  if (req.file) {
    imagepath = `/images/${req.file.filename}`;
  } else {
    imagepath = existingImg;
  }
  await pool.query('update category set name=$1,type=$2,path=$3 where id=$4', [name, type, imagepath, id]);
  res.json({ success: 'success' });
});

// Add Questions on db
app.post('/AddQuestion', async (req, res) => {
  const questions = req.body;

  questions.forEach(e => {
    pool.query('insert into public."questionTbl"(cid,question,op1,op2,op3,op4,ans) values($1,$2,$3,$4,$5,$6,$7);', [e.cid, e.question, e.options[0], e.options[1], e.options[2], e.options[3], e.answer], err => {
      if (err) console.log('❌ Error on query:', err);
    });
  });
  res.json({ success: 'success' });
});

// show Question for quiz
app.post('/giveQuestion', async (req, res) => {
  const { id } = req.body;
  const result = await pool.query('select id,question,op1,op2,op3,op4,ans from "questionTbl" where cid=$1 order by id;', [id]);
  if (result.rowCount > 0) {
    res.json(result.rows);
  }
  else {
    res.json({ not: 'no_rows' });
  }
});

// store question wise result and category wise result 
app.post('/Set_Ans_of_Que', async (req, res) => {
  const { UserId, cid, Answer } = req.body;
  // let totals = Answer.length;
  let totals = 0;
  let correct = 0;
  let wrong = 0;

  const ans = await pool.query('select id,ans from "questionTbl" where cid=$1 order by id;', [cid]);
  const dbAnswers = ans.rows;
  for (let i = 0; i < Answer.length; i++) {
    let user = Answer[i];
    const db = dbAnswers.find(q => q.id == user.id);

    if (!db) continue;
    totals++;
    let IsCorrect = user.selected === db.ans;

    if (IsCorrect === true) { correct++; } else { wrong++; }

    await pool.query('insert into result_base_on_question(cid,uid,opetion,ans) values($1,$2,$3,$4);', [cid, UserId, user.selected, IsCorrect]);

  }

  let tot = totals;
  let cor = correct;
  let wro = wrong;


  if (totals === correct + wrong) {
    const percentage = ((correct / totals) * 100).toFixed(2);

    await pool.query('insert into result_base_on_category(uid,cid,total_que,correct_que,wrong_que,percentage) values($1,$2,$3,$4,$5,$6)', [UserId, cid, tot, cor, wro, percentage]);

    return res.json({ success: "success" });
  } else {
    return res.json({ not: "Error:Somthing_Went_wrong" });
  }
});

// send all result of user
app.post('/getAllResultOfUser', async (req, res) => {
  const { userid } = req.body;

  const result = await pool.query(`
  SELECT 
    c.name, 
    r.uid, 
    r.cid, 
    r.total_que, 
    r.correct_que, 
    r.wrong_que, 
    r.percentage, 
    TO_CHAR(r.data_time, 'DD Mon YYYY HH12:MI:SS AM') AS date_time, 
    r.data_time 
  FROM 
    result_base_on_category r
  JOIN 
    category c ON c.id = r.cid
  WHERE 
    r.uid = $1
  ORDER BY 
   r.data_time DESC;
`, [userid]);

  if (result.rowCount > 0) {
    // console.log(result.rows);
    return res.json(result.rows);
  }
  res.json({ not: 'Error:Somthing_Went_wrong' });
});

// view perticular result
app.post('/viewFullResult', async (req, res) => {
  const { cid, uid } = req.body;
  const time = new Date(req.body.time);
  const startTime = new Date(time.getTime() - 1000);
  const endTime = new Date(time.getTime() + 1000);
  let resultOFQustion = `
  SELECT 
    * 
  FROM result_base_on_question 
  WHERE cid=$1 
    AND uid=$2 
    AND date_time BETWEEN $3 AND $4 ORDER BY id`;

  let Qustion = `
    SELECT 
      * 
    FROM "questionTbl" 
    WHERE cid=$1 
    ORDER BY id;
  `;

  const result = await pool.query(resultOFQustion, [cid, uid, startTime, endTime]);
  const question = await pool.query(Qustion, [cid]);

  if (result.rows.length != question.rows.length) {
    return res.json({ not: 'Somting_went_wrong' });
  }
  return res.json({ Result: result.rows, Question: question.rows, len: result.rows.length });
});

// delete category Question
app.post('/DeleteQuestion', async (req, res) => {
  try {
    const didd = req.body.didd;
    await pool.query('delete from "questionTbl" where cid=$1', [didd]);
    await pool.query('delete from result_base_on_question where cid=$1', [didd]);
    await pool.query('delete from result_base_on_category where cid=$1', [didd]);
    res.json({ success: 'success' });
  } catch (error) {
    return res.json({ error: error });
  }
});

// send all result of user for Admin
app.get('/getAllResultOfUserForAdmin', async (req, res) => {
  const result = await pool.query(`
  SELECT 
    u.id, 
    u.username, 
    u.email, 
    c.name, 
    r.uid, 
    r.cid, 
    r.total_que, 
    r.correct_que, 
    r.wrong_que, 
    r.percentage, 
    TO_CHAR(r.data_time, 'DD Mon YYYY HH12:MI:SS AM') AS date_time, 
    r.data_time 
  FROM 
    result_base_on_category r
  JOIN 
    category c ON c.id = r.cid 
  JOIN 
    "user" u ON u.id = r.uid 
  ORDER BY 
   r.data_time DESC;
`);

  if (result.rowCount > 0) {
    return res.json(result.rows);
  }
  res.json({ not: 'Error:Somthing_Went_wrong' });
});

// user Info send to Admin
app.get('/getAllUserInfoForAdmin', async (req, res) => {
  const result = await pool.query(`
  SELECT 
    id, 
    username, 
    email, 
    TO_CHAR(date_time, 'DD Mon YYYY HH12:MI:SS AM') AS date_time 
  FROM 
    "user"
  ORDER BY 
   date_time DESC;
`);

  if (result.rowCount > 0) {
    return res.json(result.rows);
  }
  res.json({ not: 'Error:Somthing_Went_wrong' });
});


app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
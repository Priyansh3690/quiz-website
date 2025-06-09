window.addEventListener('DOMContentLoaded', function () {
  const urlParam = new URLSearchParams(window.location.search);
  const cid = urlParam.get('id');

  const key = localStorage.key(0);
  const UserId = JSON.parse(localStorage.getItem(key));

  const form = document.getElementById('userQuiz');

  fetch('/giveQuestion', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: cid }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.not) {
        let div = document.createElement('div');
        div.classList.add('question-block');
        div.innerText = 'No Question Found!';
        form.appendChild(div);
        let button = document.createElement('button');
        button.innerText = 'Back'
        button.addEventListener('click', () => {
          window.location = 'ListCategory.html';
        });
        form.appendChild(button);
      } else {
        let count = 1;
        data.forEach(d => {
          let div = document.createElement('div');
          div.classList.add('question-block');
          div.innerHTML = `<p class="question">${count}. ${d.question}</p>
        <label><input type="radio" name="${d.id}" value="${d.op1}">${d.op1}</label>
        <label><input type="radio" name="${d.id}" value="${d.op2}">${d.op2}</label>
        <label><input type="radio" name="${d.id}" value="${d.op3}">${d.op3}</label>
        <label><input type="radio" name="${d.id}" value="${d.op4}">${d.op4}</label>`;
          form.appendChild(div);
          count++;
        });
        const button = document.createElement('button');
        button.type = 'submit';
        button.classList.add('button');
        button.innerText = 'Submit';
        form.appendChild(button);
      }
    });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const answers = [];
    const block = form.querySelectorAll('.question-block');
    block.forEach(b => {
      const radio = b.querySelector('input[type="radio"]:checked');
      if (radio) {
        let id = radio.name;
        let selected = radio.value;
        answers.push({ id, selected });
      }
    });

    fetch('/Set_Ans_of_Que', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ UserId: UserId, cid: cid, Answer: answers }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success == 'success') {
          return Swal.fire({
            title: 'Success!',
            text: 'You have Complited Quiz successfully!',
            icon: 'success',
            confirmButtonText: 'Continue to Result'
          }).then(() => {
            window.location = 'ShowResult.html';
          });
        }
        if (data.not == 'Error:Somthing_Went_wrong') {
          return Swal.fire({
            title: 'Error!',
            text: 'You have Error in Submiting Quiz!',
            icon: 'error',
            confirmButtonText: 'Renter Quiz'
          }).then(() => {
            window.location = 'ListQuestion.html?id=' + cid;
          });
        }
      });
  });
});
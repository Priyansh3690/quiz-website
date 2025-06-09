const form = document.getElementById('form');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');


form.addEventListener('submit', (e) => {
  e.preventDefault();
  let errors = []
  errors = getLoginFormsError(email_input.value, password_input.value)
  if (errors.length > 0) {
    error_message.innerText = errors.join(". ");
    return
  }
  else {
    fetch('/Adminlogin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email_input.value, password: password_input.value }),
    }).then(res => res.json()).then(data => {
      if (data.success) {
        localStorage.setItem(JSON.stringify("admin"),JSON.stringify(data.success.id));
        window.location = '../admin/dashbord.html';
      }
      if (data.password == 'Incorrect') {
        email_input.parentElement.classList.add('incorrect');
        password_input.parentElement.classList.add('incorrect');
        error_message.innerText = 'This Email Or Password is Incorrect!';
      }
    });
  }
});


function getLoginFormsError(email, password) {
  let errors = [];
  if (email === '' || email == null) {
    errors.push('email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (password === '' || password == null) {
    errors.push('password is required');
    password_input.parentElement.classList.add('incorrect');
  }
  return errors;
}


const allInputs = [ email_input, password_input];
allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  })
})
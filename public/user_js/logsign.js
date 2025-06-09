const form = document.getElementById('form');
const username_input = document.getElementById('username-input')
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');

form.addEventListener('submit', (e) => {
  let errors = []
  if (username_input) {
    errors = getSignupFormErrors(username_input.value, email_input.value, password_input.value, repeat_password_input.value)
    if (errors.length > 0) {
      e.preventDefault();
      error_message.innerText = errors.join(". ");
    }
    else {
      e.preventDefault();
      fetch('/signup', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username_input.value, email: email_input.value, password: password_input.value }),
      }).then(res => res.json()).then(data => {
        if (data.inserted === 'success') {
          Swal.fire({
            title: 'Success!',
            text: 'You have signed up successfully!',
            icon: 'success',
            confirmButtonText: 'Continue to Login'
          }).then(() => {
            window.location = 'log-in.html';
          });
        }
        if (data.username === 'uniqe') {
          username_input.parentElement.classList.add('incorrect');
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "This Username is Already Tecken , Enter uniqe Username!",
          });
        }
        if (data.email === 'uniqe') {
          Swal.fire({
            icon: 'info',
            title: "Oops...",
            text: "This Email Id is Already registered!",
          }).then(() => {
            window.location = 'log-in.html';
          });
        }
      });
    }
  }
  else {
    errors = getLoginFormsError(email_input.value, password_input.value)
    if (errors.length > 0) {
      e.preventDefault();
      error_message.innerText = errors.join(". ");
    }
    else {
      e.preventDefault();
      fetch('/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email_input.value, password: password_input.value }),
      }).then(res => res.json()).then(data => {
        if (data.success) {
          localStorage.setItem(JSON.stringify("UserId"), JSON.stringify(data.success.id))
          window.location = 'userdash.html';
          return;
        }
        if (data.password == 'Incorrect') {
          email_input.parentElement.classList.add('incorrect');
          password_input.parentElement.classList.add('incorrect');
          error_message.innerText = 'This Email Or Password is Incorrect!';
        }
      });
    }
  }
});

function getSignupFormErrors(username, email, pass, repass) {
  let errors = []

  if (username === '' || username == null) {
    errors.push('Username is required');
    username_input.parentElement.classList.add('incorrect');
  }
  if (email === '' || email == null) {
    errors.push('email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (pass === '' || pass == null) {
    errors.push('password is required');
    password_input.parentElement.classList.add('incorrect');
  }
  if (pass.length < 8) {
    errors.push('Password must be greter than 8 charecter')
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
    return errors;
  }
  if (pass !== repass) {
    errors.push('Password does not match repeated password');
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
  }
  return errors;
}

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

const allInputs = [username_input, email_input, password_input, repeat_password_input].filter(input => input != null);
allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  })
})



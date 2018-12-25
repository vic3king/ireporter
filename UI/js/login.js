const logInForm = document.getElementById('login-form');
const logInEmail = document.getElementById('email');
const logInPassword = document.getElementById('password');

const currApiEndpoint = 'http://127.0.0.1:3000/api/v2';

logInForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {};

  if (logInEmail.value) {
    formData.email = logInEmail.value;
  }
  if (logInPassword.value) {
    formData.password = logInPassword.value;
  }

  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/auth/login`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        alert(error);
      }
      const { user, token } = data[0];
      localStorage.iUser = JSON.stringify(user);
      localStorage.iToken = token;
      window.location = (user.isadmin) ? './admin-profile.html' : './profile.html';
    })
    .catch(err => console.log(err));
});

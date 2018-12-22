const signUpForm = document.getElementById('signup-form');
const signUpFirstName = document.getElementById('firstname');
const signUpLastName = document.getElementById('lastname');
const signUpOtherName = document.getElementById('othernames');
const signUpEmail = document.getElementById('email');
const signUpUsername = document.getElementById('username');
const signUpPhoneNumber = document.getElementById('phonenumber');
const signUpPassword = document.getElementById('password');

const currApiEndpoint = 'http://127.0.0.1:3000/api/v2';

signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {};
  if (signUpFirstName.value) {
    formData.firstname = signUpFirstName.value;
  }
  if (signUpLastName.value) {
    formData.lastname = signUpLastName.value;
  }
  if (signUpOtherName.value) {
    formData.othernames = signUpOtherName.value;
  }
  if (signUpUsername.value) {
    formData.username = signUpUsername.value;
  }
  if (signUpEmail.value) {
    formData.email = signUpEmail.value;
  }
  if (signUpPhoneNumber.value) {
    formData.phoneNumber = signUpPhoneNumber.value;
  }
  if (signUpPassword.value) {
    formData.password = signUpPassword.value;
  }
  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/auth/signup`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error, data } = resp;
      if (error) {
        alert(error);
      }
      const { user, token } = data[0];
      localStorage.iUser = JSON.stringify(user);
      localStorage.iToken = token;
      window.location = './sign-in.html';
    })
    .catch(err => console.log(err));
});

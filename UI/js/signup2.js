document.querySelector('#signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('email');
  const username = document.getElementById('username');
  const phonenumber = document.getElementById('phonenumber');
  const password = document.getElementById('password');

  fetch('api/auth/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(firstname, lastname, email, username, password, phonenumber),
  }).then(json)
    .then((resp) => {
      if (resp) {
        localStorage.setItem('localusername', resp.getmain.username);
        const localusername = localStorage.getItem('username');
        window.location.replace(`./login.html?user=${username}`);
      } else {
        alert('invalid login');
      }
    });
});

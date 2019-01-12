const invalidToken = () => {
  window.location = './login.html';
};

const { iToken } = localStorage;
if (!iToken) {
  invalidToken();
}

const currApiEndpoint = 'http://127.0.0.1:3000/api/v2';
// const currApiEndpoint = 'https://afternoon-tundra-97957.herokuapp.com/api/v2';

const recordsForm = document.getElementById('record-form');
const recordTitle = document.getElementById('title');
const reordType = document.getElementById('type');
const recordDescription = document.getElementById('description');
const recordComment = document.getElementById('comment');
const locationLat = document.getElementById('lat');
const locationLng = document.getElementById('lng');

recordsForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = {};
  if (recordTitle.value) {
    formData.title = recordTitle.value;
  }
  if (reordType.value) {
    formData.type = reordType.value;
  }
  if (recordDescription.value) {
    formData.description = recordDescription.value;
  }
  if (recordComment.value) {
    formData.comment = recordComment.value;
  }
  if (locationLat.value && locationLng.value) {
    formData.location = `${locationLat.value}, ${locationLng.value}`;
  }
  const fetchConfig = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': iToken,
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/incidents`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      const { error } = resp;
      if (error) {
        console.log(error);
      }
      window.location = './profile.html';
    })
    .catch(err => console.log(err));
});

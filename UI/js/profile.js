/* eslint-disable no-unused-vars */
//  accordion to render list of records
const accordionFunc = () => {
  const accordion = document.getElementsByClassName('accordion');

  for (let i = 0; i < accordion.length; i += 1) {
    accordion[i].addEventListener('click', function toggle() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  }
};
const updateAccord = () => {
  const accordion = document.getElementsByClassName('update-accord');

  for (let i = 0; i < accordion.length; i += 1) {
    accordion[i].addEventListener('click', function toggle() {
      this.classList.toggle('active');
      const panel = this.nextElementSibling;
      if (panel.style.display === 'block') {
        panel.style.display = 'none';
      } else {
        panel.style.display = 'block';
      }
    });
  }
};

const invalidToken = () => {
  window.location = './login.html';
};

const { iUser, iToken } = localStorage;
if (!iToken) {
  invalidToken();
}

const currApiEndpoint = 'http://127.0.0.1:3000/api/v2';
// const currApiEndpoint = 'https://afternoon-tundra-97957.herokuapp.com/api/v2';

const setUpHeader = () => ({ 'x-access-token': iToken });

const getMyRecordsConfig = {
  headers: setUpHeader(),
};

const user = JSON.parse(iUser);

const fullName = document.getElementById('fullname');
fullName.textContent = `Welcome ${user.firstname} ${user.othernames} ${user.lastname}`;

const email = document.getElementById('email');
email.textContent = user.email;


const phoneNumber = document.getElementById('phonenumber');
phoneNumber.textContent = user.phonenumber;

const userName = document.getElementById('username');
userName.textContent = user.username;


const totalCount = document.getElementById('total-count');


const draft = document.getElementById('draft');
const underInvestigation = document.getElementById('under-investigation');
const resolved = document.getElementById('resolved');
const rejected = document.getElementById('rejected');


fetch(`${currApiEndpoint}/incidents/mine`, getMyRecordsConfig)
  .then(resp => resp.json())
  .then((resp) => {
    const { error, data } = resp;
    if (error) {
      console.log(error);
    }
    totalCount.textContent = data.length;
    draft.textContent = data.filter(record => record.status === 'draft').length;
    underInvestigation.textContent = data.filter(record => record.status === 'under-investigation').length;
    rejected.textContent = data.filter(record => record.status === 'rejected').length;
    resolved.textContent = data.filter(record => record.status === 'resolved').length;

    let output = '<h2>List of All Records</h2>';
    data.forEach((record) => {
      const {
        id, type, title, description, status, comment,
      } = record;
      output += `<button class="accordion"><b>Request:</b> ${title} <br><b>Description:</b> ${description}<br><b>Incident Type:</b> ${type}</button>
      <div class="panel">
                    <p>${comment}</p>
                    <a target="_blank" href="images/black-and-white-dark-marble-908283.jpg">
                <img class="img" src="images/black-and-white-dark-marble-908283.jpg" alt="Forest"> </a>
           <div class="stats">
             <span>Incident Status: ${status}</span><br>
           <span>Created On: ${record.created_on}</span> 
           <span>Modified On: ${record.modefied_on}</span> 
           </div>
           <button onclick="handleDelete(${id})" class="delete-record">Delete</button>
           <div class="redFlagAccordDiv">
           <button class="update-accord">Edit</button>
           <form class="box red-flag">
      <div class="box2">
            <h3 class="page-title">Update record:</h3>
            <label for="comment">Comment: </label>
              <textarea name="comment" id="comment${id}" rows="4"></textarea>
              <label for="address">Address</label>
              <input type="text" id="search_term${id}" placeholder="enter your address" name="address" >
              <label for="lat">Latitude</label>
              <input type="text" id="lat${id}" placeholder="where are you? enter Latitude eg 45.002440" name="lat">
              <label for="lng">Longitude</label>
              <input type="text" id="lng${id}" placeholder="where are you? enter Longitute eg -90.810480" name="lng">
              <button onclick="handleUpdates(event, ${id})" type="button">Update Record</button>
        </div>  
    </form>
           </div>
            </form>
            </div>
      `;
    });
    // accordion div
    const button = document.getElementById('accDiv');
    button.innerHTML = output;

    accordionFunc();
    updateAccord();
  });

function handleDelete(id) {
  const fetchConfig = {
    method: 'DELETE',
    headers: setUpHeader(),
  };
  fetch(`${currApiEndpoint}/incidents/${id}`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      console.log(resp);
      window.location = './profile.html';
    });
}
function handleUpdates(event, id) {
  event.preventDefault();
  const recordComment = document.getElementById(`comment${id}`);
  const locationLat = document.getElementById(`lat${id}`);
  const locationLng = document.getElementById(`lng${id}`);
  const formData = {};
  if (recordComment.value) {
    formData.comment = recordComment.value;
  }
  if (locationLat.value && locationLng.value) {
    formData.location = `${locationLat.value}, ${locationLng.value}`;
  }
  const fetchConfig = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': iToken,
    },
    body: JSON.stringify(formData),
  };
  fetch(`${currApiEndpoint}/incidents/${id}/location`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      console.log(resp);
      // window.location = './profile.html';
    })
    .catch(err => console.log(err));

  fetch(`${currApiEndpoint}/incidents/${id}/comment`, fetchConfig)
    .then(resp => resp.json())
    .then((resp) => {
      console.log(resp);
      // window.location = './profile.html';
    })
    .catch(err => console.log(err));
}

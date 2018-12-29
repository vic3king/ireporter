const invalidToken = () => {
  window.location = './login.html';
};

const { iUser, iToken } = localStorage;
if (!iToken) {
  invalidToken();
}

const currApiEndpoint = 'http://127.0.0.1:3000/api/v2';

const setUpHeader = () => ({ 'x-access-token': iToken });

const user = JSON.parse(iUser);

const fullName = document.getElementById('fullname');
fullName.textContent = `Welcome ${user.firstname} ${user.othernames} ${user.lastname}`;

const email = document.getElementById('email');
email.textContent = user.email;


const phoneNumber = document.getElementById('phonenumber');
phoneNumber.textContent = user.phonenumber;

const userName = document.getElementById('username');
userName.textContent = user.username;

const getMyRecordsConfig = {
  headers: setUpHeader(),
};

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
  });

fetch(`${currApiEndpoint}/incidents/mine`, getMyRecordsConfig)
  .then(resp => resp.json())
  .then((resp) => {
    const { error, data } = resp;
    if (error) {
      console.log(error);
    }
    let output = '<h2>List of All Records</h2>';
    data.forEach((record) => {
      output += `<button class="accordion"><b>Request:</b> ${record.title} <br><b>Description:</b> ${record.description}<br><b>Incident Type:</b> ${record.type}</button>
      <div class="panel">
                    <p>${record.comment}</p>
                    <a target="_blank" href="images/black-and-white-dark-marble-908283.jpg">
                <img class="img" src="images/black-and-white-dark-marble-908283.jpg" alt="Forest"> </a>
           <div class="stats">
             <span>Incident Status: ${record.status}</span><br>
           <span>Modified On: ${record.modefied_on}</span> 
           </div>
                    </div>
      `;
    });

    // accordion button
    const button = document.getElementById('title');
    button.innerHTML = output;

    //  accordion to render list of records
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
  });

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
const invalidToken = () => {
  window.location = './login.html';
};

const { iUser, iToken } = localStorage;
if (!iToken) {
  invalidToken();
}

// const currApiEndpoint = 'http://127.0.0.1:3000/api/v2';
const currApiEndpoint = 'https://afternoon-tundra-97957.herokuapp.com/api/v2';

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

const displayDivElContent = record => `<button class="accordion"><b>Request:</b> ${record.title} <br><b>Description:</b> ${record.description}<br><b>Incident Type:</b> ${record.type}</button>
  <div class="panel">
                <p>${record.comment}</p>
                <div>
                    <input type="radio" id="radio-investigation" name="status" checked>
                    <label for="radio-investigation">Under Investigation</label>
                </div>
                <div>
                    <input type="radio" name="status" id="reject">
                    <label for="reject">Rejected</label>
                </div>
                <div>
                    <input type="radio" name="status" id="resolved">
                    <label for="resolved">Resolved</label>
                </div>
                <a target="_blank" href="images/black-and-white-dark-marble-908283.jpg">
            <img class="img" src="images/black-and-white-dark-marble-908283.jpg" alt="Forest"> </a>
       <div class="stats">
         <span>Incident Status: ${record.status}</span><br>
       <span>Modified On: ${record.modefied_on}</span> 
       </div>
                </div>
  `;

const totalCount = document.getElementById('total-count');
const draft = document.getElementById('draft');
const underInvestigation = document.getElementById('under-investigation');
const resolved = document.getElementById('resolved');
const rejected = document.getElementById('rejected');

let outputAll = '<h2>List of All Records</h2>';
let outputUnderInves = '<h2>Records Under Investigation</h2>';
let outputDraft = '<h2>Draft Records</h2>';
let outputResolved = '<h2>List of Resolved Records</h2>';
let outputRejected = '<h2>List of Rejected Records</h2>';

fetch(`${currApiEndpoint}/incidents`, getMyRecordsConfig)
  .then(resp => resp.json())
  .then((resp) => {
    const { error, data } = resp;
    if (error) {
      console.log(error);
    }

    data.forEach((record) => {
      if (record.status === 'draft') {
        outputDraft += displayDivElContent(record);
      } else if (record.status === 'under-investigation') {
        outputUnderInves += displayDivElContent(record);
      } else if (record.status === 'rejected') {
        outputRejected += displayDivElContent(record);
      } else if (record.status === 'resolved') {
        outputResolved += displayDivElContent(record);
      }
      outputAll += displayDivElContent(record);
    });

    // filter our stats
    totalCount.textContent = data.length;
    draft.textContent = data.filter(record => record.status === 'draft').length;

    underInvestigation.textContent = data.filter(record => record.status === 'under-investigation').length;

    rejected.textContent = data.filter(record => record.status === 'rejected').length;

    resolved.textContent = data.filter(record => record.status === 'resolved').length;

    const viewRec1 = document.getElementById('view1');
    const viewRec2 = document.getElementById('view2');
    const viewRec3 = document.getElementById('view3');
    const viewRec4 = document.getElementById('view4');
    const viewRec5 = document.getElementById('view5');
    const stuff  = document.getElementById('radio-investigation')
    try {
      
    } catch (error) {
      stuff.addEventListener('click', () => {
        console.log('radio-test')
      })
    }
    //  event listeners to display records
    viewRec1.addEventListener('click', () => {
      console.log('test1');
      const displayDivEl = document.getElementById('display');
      displayDivEl.innerHTML = outputAll;
      accordionFunc();
    });

    viewRec2.addEventListener('click', () => {
      console.log('test2');
      const displayDivEl = document.getElementById('display');
      displayDivEl.innerHTML = outputUnderInves;
      accordionFunc();
    });

    viewRec3.addEventListener('click', () => {
      console.log('test3');
      const displayDivEl = document.getElementById('display');
      displayDivEl.innerHTML = outputResolved;
      accordionFunc();
    });

    viewRec4.addEventListener('click', () => {
      console.log('test4');
      const displayDivEl = document.getElementById('display');
      displayDivEl.innerHTML = outputRejected;
      accordionFunc();
    });

    viewRec5.addEventListener('click', () => {
      console.log('test5');
      const displayDivEl = document.getElementById('display');
      displayDivEl.innerHTML = outputDraft;
      accordionFunc();
    });
  });

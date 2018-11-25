// reusable conditional statement
const conditional = (e, btnId, elClass1, elClass2, state1, state2) => {
  // the div wont have an id of btn1, so js will check the next element which will be the button
  if (e.target.id === btnId) {
  // effect to make sure only one form is being displayed at a time
    document.querySelector(elClass1).style.display = state1;

    // show form
    document.querySelector(elClass2).style.display = state2;
    e.preventDefault();
  }
};

function formsDisplayLogic() {
  //  parent element for the forms
  const parentDiv1 = document.querySelector('#addRedFlagDiv');
  const parentDiv2 = document.querySelector('#interventionRequestDiv');
  function displayForm1(e) {
    // conditional logic function
    conditional(e, 'btn1', '.intervention', '.red-flag', 'none', 'block');
    e.stopPropagation();
  }

  // callback function for eventlisteners, (n.b)arrow fuction wont use(this)
  function displayForm2(e) {
    // conditional logic function
    conditional(e, 'btn2', '.red-flag', '.intervention', 'none', 'block');
    // stop the bubbling effect
    e.stopPropagation();
  }
  // event listeners placed on divs
  parentDiv1.addEventListener('click', displayForm1);
  parentDiv2.addEventListener('click', displayForm2);
}


function editForm() {
  const parentDiv1 = document.querySelector('#redFlagAccordDiv');
  const parentDiv2 = document.querySelector('#intervRequestDiv');

  function displayFormEdit1(e) {
    // if (e.target.id === 'btn3') {
    //   // show form
    //   document.querySelector('.edit-red-flag').style.display = 'block';
    //   e.preventDefault();
    // }
    conditional(e, 'btn3', '.edit-red-flag', '.edit-intervention', 'block', 'none');
    // stop the bubbling effect
    e.stopPropagation();
  }

  function displayFormEdit2(e) {
    // if (e.target.id === 'btn4') {
    //   // show form
    //   document.querySelector('.edit-intervention').style.display = 'block';
    //   e.preventDefault();
    // }
    conditional(e, 'btn4', '.edit-intervention', '.edit-red-flag', 'block', 'none');
    // stop the bubbling effect
    e.stopPropagation();
  }
  // event listener for editing a red flag button
  parentDiv1.addEventListener('click', displayFormEdit1);
  parentDiv2.addEventListener('click', displayFormEdit2);
}

formsDisplayLogic();
editForm();

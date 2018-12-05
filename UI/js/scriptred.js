// reusable conditional statement
const conditional = (e, btnId, elClass, state) => {
  // the div wont have an id of btn1, so js will check the next element which will be the button
  if (e.target.id === btnId) {
  // effect to make sure only one form is being displayed at a time
    document.querySelector(elClass).style.display = state;
  }
};

function dislayRedForm() {
  const parentDiv = document.querySelector('#addRedFlagDiv');
  function displayForm1(e) {
    // conditional logic function
    conditional(e, 'btn1', '.red-flag', 'block');
    e.stopPropagation();
  }
  // event listeners placed on divs
  parentDiv.addEventListener('click', displayForm1);
}


function editForm1() {
  const parentDiv1 = document.querySelector('#redFlagAccordDiv');
  // const parentDiv2 = document.querySelector('#intervRequestDiv');

  function displayFormEdit1(e) {
    conditional(e, 'btn3', '.edit-red-flag', 'block');
    // stop the bubbling effect
    e.stopPropagation();
  }

  // event listener for editing a red flag button
  parentDiv1.addEventListener('click', displayFormEdit1);
}

dislayRedForm();
editForm1();

/* eslint-disable indent */
// reusable conditional statement
const conditional = (e, btnId, elClass, state) => {
  // the div wont have an id of btn1, so js will check the next element which will be the button
  if (e.target.id === btnId) {
  // effect to make sure only one form is being displayed at a time
    document.querySelector(elClass).style.display = state;
  }
};

function dislayRedForm() {
  const parentDiv = document.querySelector('#interventionRequestDiv');
  function displayForm1(e) {
    // conditional logic function
    conditional(e, 'btn2', '.intervention', 'block');
    e.stopPropagation();
  }
  // event listeners placed on divs
  parentDiv.addEventListener('click', displayForm1);
}


function editForm2() {
  const parentDiv1 = document.querySelector('#intervRequestDiv');

  function displayFormEdit2(e) {
    conditional(e, 'btn4', '.edit-intervention', 'block');
    // stop the bubbling effect
    e.stopPropagation();
  }

  // event listener for editing a red flag button
    parentDiv1.addEventListener('click', displayFormEdit2);
}

dislayRedForm();
editForm2();

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

dislayRedForm();

//select dom element(button)
let createRedTag = document.getElementById('btn1')
let interventionRequest = document.getElementById('btn2')

//event listener for redflag button
createRedTag.addEventListener('click', (e) => {
  //effect to make sure only one form is being displayed at a time
  document.querySelector(".intervention").style.display = "none";

  //create div and add a class
  let div = document.createElement("div")
  div.className = 'box'

  //show form
  document.querySelector(".red-flag").style.display = "block";
  e.preventDefault()
})

//event listener for intervention button
interventionRequest.addEventListener('click', (e) => {
  //effect to make sure only one form is being displayed at a time
  document.querySelector(".red-flag").style.display = "none";

  //create div and add a class
  let div = document.createElement("div")
  div.className = 'box'

  //show form
  document.querySelector(".intervention").style.display = "block";
  e.preventDefault()
})

//accordion to render list of red flags
let accordion = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    //classlist is used to access the class instead of using its direct classs name
    this.classList.toggle("active");

    //this is is selecting the div
    let panel = this.nextElementSibling;

    //div is hidden in css, conditional to display or hide it
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

let editButton = document.getElementById('edit-btn')

editButton.addEventListener('click', (e) => {
  //create div and add a class
  let div = document.createElement("div")
  div.className = 'box'

  //show form
  document.querySelector(".edit-red-flag").style.display = "block";
  e.preventDefault()
})

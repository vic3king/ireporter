//select dom element(button)
let createRedTag = document.getElementById('btn1')
let interventionRequest = document.getElementById('btn2')

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

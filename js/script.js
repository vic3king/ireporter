//select dom element(button)
let createRedTag = document.getElementById('btn1')

createRedTag.addEventListener('click', () => {
  //create div and add a class
  let div = document.createElement("div")
  div.className = 'box'
  //show form
  document.querySelector("#red-flag").style.display = "block";
})


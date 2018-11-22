const accordionRemote = () => {
    //accordion to render list of red flags
    let accordion = document.getElementsByClassName("accordion");

    for (let i = 0; i < accordion.length; i++) {
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
}


function formsDisplayLogic() {
    //parent element for the forms
    let parentDiv1 = document.querySelector('#parent')

    //event listeners placed on divs 
    parentDiv1.addEventListener('click', displayForm1)

    function displayForm1(e) {
        if (e.target.id == 'btn1') {

            //effect to make sure only one form is being displayed at a time
            document.querySelector(".intervention").style.display = "none";

            //show form
            document.querySelector(".red-flag").style.display = "block";
            e.preventDefault()
        }
        e.stopPropagation()
    }

    let parentDiv2 = document.querySelector('#parent2')
    parentDiv2.addEventListener('click', displayForm2)

    //callback function for eventlisteners, (n.b)arrow fuction wont use(this)
    function displayForm2(e) {
        //the div wont have an id of btn2, so js will check the next element which will be the button
        if (e.target.id == 'btn2') {

            //effect to make sure only one form is being displayed at a time
            document.querySelector(".red-flag").style.display = "none";

            //show form
            document.querySelector(".intervention").style.display = "block";
            e.preventDefault()
        }

        //stop the bubbling effect
        e.stopPropagation()
    }
}


function editForm() {
    let parentDiv1 = document.querySelector('#parentx')
    let parentDiv2 = document.querySelector('#parentxy')
    //event listener for editing a red flag button
    parentDiv1.addEventListener('click', displayFormEdit1)
    parentDiv2.addEventListener('click', displayFormEdit2)


    function displayFormEdit1(e) {
        if (e.target.id == 'btn3') {
            //show form
            document.querySelector(".edit-red-flag").style.display = "block";
            e.preventDefault()
        }
        //stop the bubbling effect
        e.stopPropagation()
    }

    function displayFormEdit2(e) {
        if (e.target.id == 'btn4') {

            //show form
            document.querySelector(".edit-intervention").style.display = "block";
            e.preventDefault()
        }
        //stop the bubbling effect
        e.stopPropagation()
    }

}



//used to prevent error generating in admin.html
try {
    formsDisplayLogic()
    editForm()
    accordionRemote()
} catch (error) {
    accordionRemote()
}



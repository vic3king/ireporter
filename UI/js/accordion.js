//  accordion to render list of red flags
const accordion = document.getElementsByClassName('accordion');

for (let i = 0; i < accordion.length; i += 1) {
  accordion[i].addEventListener('click', function toggle() {
    //  classlist is used to access the class instead of using its direct classs name
    this.classList.toggle('active');
    //  this is is selecting the
    // div
    const panel = this.nextElementSibling;
    //  div is hidden in css, conditional to display or hide it
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
    } else {
      panel.style.display = 'block';
    }
  });
}

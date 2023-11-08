(function () {
  "use strict";
  console.log("reading js");

  const form = document.getElementById('madLibsForm');

  form.addEventListener('submit', function(event){
    event.preventDefault();
    // Get user inputs
    const formAdj1 = document.getElementById('formAdj1').value;
    const formNoun1 = document.getElementById('formNoun1').value;
    const formVerb1 = document.getElementById('formVerb1').value;
    const formTime = document.getElementById('formTime').value;
    const formNoun2 = document.getElementById('formNoun2').value;
    const formAdj2 = document.getElementById('formAdj2').value;
    const formAdj3 = document.getElementById('formAdj3').value;
    const formNoun3 = document.getElementById('formNoun3').value;
    const formLocation = document.getElementById('formLocation').value;
    const formNoun4 = document.getElementById('formNoun4').value;
    const formEmotion = document.getElementById('formEmotion').value;

    // Set the Mad Libs story with user inputs
    document.getElementById('adj1').innerHTML = formAdj1;
    document.getElementById('noun1').textContent = formNoun1;
    document.getElementById('verb1').textContent = formVerb1;
    document.getElementById('time').textContent = formTime;
    document.getElementById('noun2').textContent = formNoun2;
    document.getElementById('adj2').textContent = formAdj2;
    document.getElementById('noun3').textContent = formNoun3;
    document.getElementById('location').textContent = formLocation;
    document.getElementById('adj3').textContent = formAdj3;
    document.getElementById('noun4').textContent = formNoun4;
    document.getElementById('emotion').textContent = formEmotion;

    // Show the Mad Libs story
    document.querySelector('.hidden').style.display = 'block';

    const redSpans = document.getElementsByClassName('redText');

    // Change the text color of all selected spans to red
    for (let i = 0; i < redSpans.length; i++) {
      redSpans[i].style.color = 'red';
    }
  });
})();

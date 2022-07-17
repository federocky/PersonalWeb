var translate = false;
var first = true;
var text = {};
var time;
var btn = document.getElementById('btn_change_language');
const d = document;
var alertSuccess = "";
var alertFail = "";


btn.addEventListener('change', function(){
    (this.checked) ? translate = true : translate = false;
    clearTimeout(time);
    getText();
})

getText();

function getText(){
    const xhttp = new XMLHttpRequest();

    let documentPath = '';
    (translate) ? documentPath = 'js/en.json' : documentPath = 'js/es.json';

    xhttp.open('GET', documentPath, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            text = JSON.parse(this.responseText);
            writeText();
            init();
        }
    }

}

function writeText(){
    document.getElementById("text_home").innerText = text.nav.home;
    document.getElementById("text_proyect").innerText = text.nav.proyect;
    document.getElementById("text_experience").innerText = text.nav.experience;
    document.getElementById("text_contact").innerText = text.nav.contact;
    document.getElementById("text_name").innerText = text.info.name;
    document.getElementById("text_like").innerHTML = text.info.like + ' <span class="txt-type" data-wait="3000"></span>'
    document.getElementById("proyect_title").innerHTML = text.info.proyectTitle;
    document.getElementById("github_text").innerHTML = text.info.githubText;
    document.getElementById("form_title").innerHTML = text.form.title;
    document.getElementById("form_name").innerHTML = text.form.name;
    document.getElementById("form_message").innerHTML = text.form.message;
    document.getElementById("form_submit").value = text.form.send;
    document.getElementById("develop_by").innerHTML = text.footer.developedBy;
    document.getElementById("verisk-work-position").innerText = text.work.verisk.position;
    document.getElementById("verisk-work-description").innerText = text.work.verisk.description;
    document.getElementById("moochers-work-position").innerText = text.work.moochers.position;
    document.getElementById("moochers-work-description").innerText = text.work.moochers.description;
    document.getElementById("moshimo-work-position").innerText = text.work.moshimo.position;
    document.getElementById("moshimo-work-description").innerText = text.work.moshimo.description;
    document.getElementById("experience-title").innerText = text.work.title;
    document.getElementById("moreExperienceIn").innerHTML = text.work.moreExperience;

    alertSuccess = text.alert.success;
    alertFail = text.alert.fail;

    if(text.cards[0].description.length > 150) document.getElementById("text_mtbMalaga").innerHTML = text.cards[0].description.substring(0,150) + "...";
    else document.getElementById("text_mtbMalaga").innerHTML = text.cards[0].description;
    if(text.cards[1].description.length > 150) document.getElementById("text_mimascota").innerHTML = text.cards[1].description.substring(0,150) + "...";
    else document.getElementById("text_mimascota").innerHTML = text.cards[1].description;
    if(text.cards[2].description.length > 250) document.getElementById("text_richart").innerHTML = text.cards[2].description.substring(0,250) + "...";
    else document.getElementById("text_richart").innerHTML = text.cards[2].description;
}

d.addEventListener('submit', (e) => {
  e.preventDefault();
  let name = document.getElementById('formName').value;
  let email = document.getElementById('formEmail').value;
  let message = document.getElementById('formMessage').value;

  fetch("https://formsubmit.co/ajax/fedeandresdeveloper@gmail.com", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)

      if(data.success) {
        alert(alertSuccess);
        clearForm();
      }
      else {
        alert(alertFail);
      }
    })
    .catch(error => console.log(error));

});


function clearForm(){
  document.getElementById('formName').value = "";
  document.getElementById('formEmail').value = "";
  document.getElementById('formMessage').value = "";
}

const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}



//Type Method
TypeWriter.prototype.type = function() {

  clearInterval(time);

  //Current index of word
  const current = this.wordIndex % this.words.length;
  //Get full text of current word
  const fullTxt = this.words[current];

  //Check if deleting
  if(this.isDeleting) {
    //Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //Insert txt into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Initial Type Speed
  let typeSpeed = 300;

  if(this.isDeleting) {
    typeSpeed /= 2;
  }

  //If word is complete
  if(!this.isDeleting && this.txt === fullTxt) {
    //Make pause at end
    typeSpeed = this.wait;
    //Set delete to true
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    //Move to next word
    this.wordIndex++;
    //Pause before start typing
    typeSpeed = 500;
  }

  time = setTimeout(() => this.type(), typeSpeed); 
  
}


// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = text.info.words;
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}


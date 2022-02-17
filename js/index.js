var translate = false;
var first = true;
var text = {};
var time;
var btn = document.getElementById('btn_change_language');


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
    document.getElementById("text_contact").innerText = text.nav.contact;
    document.getElementById("text_name").innerText = text.info.name;
    document.getElementById("text_like").innerHTML = text.info.like + ' <span class="txt-type" data-wait="3000"></span>';
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


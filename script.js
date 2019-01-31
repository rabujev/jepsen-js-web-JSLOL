
// import some polyfill to ensure everything works OK
import "babel-polyfill"

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";

/*
  Put the JavaScript code you want below.
*/

let ideaCount = localStorage.getItem("ideaCount");
if(ideaCount === null){
	ideaCount = 0;
} else {
	ideaCount = parseInt(ideaCount);
}

let idea = JSON.parse(localStorage.getItem("idea0"));

let ideasElt = document.querySelector(".ideas");
ideasElt.querySelector(".idea-name").innerText = idea.name;
ideasElt.querySelector(".idea-description").innerText = idea.description;

let modalElt = document.querySelector(".modal-content .ideas");
modalElt.querySelector(".idea-name").innerText = idea.name;
modalElt.querySelector(".idea-description").innerText = idea.description;
modalElt.querySelector(".details").innerText = idea.details;
modalElt.querySelector(".comments").innerText = JSON.stringify(idea.comments);


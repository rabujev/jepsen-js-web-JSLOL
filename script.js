
// import some polyfill to ensure everything works OK
import "babel-polyfill"

//import JQuery
import $ from "jquery";

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

let modalHead = document.querySelector(".modal-title");
modalHead.innerText = idea.name;

let modalElt = document.querySelector(".modal-content .ideas");
modalElt.querySelector(".idea-description").innerText = idea.description;
modalElt.querySelector(".details").innerText = idea.details;
modalElt.querySelector(".comments").innerText = JSON.stringify(idea.comments);

console.log(ideasElt);

ideasElt.addEventListener("click", () => $("#exampleModalCenter").modal("show"));

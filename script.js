
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
modalHead.style.fontSize = "2rem";

let modalElt = document.querySelector(".modal-content .ideasmodal");
modalElt.querySelector(".idea-description").innerText = idea.description;
modalElt.querySelector(".details").innerText = idea.details;


let descriptionElt = document.querySelector(".title-description .idea-description");
descriptionElt.style.marginBottom = "1rem";

let detailElt = document.querySelector(".title-details .details");
detailElt.style.marginBottom = "1rem";

let commentsElt = document.querySelector(".comments");
let divCommentsElt;
let divCommentAuthor;
let divCommentText;

console.log(idea);

for(let i=0; i<idea.comments.length; i++){
	//creation du div commentaire
	divCommentsElt = document.createElement("div");
	commentsElt.appendChild(divCommentsElt);

	// creation du div nom d'auteur dans le div commentaire
	divCommentAuthor = document.createElement("div");
	divCommentAuthor.innerText= "Auteur: " + idea.comments[i].author;
	divCommentsElt.appendChild(divCommentAuthor);
	divCommentAuthor.style.color = "#156777";
	divCommentAuthor.style.fontSize = "18px";
	divCommentAuthor.style.textDecoration = "underline";
	divCommentAuthor.style.paddingTop = "1rem";


	// creation du div texte dans le div commentaire
	divCommentText = document.createElement("div");
	divCommentText.innerText= idea.comments[i].text;
	divCommentsElt.appendChild(divCommentText);
	divCommentText.style.backgroundColor = "#E1DADA";
	divCommentText.style.padding = "1rem";
	divCommentText.style.borderRadius = "1rem";
}

ideasElt.addEventListener("click", () => $("#exampleModalCenter").modal("show"));

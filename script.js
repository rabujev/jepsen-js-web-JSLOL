
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
//modalElt.querySelector(".comments").innerText = JSON.stringify(idea.comments);



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
	divCommentAuthor.innerText= idea.comments[i].author;
	divCommentsElt.appendChild(divCommentAuthor);

	// creation du div texte dans le div commentaire 
	divCommentText = document.createElement("div");
	divCommentText.innerText= idea.comments[i].text;
	divCommentsElt.appendChild(divCommentText);
}

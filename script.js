
// import some polyfill to ensure everything works OK
import "babel-polyfill";

const markdown = require('markdown').markdown;

//import JQuery
import $ from "jquery";

// import bootstrap's javascript part
import 'bootstrap';

// import the style
import "./style.scss";


/*
  Put the JavaScript code you want below.
*/

let ideas = JSON.parse(localStorage.getItem('ideas'));
if (ideas === null){
  ideas = [];
}

/*---------------
 * Idea-loading
 *---------------*/
let content = document.querySelector('.content');

for(let i = 0; i < ideas.length; i++){
  let idea = ideas[i];

  let ideaNode = document.createElement('div');
  ideaNode.classList = 'idea';
  let name = document.createElement('h2');
  name.classList = 'idea-name';
  name.innerText = idea.name
  ideaNode.appendChild(name);
  let description = document.createElement('p');
  description.classList = 'idea-description';
  description.innerHTML = markdown.toHTML(idea.description);
  ideaNode.appendChild(description);
  content.appendChild(ideaNode);

  console.log(idea);

  ideaNode.addEventListener("click", () => getDetails(i));
}

let modalNode = document.querySelector("#idea-detail-modal");
let detailsHTML = modalNode.innerHTML;

function getDetails(ideaNumber){
  let idea = ideas[ideaNumber];
  modalNode.innerHTML = detailsHTML;

  modalNode.querySelector('.modal-title').innerText = idea.name;
  modalNode.querySelector(".idea-description").innerHTML = markdown.toHTML(idea.description);
  modalNode.querySelector(".details").innerHTML = markdown.toHTML(idea.details);

  let commentsNode = document.querySelector(".comments");
  // Empty comments that might be left from previous one
  commentsNode.innerText = '';
  for(let i = 0; i < idea.comments.length; i++){
  	//creation du div commentaire
  	let comment = document.createElement("div");

  	// creation du div nom d'auteur dans le div commentaire
  	let author = document.createElement("div");
  	author.innerText = idea.comments[i].author;
  	comment.appendChild(author);

  	// creation du div texte dans le div commentaire
  	let commentText = document.createElement("div");
  	commentText.innerHTML = markdown.toHTML(idea.comments[i].text);
  	comment.appendChild(commentText);

    commentsNode.appendChild(comment);
  }

  modalNode.querySelector(".edit-btn").addEventListener("click", () => {
    editDetails(ideaNumber);
  });

  modalNode.querySelector(".delete-btn").addEventListener("click", () => {
    deleteIdea(ideaNumber);
  });



  $("#idea-detail-modal").modal("show");
}

/*---------------
 * Idea-creation
 *---------------*/

document.querySelector('.idea-creation').addEventListener('click', () => {
  $('#idea-creation-modal').modal('show');
});

let creationModal = document.querySelector('#idea-creation-modal');

creationModal.querySelector("#submit-idea").addEventListener('click', () => {
  let ideaName = creationModal.querySelector('.idea-name');
  let ideaDescription = creationModal.querySelector('.idea-description');
  let detailedDescription = creationModal.querySelector('.detailed-description');

  let userIdea = {
    name: ideaName.value,
    description: ideaDescription.value,
    details: detailedDescription.value,
    comments: [],
  };

  ideaName.value = '';
  ideaDescription.value = '';
  detailedDescription.value = '';

  storeIdea(userIdea);

  window.location.reload();
});


function storeIdea(idea, ideaNumber) {
  if(typeof ideaNumber === "undefined"){
    ideas.push(idea);
  } else {
    ideas[ideaNumber] = idea;
  }

  localStorage.setItem('ideas', JSON.stringify(ideas));

}


/*---------------
 * Idea-edition
 *---------------*/

function editDetails(ideaNumber){
  let idea = ideas[ideaNumber];

  modalNode.innerHTML = creationModal.innerHTML;

  modalNode.querySelector('.idea-name').value = idea.name;
  modalNode.querySelector(".idea-description").value = idea.description;
  modalNode.querySelector(".detailed-description").value = idea.details;


  modalNode.querySelector("#submit-idea").remove();

  let editBtn = document.createElement("button");
  editBtn.type="button";
  editBtn.classList = "btn btn-primary";
  editBtn.innerText = "Modifier";

  let footer = modalNode.querySelector(".modal-footer");
  let closeButton = modalNode.querySelector("#close-modal");

  editBtn.addEventListener("click", () => {
    let modif = {
      name: modalNode.querySelector('.idea-name').value,
      description: modalNode.querySelector(".idea-description").value,
      details: modalNode.querySelector(".detailed-description").value,
      comments: idea.comments,
    };

    storeIdea(modif, ideaNumber);
    window.location.reload();
  });

  footer.insertBefore(editBtn, closeButton);

}


/*---------------
 * Deleting idea
 *---------------*/

function deleteIdea(ideaNumber){
  let idea = ideas[ideaNumber];

  let confirmBtn = document.createElement("button");
  confirmBtn.type="button";
  confirmBtn.classList = "btn btn-primary";
  confirmBtn.innerText = "Confirmer la suppression";

  let footer = modalNode.querySelector(".modal-footer");
  let closeButton = modalNode.querySelector(".close-modal");

  confirmBtn.addEventListener("click", () => {
    ideas.splice(ideaNumber,1);
    localStorage.setItem('ideas', JSON.stringify(ideas));
    window.location.reload();
  });


  footer.insertBefore(confirmBtn, closeButton);

}

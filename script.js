import "babel-polyfill";
import $ from "jquery";
import 'bootstrap';
import {markdown} from 'markdown';

import "./style.scss";

/*---------------
 * Idea-loading
 *---------------*/

let ideas = JSON.parse(localStorage.getItem('ideas'));
if (ideas === null){
  ideas = [];
}

let content = document.querySelector('.content');

for(let i = 0; i < ideas.length; i++){
  let idea = ideas[i];

  let ideaNode = document.createElement('div');
  ideaNode.classList = 'idea';

  let name = document.createElement('h2');
  name.classList = 'idea-name';
  name.innerText = idea.name

  let description = document.createElement('p');
  description.classList = 'idea-description';
  description.innerHTML = markdown.toHTML(idea.description);

  ideaNode.appendChild(name);
  ideaNode.appendChild(description);
  content.appendChild(ideaNode);

  ideaNode.addEventListener("click", () =>  {
    loadDetails(i)
    $("#idea-detail-modal").modal("show");
  });
}

/*---------------
 * Details
 *---------------*/

let detailsModal = document.querySelector("#idea-detail-modal");
let detailsHTML = detailsModal.innerHTML;

function loadDetails(ideaNumber){
  let idea = ideas[ideaNumber];
  detailsModal.innerHTML = detailsHTML;

  detailsModal.querySelector('.modal-title').innerText = idea.name;
  detailsModal.querySelector(".idea-description").innerHTML = markdown.toHTML(idea.description);
  detailsModal.querySelector(".details").innerHTML = markdown.toHTML(idea.details);

  let commentWindow = document.querySelector(".comment-creation");
  let commentBtn = commentWindow.querySelector("button");

  let updateCommentButtonState = () => {
    console.log("event lancé");
    if(commentWindow.querySelector(".author").value === "" ||
       commentWindow.querySelector(".comment-text").value === "")
    {
      commentBtn.disabled = true;
    } else {
      commentBtn.disabled = false;
    }
  }
  commentWindow.querySelector(".author").addEventListener("input", updateCommentButtonState);
  commentWindow.querySelector(".comment-text").addEventListener("input", updateCommentButtonState);

  detailsModal.querySelector('.add-comment').addEventListener('click', () => {
    addComment(ideaNumber);
  });

  let commentsNode = document.querySelector(".comments");
  for(let comment of idea.comments){
  	//creation du div commentaire
  	let commentDiv = document.createElement("div");
    commentDiv.classList = "comment";

  	// creation du div nom d'auteur dans le div commentaire
  	let author = document.createElement("div");
  	author.innerText = comment.author + ':';
    author.classList = "comment-author";

  	// creation du div texte dans le div commentaire
  	let commentText = document.createElement("div");
  	commentText.innerHTML = markdown.toHTML(comment.text);
    commentText.classList = "comment-content";

    commentDiv.appendChild(author);
  	commentDiv.appendChild(commentText);
    commentsNode.appendChild(commentDiv);
  }

  detailsModal.querySelector(".edit-btn").addEventListener("click", () => {
    editDetails(ideaNumber);
  });

  detailsModal.querySelector(".delete-btn").addEventListener("click", () => {
    deleteIdea(ideaNumber);
  });
}

/*---------------
 * Idea-creation
 *---------------*/

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
  creationModal.querySelector("#submit-idea").disabled = true;

  storeIdea(userIdea);
  window.location.reload();
});

/*---------------
 * Ideas storage
 *---------------*/

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
  detailsModal.innerHTML = creationModal.innerHTML;

  detailsModal.querySelector('.idea-name').value = idea.name;
  detailsModal.querySelector(".idea-description").value = idea.description;
  detailsModal.querySelector(".detailed-description").value = idea.details;
  detailsModal.querySelector("#submit-idea").remove();

  let editBtn = document.createElement("button");
  editBtn.type="button";
  editBtn.classList = "btn btn-primary";
  editBtn.innerText = "Edit";

  editBtn.addEventListener("click", () => {
    let modif = {
      name: detailsModal.querySelector('.idea-name').value,
      description: detailsModal.querySelector(".idea-description").value,
      details: detailsModal.querySelector(".detailed-description").value,
      comments: idea.comments,
    };

    storeIdea(modif, ideaNumber);
    window.location.reload();
  });

  let closeButton = detailsModal.querySelector("#close-modal");
  detailsModal.querySelector(".modal-footer").insertBefore(editBtn, closeButton);
}

/*---------------
 * Deleting idea
 *---------------*/

function deleteIdea(ideaNumber){
  let idea = ideas[ideaNumber];

  let confirmBtn = document.createElement("button");
  confirmBtn.type="button";
  confirmBtn.classList = "btn btn-primary btn-danger";
  confirmBtn.innerText = "Confirm deletion";

  confirmBtn.addEventListener("click", () => {
    ideas.splice(ideaNumber,1);
    localStorage.setItem('ideas', JSON.stringify(ideas));
    window.location.reload();
  });

  let footer = detailsModal.querySelector(".modal-footer");
  footer.querySelector(".edit-btn").style.display = "none";
  footer.querySelector(".delete-btn").style.display = "none";

  let closeButton = footer.querySelector(".close-modal");
  footer.insertBefore(confirmBtn, closeButton);
}


/*---------------
 * Adding comments
 *---------------*/

function addComment(ideaNumber){
  let idea = ideas[ideaNumber];

  let comment = {
    author: detailsModal.querySelector('.author').value,
    text: detailsModal.querySelector('.comment-text').value,
  }

  idea.comments.push(comment);
  localStorage.setItem('ideas', JSON.stringify(ideas));
  loadDetails(ideaNumber);
}

/*---------------
 * Update sumbit button
 *---------------*/

let ideaWindow = document.getElementById("idea-creation-modal");
let ideaBtn = ideaWindow.querySelector("#submit-idea");

function updateSubmitButtonState(){
  if(ideaWindow.querySelector(".idea-name").value === "" ||
     ideaWindow.querySelector(".idea-description").value === "" ||
     ideaWindow.querySelector(".detailed-description").value === "")
  {
    ideaBtn.disabled = true;
  } else {
    ideaBtn.disabled = false;
  }
}

ideaWindow.querySelector(".idea-name").addEventListener("input", updateSubmitButtonState);
ideaWindow.querySelector(".idea-description").addEventListener("input", updateSubmitButtonState);
ideaWindow.querySelector(".detailed-description").addEventListener("input", updateSubmitButtonState);

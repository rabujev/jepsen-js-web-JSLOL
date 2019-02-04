
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

let ideas = [];

/*---------------
 * Idea-loading
 *---------------*/
let content = document.querySelector('.content');

for(let i = 0; i < ideaCount; i++){
  let idea = JSON.parse(localStorage.getItem('idea' + i));
  ideas.push(idea);

  if(idea == null){
    console.error(`idea${i} is null`);
    return;
  }

  let ideaNode = document.createElement('div');
  ideaNode.classList = 'idea';
  let name = document.createElement('h2');
  name.classList = 'idea-name';
  name.innerText = idea.name
  ideaNode.appendChild(name);
  let description = document.createElement('p');
  description.classList = 'idea-description';
  description.innerText = idea.description;
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
  modalNode.querySelector(".idea-description").innerText = idea.description;
  modalNode.querySelector(".details").innerText = idea.details;

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
  	commentText.innerText= idea.comments[i].text;
  	comment.appendChild(commentText);

    commentsNode.appendChild(comment);
  }

  modalNode.querySelector(".edit-btn").addEventListener("click", () => {
    editDetails(ideaNumber);
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
    localStorage.setItem('idea' + ideaCount, JSON.stringify(idea));
    ideaCount++;
    localStorage.setItem('ideaCount', ideaCount);   
  } else {
    localStorage.setItem('idea' + ideaNumber, JSON.stringify(idea));
  }

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


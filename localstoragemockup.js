let ideaCount = localStorage.getItem("ideaCount");
if(ideaCount === null){
  ideaCount = 0;
} else {
  ideaCount = parseInt(ideaCount);
}

function storeIdea(idea) {
  localStorage.setItem('name' + ideaCount, idea.name);
  localStorage.setItem('description' + ideaCount, idea.description);
  localStorage.setItem('details' + ideaCount, idea.details);
  localStorage.setItem('comments' + ideaCount, JSON.stringify(idea.comments));
  ideaCount++;
}

function ideaGenerator(n){
  for(let i = 0; i < n; i++){
    let idea = genericIdeas[i%genericIdeas.length];
    storeIdea(idea);
  }
}
//blabla
const genericIdeas = [
  {
    name: "Lobotimisatino",
    description: "Au moyen de la publicité",
    details: "au moyen de messages subliminaux...",
    comments: [{
      author: "Ludivine",
      text: "Cool",
    }, {
      auhor: "Samuel",
      text: "J'ai mal au crâne, j'aimerais bien qu'on m'enlève mon cerveau. \
      Quel bon produit le Lobotimisatino!",
    }],
  }
];
ideaGenerator(3);

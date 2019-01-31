document.querySelector("#submitIdea").addEventListener('click', () => {
  let userIdeaName = document.querySelector('.ideaname').value;
  let userIdeaDescription = document.querySelector('.ideadescription').value;//
  let userDetailedDescription = document.querySelector('.detaileddescription').value;

  let userIdea = {
    name: userIdeaName,
    description: userIdeaDescription,
    details: userDetailedDescription,
    comments: [],
  };

  storeIdea(userIdea);
});


function storeIdea(idea) {
  localStorage.setItem('idea' + ideaCount, JSON.stringify(idea));
  ideaCount++;
  localStorage.setItem('ideaCount', ideaCount);
}

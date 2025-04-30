async function recupererPersonnages() {
    const reponse = await fetch("https://rickandmortyapi.com/api/character");
    const personnages = await reponse.json();
    console.log(personnages);

    const personnagesElement = document.querySelector(".personnages")

    for(const personnage of personnages.results){
        personnagesElement.innerHTML += `
            <div class="personnage">
                <h2>${ personnage.name }</h2>
                <img src="${personnage.image}"/>              
            </div>
        `
        personnages.results.splice(18, 1)
    }

}


recupererPersonnages();


document.getElementById("postForm").addEventListener("submit", function (event)) {
    //On écoute l’événement submit sur le formulaire avec l’ID postForm
Event.preventDefaut();
// Empêche le comportement par défaut du formulaire, c’est-à-dire le rechargement de la page.
const title = document.getElementById("titleInput").value;
const content = document.getElementById("contentInput").value;
//On récupère ce que l’utilisateur a tapé dans le champ "titre" et dans la zone de texte "contenu".
const newPost = document.createElement("div");
newPost.className = "post";
//On crée une nouvelle div vide qui représentera le post.
newPost.innerHTML = 
<h3>${title}</h3>;
<p>${content}</p>;
//On remplit la div avec du contenu HTML : un titre <h3> et un paragraphe <p>
document.getElementById("feed").prepend(newPost);
//dans lesquels on insère ce que l’utilisateur a tapé
document.getElementById("postForm").reset();
//
}
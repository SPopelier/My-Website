async function recupererPersonnages() {
    const reponse = await fetch("https://rickandmortyapi.com/api/character");
    const personnages = await reponse.json();
    console.log(personnages);
    
    const personnagesElement = document.querySelector(".personnages")
    
    for (const personnage of personnages.results) {
        personnagesElement.innerHTML += `
            <div class="personnage">
                <h2>${personnage.name}</h2>
                <img src="${personnage.image}"/>              
            </div>
        `
        personnages.results.splice(18, 1)
    }
    
}


recupererPersonnages();


document.addEventListener("DOMContentLoaded", function () {
    // Dans le DOM récupère l'élément qui a l id formulaire et stock le dans la variable form
    const form = document.getElementById("formulaire");
    // Si le formulaire existe
    if (form) {
        // Séléction tous les éléments qui ont la class formitem dans le formulaire et stock les dans une variable inputs 
        const inputs = form.querySelectorAll('.formItem');
        //Boucle sur le tableau d inputs. Chaque element du tableau son stocker dans la variable input
        // for(let i = 0 ; i < inputs.length; i++)
        inputs.forEach(input => {
            console.log("un inputs : ", input);
            // ajout un écouteur qui attend le clique de l'utilisateur dans l'input
            
            input.addEventListener("click", function () {
                console.log("il a cliqué");
                const img = document.createElement("img");

                // si l'élément est cliqué, ajout un gros cadre rouge
                input.style.border = "red 10px solid";
            });
            
        })
        
        
        
        console.log("Tous les inputs: ", inputs);
        
    }
    
    
    
    
    
    
    
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // ✅ Empêche le rechargement
        
        const title = document.getElementById("titleInput").value;
        const content = document.getElementById("contentInput").value;
        
        const newPost = document.createElement("div");
        newPost.className = "post";
        newPost.innerHTML = `<h3>${title}</h3><p>${content}</p>`;
        
        document.getElementById("feed").prepend(newPost);
        
        form.reset(); // Réinitialise le formulaire
    });
});

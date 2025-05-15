/*const menuHamburger = document.querySelector(".menu-burger")
const navLinks = document.querySelector(".nav-links")

menuHamburger.addEventListener('click',()=>{
    // Si la classe 'mobile-menu' est présente dans la liste des class
    console.log("Liste des classe : ", navLinks.classList);
    console.log("La liste ne contient pas la classe mobile-menu, donc le menu n'est pas ouvert : ", navLinks.classList.contains('mobile-menu'));
    if(!navLinks.classList.contains('mobile-menu')){
        //Ajouter la classe
        navLinks.classList.add('mobile-menu');
        navLinks.classList.add('menu-open');
        //Afficher
        navLinks.style = "display:block";
    }else{
        //Retirer la classe la classe
        navLinks.classList.remove('mobile-menu');
        navLinks.classList.remove('menu-open');
        //Masque
        navLinks.style = "display:none";
    }

})*/

/*
document.addEventListener('DOMContentLoaded', () => {
    const refreshBtn = document.getElementById('btnRefresh');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            window.location.reload(false);
        });
    }
});
*/
document.querySelector('button').addEventListener('click', startGame);
//addEventListener pour réagir au click

let clickCount = 0;
let card1 = null;
let card2 = null;
let tentativesRestantes = 0;
let verrouillage = false;

async function startGame() {
    const level = document.getElementById('difficulte').value;
    //pour obtenir la valeur du niveau de difficulté

    let apiUrl = '';

    if (level === 'facile') {
        apiUrl = 'https://mocki.io/v1/b814d754-4ad4-438e-bf58-9431e91c136c'
    } else if (level === 'moyen') {
        apiUrl = 'https://mocki.io/v1/c43d8ec6-c390-4a2d-9841-16a8c9cfa9a2'
    } else if (level === 'difficile') {
        apiUrl = 'https://mocki.io/v1/cb6b3070-0649-4f91-9414-e4bafc40419a'
    }


    //construis URL de API
    console.log("apiUrl",apiUrl);
    try {
        const response = await fetch(apiUrl)
        const json = await response.json()
        addImage(json)
    } catch (error) {
        console.log(error)
    }


}

function cardClicked() {
    if (verrouillage) return; // bloque clics pendant l'attente
    if (this.classList.contains('revealed') || this.classList.contains('matched')) return;

    this.classList.add('revealed');

    if (clickCount === 0) {
        card1 = this;
        clickCount = 1;
    } else if (clickCount === 1) {
        card2 = this;
        clickCount = 2;
        verrouillage = true; // bloque les clics pendant le test

        const image1 = card1.getAttribute('data-image');
        const image2 = card2.getAttribute('data-image');

        if (image1 === image2) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            resetCards();
        } else {
            tentativesRestantes--;
            updateTentativesAffichage();

            setTimeout(() => {
                card1.classList.remove('revealed');
                card2.classList.remove('revealed');
                resetCards();
            }, 1000);

            if (tentativesRestantes <= 0) {
                setTimeout(() => {
                    alert("Partie terminée ! Vous n'avez plus de tentatives.");
                    document.querySelectorAll('.memory-card').forEach(card => {
                        card.removeEventListener('click', cardClicked);
                    });
                }, 1100);
            }
        }
    }
}

function resetCards() {
    clickCount = 0;
    card1 = null;
    card2 = null;
    verrouillage = false;
}

function updateTentativesAffichage() {
    const tentativesText = document.getElementById('tentatives-text');
    if (tentativesText) {
        tentativesText.textContent = `Nombres de tentatives restantes : ${tentativesRestantes}`;
    }
}


function addImage(data) {

    tentativesRestantes = data.tentatives_max ?? 10;

    document.getElementById('game-info').innerHTML = `
    <h2>${data.nom}</h2>
    <p>Niveau : ${data.niveau}</p>
    <p id="tentatives-text">Nombres de tentatives restantes : ${tentativesRestantes}</p>
    `;
    //affiche les informations dans le conteneurs game-info
    //affiche les paires d'images dans images-container

    const imagesContainer = document.getElementById('images-container');
    imagesContainer.innerHTML = '';
    //réinitiallise le conteneur avant d'ajouter des images


    let allImages = [];
    data.images.forEach(image => {
        allImages.push(image); // 1ère copie
        allImages.push(image); // 2ème copie
    });

    // 2. Mélange le tableau
    allImages.sort(() => Math.random() - 0.5);//méthode .sort qui calcul les différences

    // 3. Crée et ajoute les cartes (face visible pour test, à cacher ensuite)
    allImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.setAttribute('data-image', image);

        const frontFace = document.createElement('img');
        frontFace.src = '/assets//img/' + image;
        frontFace.classList.add('front-face');

        const backFace = document.createElement('img');
        backFace.src = 'https://fond-ecran-anime.fr/wp-content/uploads/2022/09/Live-Wallpaper-Iphone-Computer-Desktop-1080p-Wallpaper-Wallpapers-Android-Backgrounds-Desktop-Live-Wallpapers-Funny-Wallpapers-576x1024.jpg';
        backFace.classList.add('back-face');

        card.appendChild(frontFace);
        card.appendChild(backFace);

        card.addEventListener("click", cardClicked);

        imagesContainer.appendChild(card);
    });

    updateTentativesAffichage();

}









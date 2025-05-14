document.querySelector('button').addEventListener('click', startGame);
//addEventListener pour réagir au click


async function startGame() {
    const level = document.getElementById('difficulte').value;
    //pour obtenir la valeur du niveau de difficulté

    let apiUrl = '';

    if (level === 'facile') {
        apiUrl = 'https://mocki.io/v1/1750af9d-0495-4f92-8919-d1b32dc2958f'
    } else if (level === 'moyen') {
        apiUrl = 'https://mocki.io/v1/5f7816bc-b321-40d8-9fbd-0ac71ba4de56'
    } else if (level === 'difficile') {
        apiUrl = 'https://mocki.io/v1/b718fd8c-248f-4f16-bc98-f3c0f727a5e6'
    }


    //construis URL de API
    try {
        const response = await fetch(apiUrl)
        const json = await response.json()
        addImage(json)
        console.log(json)
    } catch (error) {
        console.log(error)
    }


}

let clickCount = 0;
let card1 = null;
let card2 = null;

function cardClicked() {
    if (this.classList.contains('revealed') || this.classList.contains('matched')) return;

    this.classList.add('revealed');

    if (clickCount === 0) {
        card1 = this;
        clickCount = 1;
    } else if (clickCount === 1) {
        card2 = this;
        clickCount = 2;

        if (card1.querySelector('.front-face').src === card2.querySelector('.front-face').src) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            resetCards();
        } else {
            setTimeout(() => {
                card1.classList.remove('revealed');
                card2.classList.remove('revealed');
                resetCards();
            }, 1000);
        }
    }
}

function resetCards() {
    clickCount = 0;
    card1 = null;
    card2 = null;
}

function addImage(data) {
    document.getElementById('game-info').innerHTML = `
    <h2>${data.nom}</h2>
    <p>Niveau : ${data.niveau}</p>
    <p>Nombres de tentatives : ${data.tentatives_max}</p>
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
    
        const frontFace = document.createElement('img');
        frontFace.src = image;
        frontFace.classList.add('front-face');
    
        const backFace = document.createElement('img');
        backFace.src =  'https://fond-ecran-anime.fr/wp-content/uploads/2022/09/Live-Wallpaper-Iphone-Computer-Desktop-1080p-Wallpaper-Wallpapers-Android-Backgrounds-Desktop-Live-Wallpapers-Funny-Wallpapers-576x1024.jpg';
        backFace.classList.add('back-face');
    
        card.appendChild(frontFace);
        card.appendChild(backFace);
    
        card.addEventListener("click", cardClicked);
    
        imagesContainer.appendChild(card);
    });
    

}









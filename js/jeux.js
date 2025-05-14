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
    allImages.sort(() => Math.random() - 0.5);

    // 3. Crée et ajoute les cartes (face visible pour test, à cacher ensuite)
    allImages.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Carte ${index}`;
        img.classList.add('memory-card'); // pour style ou logique future

        imagesContainer.appendChild(img);
    });
}



document.querySelector('button').addEventListener('click', startGame);
//addEventListener pour réagir au click


async function startGame() {
    const level = document.getElementById('difficulte').value;
    //pour obtenir la valeur du niveau de difficulté

    let apiUrl = '';

    if (level === 'facile') {
        apiUrl = 'https://mocki.io/v1/49998f59-6350-47cc-b01c-6b1af31186f8'
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

    data.images.forEach(image => {
        //parcours chaque élement du tableau (data.imagePairs qui contient deux objets du tableau)
        const imageDiv = document.createElement('div');
        //créer une div qui contiens les paires d'images
        imageDiv.classList.add('memory-pair');
        //class memory-pair pour le css

        const img1 = document.createElement('img');
        //créer un élément qui ajoute une image sur la page 
        img1.src = image;
        //définit la source de l'image 
        img1.alt = 'Image 1';

        const img2 = document.createElement('img');
        img2.src = image;
        img2.alt = 'Image 2';

        imageDiv.appendChild(img1);
        imageDiv.appendChild(img2);
        //ajoute la première image comme enfant de l'élément div (imageDiv)

        imagesContainer.appendChild(imageDiv);
        //cette ligne ajoute une paire d'images au conteneur principale
    });
}
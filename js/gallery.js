function setView(view) {
    const gallery = document.getElementById('gallery');

    if (view === 'grid') {
        gallery.classList.remove('column');
        gallery.classList.add('grid');
    } else if (view === 'column') {
        gallery.classList.remove('grid');
        gallery.classList.add('column');
    }
}

let images = ["https://remeng.rosselcdn.net/sites/default/files/dpistyles_v2/rem_16_9_917w/2023/07/05/node_500483/13303189/public/2023/07/05/B9734678695Z.1_20230705111130_000%2BGQ3MVD10P.1-0.jpg?itok=_3MPxBRk1688548297", "https://static.wikia.nocookie.net/rick-et-morty/images/4/4b/S1e1_Rick-and-morty.png/revision/latest?cb=20170802123639&path-prefix=fr", "https://m.media-amazon.com/images/S/pv-target-images/6d187358758b1f41e9f4c67a5bf26506141bfff9fbec2f281ae5e5a08968da32.jpg", "https://uproxx.com/wp-content/uploads/2018/04/pickle_rick.jpg", "https://www.ecranlarge.com/content/uploads/2019/05/rick-et-morty-photo-1085846.jpg", "https://www.denofgeek.com/wp-content/uploads/2021/06/rick-and-morty-season-5-episode-1.jpg?resize=768%2C432", "https://imgsrc.cineserie.com/2022/09/template-jdg-2022-08-29t154949-806.jpg?ver=1", "https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2023-11/evil%20morty.jpg", "https://insightsscroll.com/.fr/public/uploads/cache/1734001283rick-and-morty%20(1).jpg.webp"];

const gallery = document.getElementById('gallery');

images.forEach(url => {
    let img = document.createElement('img');
    img.src = url;
    img.alt = "Rick & Morty Image";
    gallery.appendChild(img);
});

const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.next');
const prevButton = document.querySelector('.carousel-button.prev');

let currentIndex = 0;

function updateSlidePosition() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = 'translateX(-' + (slideWidth * currentIndex) + 'px)';
}

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlidePosition();
});

prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlidePosition();
});

const form = document.querySelector('#formulaireImg');
const imageInput = document.getElementById("imageInput");
const boutonSuppression = document.getElementById('supprimer');
const zone = document.getElementById('zoneImage')


form.addEventListener("submit", function (e) {
    e.preventDefault(); // ✅ Empêche le rechargement

    const file = imageInput.files[0];

    if (!file) {
        alert("Veuillez sélectionner une image");
        return;
    }

    let reader = new FileReader(); //lire un fichier; instancie un lecteur de fichier

    reader.onload = function (e) {//lire le fichier;quand le fichier est chargé
        const newImage = document.createElement('img');
        newImage.src = e.target.result;//le résultat du chargement du fichier
        newImage.alt = "Nouvelle image";
        zone.appendChild(newImage);
    };

    reader.readAsDataURL(file);//quel fichier lire; passe le fichier

});

boutonSuppression.addEventListener('click', supprimerImage);
console.log(supprimerImage);

function supprimerImage() {
    zone.innerHTML = "";
}

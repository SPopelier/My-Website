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

let images = ['https://wallpaperbat.com/img/626097-rick-and-morty-hd-wallpaper-and-background-image.png',
    'https://wallpapersok.com/images/hd/dope-rick-and-morty-moment-4p6w15r0w9a5f71p.jpg',
    'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/05/rick-morty.jpeg',
    'https://uproxx.com/wp-content/uploads/2018/04/pickle_rick.jpg',
    'https://i1.sndcdn.com/artworks-000209350405-o0sv13-t500x500.jpg',
    'https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/08/best-and-worst-rick-sanchez-moments.jpg',
    'https://media.gqmagazine.fr/photos/5d2869bb1692890008ab44a3/16:9/w_1280,c_limit/Rick&Morty.jpg',
    'https://i.ytimg.com/vi/q9xHC6AySBM/maxresdefault.jpg',
    'https://wallpapersok.com/images/hd/rick-and-morty-stoner-uncanny-while-driving-b1fduxzxutpkvelw.jpg',
     'https://i.ebayimg.com/images/g/42IAAOSwNHpfUROu/s-l1200.jpg',
    'https://mrwallpaper.com/images/hd/dope-rick-and-morty-lounging-1jvaqakydz00r2j9.jpg',
 ]
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

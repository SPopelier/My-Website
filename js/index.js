const menuHamburger = document.querySelector(".menu-burger")
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

})
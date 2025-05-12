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
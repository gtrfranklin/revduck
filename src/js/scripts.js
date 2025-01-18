document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.revduck-navbar');
    if (window.scrollY > 16) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

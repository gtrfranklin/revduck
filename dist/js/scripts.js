/*!
* Start Bootstrap - Revduck v1.0.0 (undefined)
* Copyright 2013-2025 gtrfranklin
* Licensed under copyright (https://github.com/StartBootstrap/revduck/blob/master/LICENSE)
*/
document.addEventListener('scroll', function() {
    const navbar = document.querySelector('.revduck-navbar');
    if (window.scrollY > 16) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

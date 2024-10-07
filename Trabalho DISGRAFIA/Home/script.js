// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const scrollY = window.scrollY;
    header.classList.toggle('scrolled', scrollY > 50);
    hero.style.backgroundPositionY = `${scrollY * 0.5}px`;
});

// Lightbox function for gallery
function openLightbox(src) {
    let lightbox = document.createElement('div');
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = '1000';
    lightbox.style.cursor = 'pointer';
    lightbox.style.transition = 'opacity 0.5s ease';
    lightbox.innerHTML = `<img src="${src}" style="max-width: 90%; max-height: 90%; border: 5px solid #007bff; border-radius: 10px; box-shadow: 0 0 20px rgba(0, 123, 255, 0.8); transition: transform 0.3s; transform: scale(0);">`;
    lightbox.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    document.body.appendChild(lightbox);
    setTimeout(() => {
        lightbox.querySelector('img').style.transform = 'scale(1)';
    }, 10);
}

// Accessibility features
document.getElementById('toggle-contrast').addEventListener('click', function() {
    document.body.classList.toggle('high-contrast');
});

document.getElementById('toggle-font-size').addEventListener('click', function() {
    document.body.classList.toggle('large-font');
});

// Toggle profile menu visibility
function toggleProfileMenu() {
    const menu = document.getElementById('profile-menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

// Close profile menu if clicked outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('profile-menu');
    const profilePic = document.querySelector('.profile-pic');
    if (!profilePic.contains(event.target) && !menu.contains(event.target)) {
        menu.style.display = 'none';
    }
});

// Simulate user login state
const isLoggedIn = false; // Change this to simulate login state

if (isLoggedIn) {
    document.getElementById('profile-info').style.display = 'flex';
} else {
    document.getElementById('profile-info').style.display = 'none';
}

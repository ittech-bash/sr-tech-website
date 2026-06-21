// Wait for the entire website to load before running scripts
document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Navigation Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Automatically Update Footer Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Fade-in Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15, // Triggers when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it has faded in
            }
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // 4. Before & After Image Slider
    const sliders = document.querySelectorAll('.ba-slider-container');
    
    sliders.forEach(slider => {
        const range = slider.querySelector('.ba-range');
        
        if (range) {
            // Update the CSS variable whenever the slider is dragged
            range.addEventListener('input', (e) => {
                slider.style.setProperty('--slider-pos', `${e.target.value}%`);
            });
        }
    });

});

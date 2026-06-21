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
// 6. Contact Form to WhatsApp Redirect
    const quoteForm = document.getElementById('quote-form');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Stops the form from causing the 404 error page refresh
            
            // Grab the data the user typed in
            const name = document.querySelector('input[name="name"]').value;
            const phone = document.querySelector('input[name="phone"]').value;
            const service = document.querySelector('select[name="service"]').value;
            const message = document.querySelector('textarea[name="message"]').value;
            
            // Format the message for WhatsApp
            const waText = `Hello S & R Tech Engineering, I would like to request a quote.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service Required:* ${service}\n*Project Details:* ${message}`;
            
            // Create the final WhatsApp URL (Using your specific number)
            const waUrl = `https://wa.me/6591694931?text=${encodeURIComponent(waText)}`;
            
            // Open WhatsApp in a new tab
            window.open(waUrl, '_blank');
        });
    }

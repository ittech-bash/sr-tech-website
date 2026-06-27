document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Set Current Year in Footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Smart Image Loader (.jpg, .jpeg, .png fallback & auto-hide)
    function applySmartLoader(img) {
        const extensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];
        let currentAttempt = 0;
        
        // Grab the base URL without the extension
        const baseUrl = img.src.substring(0, img.src.lastIndexOf('.'));
        
        img.onerror = function() {
            currentAttempt++;
            
            // Try the next extension
            if (currentAttempt < extensions.length) {
                this.src = baseUrl + extensions[currentAttempt];
            } else {
                // If all fail, completely hide the parent grid box so it vanishes cleanly
                const parentGridItem = this.closest('.grid-item');
                if (parentGridItem) {
                    parentGridItem.style.display = 'none';
                } else {
                    this.style.display = 'none';
                }
            }
        };

        // Catch images that already failed before JS initialized
        if (img.complete && img.naturalWidth === 0) {
            img.onerror();
        }
    }

    // Apply the smart loader to all images in the gallery grid
    document.querySelectorAll('.grid-item img').forEach(applySmartLoader);

    // 4. Dynamic Gallery Filtering UX
    const filterBtns = document.querySelectorAll('.filter-btn');
    const gridItems = document.querySelectorAll('.grid-item');

    if (filterBtns.length > 0 && gridItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                
                // Remove 'active' class from all buttons, add to clicked
                filterBtns.forEach(button => button.classList.remove('active'));
                btn.classList.add('active');

                // Get category to filter
                const filterValue = btn.getAttribute('data-filter');

                // Show/hide grid items instantly based on category
                gridItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    // Note: If an item is already hidden by the Smart Loader (display: none),
                    // toggling the .hide class will not override it. It stays hidden permanently!
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }
});

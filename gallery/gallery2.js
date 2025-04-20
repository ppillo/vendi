// gallery2.js

document.addEventListener('DOMContentLoaded', () => {
  const lightbox = GLightbox({
    selector: '.glightbox', // Select elements with the 'glightbox' class
    touchNavigation: true, // Enable touch navigation on mobile
    loop: true, // Loop through gallery images
    // Optional: Add descriptions from a data attribute if needed
    // descriptionSource: 'data-desc',
    // More options available: https://github.com/biati-digital/glightbox
  });
}); 
// AJAX Form Submission to Formspree
const contactForm = document.getElementById('contact-modal-form');
const confirmationMessage = document.getElementById('modal-confirmation');
const submitButton = document.getElementById('modal-submit-button');
const contactModalInstance = new bootstrap.Modal(document.getElementById('contactModal'));

if (contactForm) {
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default browser submission

    const formData = new FormData(contactForm);
    const submitButtonOriginalText = submitButton.textContent;
    submitButton.disabled = true; // Disable button during submission
    submitButton.textContent = 'Sending...'; // Indicate processing

    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json' // Important for Formspree AJAX
      }
    })
      .then(response => {
        if (response.ok) {
          // Success!
          contactForm.classList.add('d-none'); // Hide form
          submitButton.classList.add('d-none'); // Hide submit button
          confirmationMessage.classList.remove('d-none'); // Show confirmation

          // Optional: Trigger GA event for successful submission
          if (typeof gtag === 'function') { // Check if gtag exists
            gtag('event', 'generate_lead', { 'event_category': 'conversion', 'event_label': 'contact_form_submit' });
          }

          // Close modal after a delay
          setTimeout(() => {
            contactModalInstance.hide();
          }, 3000); // Close after 3 seconds

        } else {
          // Server returned an error response (e.g., validation error from Formspree)
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              alert(data["errors"].map(error => error["message"]).join(", "));
            } else {
              alert('Oops! There was a problem submitting your form. Please try again.');
            }
          }).catch(() => {
            // Handle cases where response is not valid JSON
            alert('Oops! An unexpected error occurred. Please try again.');
          });
        }
      })
      .catch(error => {
        // Network error
        console.error('Error submitting form:', error);
        alert('Oops! There was a network problem submitting your form. Please check your connection and try again.');
      })
      .finally(() => {
        // Reset button state in the 'hidden.bs.modal' event listener instead
        // to ensure it resets even if auto-close doesn't happen due to error.
      });
  });
}

// Reset form and button visibility when modal is closed
const contactModalElement = document.getElementById('contactModal');
if (contactModalElement) {
  contactModalElement.addEventListener('hidden.bs.modal', function () {
    if (confirmationMessage && !confirmationMessage.classList.contains('d-none')) {
      confirmationMessage.classList.add('d-none'); // Always hide confirmation on close
    }
    if (contactForm) {
      contactForm.reset();
      contactForm.classList.remove('d-none'); // Always show form on close/reopen
    }
    if (submitButton) {
      submitButton.disabled = false; // Re-enable button
      submitButton.textContent = 'Send Inquiry'; // Reset button text
      submitButton.classList.remove('d-none'); // Always show submit button on close/reopen
    }
  });
} 
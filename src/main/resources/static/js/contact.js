/**
 * contact.js - JavaScript for Contact Page
 * Handles contact form validation and submission
 */

/**
 * Initialize contact page
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a property inquiry from session storage
    const propertyInquiry = sessionStorage.getItem('propertyInquiry');
    
    if (propertyInquiry) {
        const subjectField = document.getElementById('subject');
        if (subjectField) {
            subjectField.value = `Inquiry about: ${propertyInquiry}`;
        }
        // Clear the session storage
        sessionStorage.removeItem('propertyInquiry');
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

/**
 * Handle form submission
 */
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate form
    if (!validateForm(name, email, subject, message)) {
        return;
    }
    
    // Since no backend submission is required, show success message
    displayFormMessage('success', 'Thank you for contacting us! We will get back to you within 24 hours.');
    
    // Reset form
    document.getElementById('contactForm').reset();
}

/**
 * Validate form fields
 */
function validateForm(name, email, subject, message) {
    // Validate name
    if (name.length < 2) {
        displayFormMessage('error', 'Please enter a valid name (at least 2 characters).');
        return false;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
        displayFormMessage('error', 'Please enter a valid email address.');
        return false;
    }
    
    // Validate subject
    if (subject.length < 3) {
        displayFormMessage('error', 'Please enter a subject (at least 3 characters).');
        return false;
    }
    
    // Validate message
    if (message.length < 10) {
        displayFormMessage('error', 'Please enter a message (at least 10 characters).');
        return false;
    }
    
    return true;
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display form message (success or error)
 */
function displayFormMessage(type, message) {
    const messageContainer = document.getElementById('formMessage');
    
    if (type === 'success') {
        messageContainer.className = 'block p-4 rounded-lg bg-green-50 border-2 border-green-200 text-green-700 text-center font-medium';
    } else {
        messageContainer.className = 'block p-4 rounded-lg bg-red-50 border-2 border-red-200 text-red-700 text-center font-medium';
    }
    
    messageContainer.textContent = message;
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
        messageContainer.className = 'hidden';
        messageContainer.textContent = '';
    }, 5000);
}

/**
 * Real-time email validation
 */
document.addEventListener('DOMContentLoaded', function() {
    const emailInput = document.getElementById('email');
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            if (email && !isValidEmail(email)) {
                this.classList.add('border-red-400');
                this.classList.remove('border-teal-200');
            } else {
                this.classList.remove('border-red-400');
                this.classList.add('border-teal-200');
            }
        });
    }
});

/**
 * Phone number formatting (optional)
 */
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove non-numeric characters
            let value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            this.value = value;
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your actual EmailJS public key
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    if (!isValid) return;
    
    // Get form data
    const formData = {
        user_name: this.user_name.value,
        user_email: this.user_email.value,
        message: this.message.value,
        to_email: '3li.hatem.1999@gmail.com'
    };

    // Send email
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
        .then(function() {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Thank you for your message! We will get back to you soon.</p>
            `;
            document.getElementById('contact-form').appendChild(successMessage);
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, function(error) {
            alert('Failed to send message. Please try again later.');
            console.error('Error:', error);
        });
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .treatment-card, .prevention-item, section').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle
const createMobileMenu = () => {
    const nav = document.querySelector('nav');
    
    // Check if mobile menu button already exists
    if (document.querySelector('.mobile-menu-button')) return;
    
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    menuButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
    });
    
    nav.insertBefore(menuButton, nav.querySelector('.nav-links'));
};

// Initialize mobile menu on small screens
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Add window resize listener
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.mobile-menu-button')) {
            createMobileMenu();
        }
    } else {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        if (mobileMenuButton) {
            mobileMenuButton.remove();
        }
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.remove('show');
        }
    }
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect for header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        if (mobileMenuButton && navLinks && 
            !navLinks.contains(e.target) && 
            !mobileMenuButton.contains(e.target)) {
            navLinks.classList.remove('show');
        }
    });

    // Close mobile menu when clicking a link
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('show');
            });
        });
    }

    // Loading Animation
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);

    // Hide loading overlay after content is loaded
    window.addEventListener('load', function() {
        loadingOverlay.classList.add('fade-out');
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    });

    // Scroll to Top Button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

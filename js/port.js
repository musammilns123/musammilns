// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Toggle dropdown menu
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown menus
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    dropdownBtn.addEventListener('click', function() {
        dropdownContent.classList.toggle('active');
        this.querySelector('.fa-caret-down').classList.toggle('fa-caret-up');
    });
    
    // Project filtering functionality (for projects.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Contact form submission (for contact.html)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Gather form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would typically send the data to a server
            // For this example, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Add active class to the current navigation item based on page URL
    const currentPage = window.location.pathname.split('/').pop();
    
    const navLinks = document.querySelectorAll('.sidebar-nav ul li a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.parentElement.classList.add('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Reveal animations when scrolling
    const revealElements = document.querySelectorAll('.skill-box, .project-card, .gallery-item');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize elements
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check on load and scroll
    window.addEventListener('load', checkReveal);
    window.addEventListener('scroll', checkReveal);
    
    // Add missing textarea element to contact.html if the page is loaded
    if (window.location.pathname.includes('contact.html')) {
        // Check if message textarea exists
        if (!document.getElementById('message')) {
            const formGroups = document.querySelectorAll('.form-group');
            if (formGroups.length > 0) {
                const lastFormGroup = formGroups[formGroups.length - 1];
                
                // Create new form group for message
                const messageGroup = document.createElement('div');
                messageGroup.className = 'form-group';
                
                const messageLabel = document.createElement('label');
                messageLabel.setAttribute('for', 'message');
                messageLabel.textContent = 'Your Message';
                
                const messageTextarea = document.createElement('textarea');
                messageTextarea.id = 'message';
                messageTextarea.name = 'message';
                messageTextarea.required = true;
                
                messageGroup.appendChild(messageLabel);
                messageGroup.appendChild(messageTextarea);
                
                // Insert after the last form group
                lastFormGroup.parentNode.insertBefore(messageGroup, lastFormGroup.nextSibling);
                
                // Add submit button if it doesn't exist
                if (!document.querySelector('button[type="submit"]')) {
                    const submitBtn = document.createElement('button');
                    submitBtn.type = 'submit';
                    submitBtn.className = 'btn';
                    submitBtn.textContent = 'Send Message';
                    
                    messageGroup.parentNode.appendChild(submitBtn);
                }
            }
        }
    }
});

// Fix for portfolio.html pagination
document.addEventListener('DOMContentLoaded', function() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    
    paginationLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all pagination links
            paginationLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link (except "Next")
            if (!this.classList.contains('next')) {
                this.classList.add('active');
            }
            
            // Scroll to top of portfolio section
            const portfolioSection = document.querySelector('.portfolio-section');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
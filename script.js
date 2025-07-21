// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initTestimonialCarousel();
    initFAQ();
    initContactForm();
    initSmoothScroll();
    initAnimations();
});

// Contact form toggle functionality (global)
window.toggleContactForm = function() {
    const form = document.getElementById('contact-form');
    const button = document.querySelector('.btn-form-toggle');
    
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        button.querySelector('.btn-text').textContent = 'Ocultar Formulario';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        form.style.display = 'none';
        button.querySelector('.btn-text').textContent = 'Formulario Completo';
    }
}

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const header = document.getElementById('header');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }

    // Close mobile menu
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(`
        .service-card,
        .step-card,
        .portfolio-case,
        .tech-item,
        .value-card,
        .faq-item,
        .hero__title-card,
        .stat-card,
        .mockup-card
    `);

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for decorations
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const decorations = document.querySelectorAll('.decoration');
        
        decorations.forEach((decoration, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            decoration.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Testimonial carousel functionality
function initTestimonialCarousel() {
    const carousel = document.getElementById('testimonials-carousel');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('.carousel-dot');
    
    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    function showSlide(index) {
        // Hide all slides
        testimonialCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current slide
        if (testimonialCards[index]) {
            testimonialCards[index].classList.add('active');
        }
        
        // Activate current dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play carousel
    setInterval(nextSlide, 5000);

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const difference = startX - endX;
        const threshold = 50;

        if (Math.abs(difference) > threshold) {
            if (difference > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

// FAQ accordion functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    console.log('FAQ items found:', faqItems.length);

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                console.log('FAQ clicked');
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Contact form functionality
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form.querySelector('.btn-submit');
    const inputs = form.querySelectorAll('.form__input, .form__textarea, .form__select');

    // Form validation
    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                showFieldError(input, 'Este campo es requerido');
            } else {
                clearFieldError(input);
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value)) {
                    isValid = false;
                    showFieldError(input, 'Ingresa un email válido');
                }
            }
            
            // Phone validation
            if (input.type === 'tel' && input.value) {
                const phonePattern = /^[\d\s\-\+\(\)]+$/;
                if (!phonePattern.test(input.value) || input.value.length < 10) {
                    isValid = false;
                    showFieldError(input, 'Ingresa un teléfono válido');
                }
            }
        });
        
        return isValid;
    }

    function showFieldError(field, message) {
        clearFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.5rem';
        
        field.parentNode.appendChild(errorDiv);
        field.style.borderColor = '#ef4444';
    }

    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('blur', validateForm);
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        try {
            await simulateFormSubmission();
            showSuccessMessage();
            form.reset();
        } catch (error) {
            showErrorMessage();
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    function simulateFormSubmission() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    function showSuccessMessage() {
        showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
    }

    function showErrorMessage() {
        showNotification('Error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

// Smooth scroll functionality
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation effects
function initAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes scaleIn {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        .animate-in {
            animation: slideUp 0.6s ease-out forwards;
        }

        .service-card:nth-child(1) { animation-delay: 0.1s; }
        .service-card:nth-child(2) { animation-delay: 0.2s; }
        .service-card:nth-child(3) { animation-delay: 0.3s; }

        .step-card { animation: slideUp 0.6s ease-out forwards; }
        .step-card:nth-child(1) { animation-delay: 0.1s; }
        .step-card:nth-child(2) { animation-delay: 0.2s; }
        .step-card:nth-child(3) { animation-delay: 0.3s; }
        .step-card:nth-child(4) { animation-delay: 0.4s; }

        .portfolio-case { animation: scaleIn 0.6s ease-out forwards; }
        .portfolio-case:nth-child(1) { animation-delay: 0.1s; }
        .portfolio-case:nth-child(2) { animation-delay: 0.2s; }
        .portfolio-case:nth-child(3) { animation-delay: 0.3s; }

        .tech-item { animation: scaleIn 0.4s ease-out forwards; }
        .tech-item:nth-child(1) { animation-delay: 0.1s; }
        .tech-item:nth-child(2) { animation-delay: 0.15s; }
        .tech-item:nth-child(3) { animation-delay: 0.2s; }
        .tech-item:nth-child(4) { animation-delay: 0.25s; }
        .tech-item:nth-child(5) { animation-delay: 0.3s; }
        .tech-item:nth-child(6) { animation-delay: 0.35s; }

        .value-card { animation: slideUp 0.5s ease-out forwards; }
        .value-card:nth-child(1) { animation-delay: 0.1s; }
        .value-card:nth-child(2) { animation-delay: 0.2s; }
        .value-card:nth-child(3) { animation-delay: 0.3s; }

        .faq-item { animation: slideUp 0.4s ease-out forwards; }
        .faq-item:nth-child(1) { animation-delay: 0.1s; }
        .faq-item:nth-child(2) { animation-delay: 0.15s; }
        .faq-item:nth-child(3) { animation-delay: 0.2s; }
        .faq-item:nth-child(4) { animation-delay: 0.25s; }
        .faq-item:nth-child(5) { animation-delay: 0.3s; }

        /* Initially hide elements that will be animated */
        .service-card,
        .step-card,
        .portfolio-case,
        .tech-item,
        .value-card,
        .faq-item {
            opacity: 0;
            transform: translateY(50px);
        }

        /* Button hover effects enhancement */
        .btn {
            position: relative;
            overflow: hidden;
        }

        .btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }

        .btn:hover::before {
            width: 300px;
            height: 300px;
        }

        /* Enhanced neomorphic hover effects */
        .service-card,
        .portfolio-case,
        .step-card,
        .value-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-card:hover,
        .portfolio-case:hover,
        .step-card:hover,
        .value-card:hover {
            transform: translateY(-8px) scale(1.02);
        }

        /* Tech item pulse animation */
        .tech-circle {
            position: relative;
        }

        .tech-circle::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.1);
            transform: scale(0);
            transition: transform 0.3s ease;
        }

        .tech-item:hover .tech-circle::after {
            transform: scale(1.2);
            animation: pulse 1s infinite;
        }

        @keyframes pulse {
            0% { transform: scale(1.2); opacity: 0.7; }
            50% { transform: scale(1.4); opacity: 0.3; }
            100% { transform: scale(1.6); opacity: 0; }
        }

        /* Form input focus enhancement */
        .form__input:focus,
        .form__textarea:focus,
        .form__select:focus {
            transform: translateY(-2px);
        }

        /* Loading spinner for submit button */
        .btn-submit.loading::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            margin: auto;
            border: 2px solid white;
            border-top: 2px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);

    // Trigger initial animations for hero section
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero__title-card, .stat-card, .mockup-card');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'slideUp 0.8s ease-out forwards';
            }, index * 200);
        });
    }, 500);
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
}, 16));

// Service package interaction
document.addEventListener('DOMContentLoaded', () => {
    const serviceButtons = document.querySelectorAll('.btn-service');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the package type from the card
            const card = button.closest('.service-card');
            const packageTitle = card.querySelector('.service-card__title').textContent;
            
            // Scroll to contact form
            const contactForm = document.getElementById('contact');
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            window.scrollTo({
                top: contactForm.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
            
            // Pre-fill the package selection
            setTimeout(() => {
                const packageSelect = document.getElementById('package');
                if (packageSelect) {
                    const packageValue = packageTitle.toLowerCase().includes('basic') ? 'basic' :
                                        packageTitle.toLowerCase().includes('premium') ? 'premium' :
                                        packageTitle.toLowerCase().includes('enterprise') ? 'enterprise' : '';
                    
                    if (packageValue) {
                        packageSelect.value = packageValue;
                        packageSelect.dispatchEvent(new Event('change'));
                    }
                }
            }, 500);
            
            // Add visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
});

// Enhanced mobile experience
if ('ontouchstart' in window) {
    // Add touch-friendly classes
    document.body.classList.add('touch-device');
    
    // Enhanced touch interactions for cards
    const interactiveCards = document.querySelectorAll('.service-card, .portfolio-case, .value-card');
    
    interactiveCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
}

// Add performance optimizations
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

if (reducedMotionQuery.matches) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

console.log('MyAppLab website loaded successfully! 🚀');

// Alternative FAQ implementation for debugging
window.addEventListener('load', function() {
    console.log('Window loaded, checking FAQ again...');
    const faqQuestions = document.querySelectorAll('.faq-question');
    console.log('FAQ questions found on load:', faqQuestions.length);
    
    faqQuestions.forEach((question, index) => {
        question.style.cursor = 'pointer';
        question.onclick = function() {
            console.log('FAQ clicked via onclick, index:', index);
            const faqItem = this.closest('.faq-item');
            if (faqItem) {
                faqItem.classList.toggle('active');
            }
        };
    });
});

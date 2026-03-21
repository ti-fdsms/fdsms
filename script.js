/**
 * FDSMS Website - Main JavaScript
 * Handles accessibility toggles, mobile menu, modals, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {

    /*======================================
      Header Scroll Effect
    ======================================*/
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /*======================================
      Mobile Menu Toggle
    ======================================*/
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const isExpanded = nav.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Icon change
        const icon = menuToggle.querySelector('.material-icons-round');
        icon.textContent = isExpanded ? 'close' : 'menu';
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.querySelector('.material-icons-round').textContent = 'menu';
        });
    });

    /*======================================
      Libras Video Modal Toggle
    ======================================*/
    const openModalBtns = document.querySelectorAll('[data-open-modal]');
    const closeModalBtns = document.querySelectorAll('[data-close-modal]');
    const modal = document.getElementById('libras');

    function openModal() {
        modal.classList.add('active');
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
        // Focus management for accessibility
        setTimeout(() => {
            modal.querySelector('.modal-close').focus();
        }, 100);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    /*======================================
      Scroll Reveal Animation
    ======================================*/
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger point in pixels from screen bottom

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // Trigger once on load to reveal elements already in view
    revealOnScroll();

    // Attach to scroll event
    window.addEventListener('scroll', revealOnScroll);
});

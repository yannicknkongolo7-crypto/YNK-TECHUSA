/* ==========================================================================
   YNK-Tech USA — Main JavaScript
   - Navbar scroll behavior
   - Mobile menu toggle
   - Scroll-reveal animations
   - Smooth scroll
   - Interactive card glow effect
   ========================================================================== */

(function () {
    'use strict';

    // --- Navbar Scroll ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // --- Scroll Reveal (Intersection Observer) ---
    function initScrollReveal() {
        var elements = document.querySelectorAll('[data-aos]');
        if (!elements.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(function (el, index) {
            el.style.transitionDelay = (index % 4) * 0.1 + 's';
            observer.observe(el);
        });
    }

    // --- Interactive Card Glow (follows mouse) ---
    function initCardGlow() {
        var cards = document.querySelectorAll('.service-card');
        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var glow = card.querySelector('.service-card-glow');
                if (glow) {
                    glow.style.background =
                        'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(41,181,232,0.12) 0%, transparent 60%)';
                    glow.style.opacity = '1';
                }
            });
            card.addEventListener('mouseleave', function () {
                var glow = card.querySelector('.service-card-glow');
                if (glow) {
                    glow.style.opacity = '0';
                }
            });
        });
    }

    // --- Smooth Scroll for anchor links ---
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;
                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    var offset = navbar.offsetHeight + 20;
                    var targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // --- Animated counter for step numbers (subtle pulse on scroll) ---
    function initStepAnimation() {
        var steps = document.querySelectorAll('.process-step');
        if (!steps.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        steps.forEach(function (step, index) {
            step.style.opacity = '0';
            step.style.transform = 'translateY(30px)';
            step.style.transition = 'opacity 0.6s ease ' + (index * 0.15) + 's, transform 0.6s ease ' + (index * 0.15) + 's';
            observer.observe(step);
        });
    }

    // Override process step reveal
    function applyProcessStepReveal() {
        var steps = document.querySelectorAll('.process-step.aos-visible');
        steps.forEach(function (step) {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        });
        if (document.querySelectorAll('.process-step:not(.aos-visible)').length > 0) {
            requestAnimationFrame(applyProcessStepReveal);
        }
    }

    // --- Initialize ---
    document.addEventListener('DOMContentLoaded', function () {
        initScrollReveal();
        initCardGlow();
        initSmoothScroll();
        initStepAnimation();
        requestAnimationFrame(applyProcessStepReveal);

        // Initial navbar check
        handleNavScroll();
    });

})();

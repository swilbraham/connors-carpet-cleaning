// ============================================
// Connor's Carpet Cleaning - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById('navbar');
    const floatingCta = document.getElementById('floatingCta');

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Floating CTA visibility
        if (scrollY > 500) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ---- Mobile nav toggle ----
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Active nav link on scroll ----
    const sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        const scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    // ---- Pricing Calculator ----
    const checkboxes = document.querySelectorAll('input[name="room"]');
    const totalPriceEl = document.getElementById('totalPrice');
    const resultNote = document.querySelector('.result-note');
    const calculatorActions = document.getElementById('calculatorActions');

    function calculatePrice() {
        let selectedRooms = [];
        let hasStairOption = false;

        checkboxes.forEach(function (cb) {
            if (cb.checked) {
                selectedRooms.push(cb.value);
                if (cb.dataset.stair === 'true') {
                    hasStairOption = true;
                }
            }
        });

        var totalRooms = selectedRooms.length;

        if (totalRooms === 0) {
            totalPriceEl.textContent = '£0.00';
            resultNote.textContent = 'Select rooms above to see your quote';
            calculatorActions.style.display = 'none';
            return;
        }

        // First room £60, each additional room £30
        var price = 60 + (Math.max(0, totalRooms - 1) * 30);

        // Silent discount: if any stair option is selected, remove £30
        if (hasStairOption) {
            price -= 30;
        }

        // Ensure price never goes below £60
        if (price < 60) {
            price = 60;
        }

        totalPriceEl.textContent = '£' + price.toFixed(2);

        // Update note with room count
        var roomText = totalRooms === 1 ? '1 room' : totalRooms + ' rooms';
        resultNote.textContent = 'Based on ' + roomText + ' selected';

        // Show actions
        calculatorActions.style.display = 'flex';
    }

    checkboxes.forEach(function (cb) {
        cb.addEventListener('change', calculatePrice);
    });

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---- Scroll animations (Intersection Observer) ----
    var animateElements = document.querySelectorAll(
        '.feature-card, .service-card, .gallery-item, .area-group, .contact-card, .contact-form-wrapper'
    );

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(function (el) {
            el.classList.add('animate-hidden');
            observer.observe(el);
        });
    }

    // Add animation styles dynamically
    var style = document.createElement('style');
    style.textContent = [
        '.animate-hidden {',
        '    opacity: 0;',
        '    transform: translateY(30px);',
        '    transition: opacity 0.6s ease, transform 0.6s ease;',
        '}',
        '.animate-in {',
        '    opacity: 1;',
        '    transform: translateY(0);',
        '}'
    ].join('\n');
    document.head.appendChild(style);
});

// Initialize GSAP ScrollTrigger plugin execution properties
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initCinematicHero();
    initNavbarScroll();
    initCustomCursor();
    initCatalogFilters();
});

/* 1. CINEMATIC HERO ENTRANCE VELOCITIES */
function initCinematicHero() {
    // Parallax background configuration
    gsap.to('.hero-bg', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        yPercent: 20,
        scale: 1.1
    });

    // Staggered presentation fade lines
    gsap.from('.animate-fade', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.3
    });
}

/* 2. NAVIGATION OVERLAY SHIFT */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* 3. HARDWARE-ACCELERATED MICRO CURSOR TRACKING */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    window.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    // Magnet expand parameters on target interactives
    const structuralTargets = document.querySelectorAll('a, button, .artwork-card');
    structuralTargets.forEach(target => {
        target.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 4, backgroundColor: 'rgba(197, 168, 128, 0.2)' });
        });
        target.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, backgroundColor: '#C5A880' });
        });
    });
}

/* 4. FLUID CATALOG MASONRY FILTERING MECHANICS */
function initCatalogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.artwork-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Adjust active visibility states
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const criteria = button.getAttribute('data-filter');

            // Animate transition matrix boundaries smoothly using GSAP layout targets
            gsap.to(cards, {
                opacity: 0,
                scale: 0.9,
                duration: 0.3,
                onComplete: () => {
                    cards.forEach(card => {
                        const targetCategory = card.getAttribute('data-category');
                        if (criteria === 'all' || targetCategory === criteria) {
                            card.style.display = 'block';
                            gsap.to(card, { opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

/* 5. INTERACTIVE ACQUISITION MODAL WORKFLOW MANAGEMENT */
function openInquiryModal(title, artist, valuation, imageSrc) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalArtist').innerText = artist;
    document.getElementById('modalPrice').innerText = valuation;
    document.getElementById('modalImg').src = imageSrc;

    // Show initial context fields cleanly
    document.getElementById('acquisitionForm').classList.remove('hidden');
    document.getElementById('successState').classList.add('hidden');

    document.getElementById('inquiryModal').classList.add('open');
}

function closeModal() {
    document.getElementById('inquiryModal').classList.remove('open');
}

function handleInquirySubmit(event) {
    event.preventDefault();
    
    // Smooth translation into validation state
    gsap.to('#acquisitionForm', {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            document.getElementById('acquisitionForm').classList.add('hidden');
            const successEl = document.getElementById('successState');
            successEl.classList.remove('hidden');
            gsap.fromTo(successEl, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
        }
    });
}
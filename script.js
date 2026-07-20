// ============================================
// DARK MODE
// ============================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    if (!darkModeToggle) {
        console.warn('Dark mode toggle button not found');
        return;
    }

    // Check for saved user preference, first in localStorage, then in system preferences
    function getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Check if user has dark mode enabled at system level
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Apply theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            htmlElement.removeAttribute('data-theme');
        }
    }

    // Initialize theme on page load
    const currentTheme = getInitialTheme();
    applyTheme(currentTheme);

    // Toggle theme when button is clicked
    darkModeToggle.addEventListener('click', function() {
        const isDark = htmlElement.hasAttribute('data-theme');
        if (isDark) {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

/* ============================================
   HASH - ARTIST PORTFOLIO
   Interactive JavaScript with Dark Mode
   ============================================ */

// ============================================
// ARTWORK DATA FOR LIGHTBOX
// ============================================
const artworks = [
    {
        src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=1600&fit=crop',
        title: 'Golden Hour Fields',
        medium: 'Oil on Canvas, 24" × 36" — 2024'
    },
    {
        src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=1600&fit=crop',
        title: 'Crimson Tide',
        medium: 'Acrylic on Canvas, 30" × 40" — 2024'
    },
    {
        src: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200&h=1600&fit=crop',
        title: 'Midnight Bloom',
        medium: 'Oil on Linen, 20" × 20" — 2023'
    },
    {
        src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&h=1600&fit=crop',
        title: 'Coastal Dreams',
        medium: 'Acrylic on Canvas, 36" × 48" — 2024'
    },
    {
        src: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=1200&h=1600&fit=crop',
        title: 'Autumn Whisper',
        medium: 'Oil on Canvas, 18" × 24" — 2023'
    },
    {
        src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&h=1600&fit=crop',
        title: 'Solar Flare',
        medium: 'Acrylic on Wood Panel, 12" × 12" — 2024'
    },
    {
        src: 'https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=1200&h=1600&fit=crop',
        title: 'Ethereal Mist',
        medium: 'Oil on Canvas, 40" × 30" — 2023'
    },
    {
        src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=1600&fit=crop',
        title: 'Violet Horizon',
        medium: 'Acrylic on Canvas, 24" × 24" — 2024'
    }
];

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

function handleNavbarScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinkItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ============================================
// GALLERY FILTERING
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
            const categories = item.getAttribute('data-category');
            if (filter === 'all' || categories.includes(filter)) {
                item.classList.remove('hidden');
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }, 400);
            }
        });
    });
});

// ============================================
// LIGHTBOX
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxMedium = document.getElementById('lightboxMedium');
let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function changeLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = artworks.length - 1;
    } else if (currentLightboxIndex >= artworks.length) {
        currentLightboxIndex = 0;
    }
    updateLightboxContent();
}

function updateLightboxContent() {
    const artwork = artworks[currentLightboxIndex];
    lightboxImage.src = artwork.src;
    lightboxImage.alt = artwork.title;
    lightboxTitle.textContent = artwork.title;
    lightboxMedium.textContent = artwork.medium;
}

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightbox(-1);
    if (e.key === 'ArrowRight') changeLightbox(1);
});

// ============================================
// TESTIMONIALS SLIDER
// ============================================
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
let currentSlide = 0;
const totalSlides = 3;

function goToSlide(index) {
    currentSlide = index;
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}, 6000);

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    await new Promise(resolve => setTimeout(resolve, 1500));
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    formSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => {
        formSuccess.classList.remove('show');
    }, 5000);
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.process-step').forEach(step => {
    fadeObserver.observe(step);
});

document.querySelectorAll('.section-header').forEach(header => {
    fadeObserver.observe(header);
});

// ============================================
// LAZY IMAGE LOADING
// ============================================
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => img.classList.add('loaded'));
    }
});

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT FOR HERO
// ============================================
const heroBackground = document.querySelector('.hero-background');

if (heroBackground && !window.matchMedia('(pointer: coarse)').matches) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    handleNavbarScroll();
    updateActiveNav();
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

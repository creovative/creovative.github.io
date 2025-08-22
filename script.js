// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for anchor links
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
        navLinks.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(76, 175, 80, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Features slider
const featuresTrack = document.getElementById('featuresTrack');
const featuresPrev = document.getElementById('featuresPrev');
const featuresNext = document.getElementById('featuresNext');
const featuresDots = document.querySelectorAll('.features-dot');
let currentSlide = 0;
const totalSlides = featuresDots.length;

function updateFeaturesSlider() {
    const translateX = -currentSlide * 100;
    featuresTrack.style.transform = `translateX(${translateX}%)`;
    
    featuresDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

featuresNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateFeaturesSlider();
});

featuresPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateFeaturesSlider();
});

featuresDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateFeaturesSlider();
    });
});

// Auto-slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateFeaturesSlider();
}, 5000);

// Duplicate testimonials for seamless loop
const testimonialsTrack = document.getElementById('testimonialsTrack');
const originalTestimonials = testimonialsTrack.innerHTML;
testimonialsTrack.innerHTML = originalTestimonials + originalTestimonials;

const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialsTrack.style.width = `${testimonialCards.length * 280 + (testimonialCards.length - 1) * 16}px`;

// Portfolio functionality
const categoryBtns = document.querySelectorAll('.category-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const modal = document.getElementById('portfolioModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeModal = document.querySelector('.close-modal');

categoryBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtn.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.dataset.category;

        portfolioItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;

        modalImage.src = img.src;
        modalImage.alt = img.alt;
        modalTitle.textContent = title;
        modalDescription.textContent = description;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});
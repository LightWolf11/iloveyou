let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const visibleSlides = window.innerWidth <= 768 ? 1 : 3;
const sliderWrapper = document.querySelector('.slider-wrapper');
const dots = document.querySelectorAll('.dot');

function showSlides() {
    sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
    sliderWrapper.style.transform = `translateX(${-currentIndex * 100 / visibleSlides}%)`;
    updateDots();
}

function nextSlide() {
    currentIndex++;
    if (currentIndex === totalSlides - visibleSlides + 1) {
        setTimeout(() => {
            sliderWrapper.style.transition = 'none';
            currentIndex = 0;
            showSlides();
            setTimeout(() => {
                sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
            }, 50);
        }, 500);
    }
    showSlides();
}

function prevSlide() {
    if (currentIndex === 0) {
        currentIndex = totalSlides - visibleSlides;
        sliderWrapper.style.transition = 'none';
        sliderWrapper.style.transform = `translateX(${-currentIndex * 100 / visibleSlides}%)`;
        setTimeout(() => {
            sliderWrapper.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
    } else {
        currentIndex--;
    }
    showSlides();
}

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex % (totalSlides - visibleSlides + 1)].classList.add('active');
}

// Свайп для мобильных устройств
let startX;
sliderWrapper.addEventListener('touchstart', e => startX = e.touches[0].clientX);
sliderWrapper.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) nextSlide();
    if (startX < endX - 50) prevSlide();
});

// Initialize the slider
showSlides();


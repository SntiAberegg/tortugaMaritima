document.addEventListener('DOMContentLoaded', function(){
    const audio = document.getElementById('splash-sound');
    
    // Reproducir sonido
    try {
        audio.play();
    } catch (error) {
        console.log('Error al reproducir el audio:', error);
    }

    // Remover el splash screen después de la animación
    setTimeout(() => {
        const splashScreen = document.querySelector('.splash-screen');
        splashScreen.addEventListener('animationend', () => {
            splashScreen.remove();
        });
    }, 3000);
}
);

/*
---------------------
config carrousel cards
---------------------
*/
const carouselData = [
    {
        image: "tortugaMaritima_img/Ep el vengador infantil portada.png",
        title: "El Vengador Infantil",
        buttonText: "Ver ahora"
    },
    {
        image: "tortugaMaritima_img/Ep Fuera de Calculo portada img.jpeg",
        title: "Fuera de Calculo",
        buttonText: "Ver ahora"
    },
    {
        image: "tortugaMaritima_img/Ep seguro de desempleo img portada.png",
        title: "Seguro de Desempleo",
        buttonText: "Ver ahora"
    }
];

class Carousel {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.currentSlide = 0;
        this.slidesContainer = container.querySelector('.carousel-slides');
        this.indicatorsContainer = container.querySelector('.carousel-indicators');
        this.init();
    }

    init() {
        // Crear slides
        this.data.forEach((item, index) => {
            const slide = this.createSlide(item);
            if (index === 0) slide.classList.add('active');
            this.slidesContainer.appendChild(slide);

            // Crear indicadores
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });

        // Eventos de navegación
        this.container.querySelector('.prev-button')
            .addEventListener('click', () => this.prevSlide());
        this.container.querySelector('.next-button')
            .addEventListener('click', () => this.nextSlide());

        // Autoplay opcional
        // setInterval(() => this.nextSlide(), 5000);
    }

    createSlide(data) {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.innerHTML = `
            <img src="${data.image}" alt="${data.title}" class="carousel-image">
            <div class="carousel-content">
                <h2 class="carousel-title">${data.title}</h2>
                <button class="carousel-button">${data.buttonText}</button>
            </div>
        `;
        return slide;
    }

    goToSlide(index) {
        const slides = this.slidesContainer.children;
        const indicators = this.indicatorsContainer.children;
        
        slides[this.currentSlide].classList.remove('active');
        indicators[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        slides[this.currentSlide].classList.add('active');
        indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.data.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.data.length) % this.data.length;
        this.goToSlide(prevIndex);
    }
}

// Inicializar el carrusel
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel-container');
    new Carousel(carouselContainer, carouselData);
});
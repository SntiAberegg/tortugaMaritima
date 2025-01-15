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
config carrousel
---------------------
*/

const moviesData = [
    {
        title: "Dune",
        description: "Un viaje épico lleno de aventura y peligro en el planeta más peligroso del universo.",
        image: "/api/placeholder/300/450",
        backgroundImage: "/api/placeholder/1920/1080",
        rating: 4.5
    },
    {
        title: "Blade Runner 2049",
        description: "Un nuevo blade runner descubre un secreto que amenaza con sumir a la sociedad en el caos.",
        image: "/api/placeholder/300/450",
        backgroundImage: "/api/placeholder/1920/1080",
        rating: 4.8
    },
    {
        title: "Arrival",
        description: "Una lingüista intenta comunicarse con extraterrestres mientras el mundo está al borde de una guerra global.",
        image: "/api/placeholder/300/450",
        backgroundImage: "/api/placeholder/1920/1080",
        rating: 4.3
    }
];

class DuneStyleCarousel {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.createBackgrounds();
        this.createCards();
        this.setupNavigation();
        this.setupScrollSync();
    }

    createBackgrounds() {
        const backgroundContainer = this.container.querySelector('.background-container');
        this.data.forEach((item, index) => {
            const img = document.createElement('img');
            img.src = item.backgroundImage;
            img.classList.add('background-image');
            if (index === 0) img.classList.add('active');
            backgroundContainer.appendChild(img);
        });
    }

    createCards() {
        const cardsWrapper = this.container.querySelector('.cards-wrapper');
        this.data.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            if (index === 0) card.classList.add('active');
            
            const stars = '★'.repeat(Math.floor(item.rating)) + 
                        '☆'.repeat(5 - Math.floor(item.rating));
            
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="card-image">
                <div class="card-content">
                    <h3 class="card-title">${item.title}</h3>
                    <p class="card-description">${item.description}</p>
                    <div class="rating">
                        <span class="star">${stars}</span>
                    </div>
                </div>
            `;
            
            card.addEventListener('click', () => this.goToSlide(index));
            cardsWrapper.appendChild(card);
        });
    }

    setupNavigation() {
        this.container.querySelector('.prev-button')
            .addEventListener('click', () => this.prevSlide());
        this.container.querySelector('.next-button')
            .addEventListener('click', () => this.nextSlide());
    }

    setupScrollSync() {
        const cardsWrapper = this.container.querySelector('.cards-wrapper');
        let isScrolling;
        
        cardsWrapper.addEventListener('scroll', () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(() => {
                const cardWidth = cardsWrapper.querySelector('.card').offsetWidth;
                const scrollPosition = cardsWrapper.scrollLeft;
                const newIndex = Math.round(scrollPosition / (cardWidth + 20));
                if (newIndex !== this.currentIndex) {
                    this.goToSlide(newIndex);
                }
            }, 50);
        });
    }

    goToSlide(index) {
        if (index < 0 || index >= this.data.length) return;

        const cards = this.container.querySelectorAll('.card');
        const backgrounds = this.container.querySelectorAll('.background-image');
        
        // Actualizar tarjetas
        cards[this.currentIndex].classList.remove('active');
        cards[index].classList.add('active');
        
        // Actualizar fondo
        backgrounds[this.currentIndex].classList.remove('active');
        backgrounds[index].classList.add('active');
        
        // Scroll suave a la tarjeta
        const cardsWrapper = this.container.querySelector('.cards-wrapper');
        const cardWidth = cards[0].offsetWidth;
        cardsWrapper.scrollTo({
            left: index * (cardWidth + 20),
            behavior: 'smooth'
        });
        
        this.currentIndex = index;
    }

    prevSlide() {
        this.goToSlide(this.currentIndex - 1);
    }

    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }
}

// Inicializar el carrusel
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.main-container');
    new DuneStyleCarousel(container, moviesData);
});
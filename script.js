document.addEventListener('DOMContentLoaded', function() {
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
});
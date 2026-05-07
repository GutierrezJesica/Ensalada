document.addEventListener('DOMContentLoaded', () => {
    const phrase = document.querySelector('.phrase');
    const phraseFruit = document.querySelector('.phrase__fruit');

    if (phrase && phraseFruit) {
        let ticking = false;

        const updatePhraseParallax = () => {
            const rect = phrase.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
            const clamped = Math.min(1, Math.max(0, progress));
            const offset = (clamped - 0.5) * 70;

            phraseFruit.style.setProperty('--phrase-fruit-y', `${offset}px`);
            ticking = false;
        };

        const requestPhraseParallax = () => {
            if (!ticking) {
                window.requestAnimationFrame(updatePhraseParallax);
                ticking = true;
            }
        };

        updatePhraseParallax();
        window.addEventListener('scroll', requestPhraseParallax, { passive: true });
        window.addEventListener('resize', requestPhraseParallax);
    }

    const form = document.getElementById('contactForm');
    const responseMsg = document.getElementById('responseMsg');
    const btnText = document.getElementById('btnText');

    if (!form || !responseMsg || !btnText) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        btnText.innerText = 'Enviando...';

        const formData = {
            name: document.getElementById('name').value,
            profile: document.getElementById('profile').value,
            product: document.getElementById('product').value,
            cell: document.getElementById('cell').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        console.log('Datos capturados:', formData);

        setTimeout(() => {
            btnText.innerText = 'Enviar';
            responseMsg.classList.remove('hidden');
            responseMsg.innerText = 'Gracias! Tu mensaje ha sido enviado.';
            responseMsg.classList.add('text-green-700');
            form.reset();
        }, 900);
    });
});

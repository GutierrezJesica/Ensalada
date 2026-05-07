document.addEventListener('DOMContentLoaded', () => {
    const phrase = document.querySelector('.phrase');
    const phraseFruit = document.querySelector('.phrase__fruit');

    if (phrase && phraseFruit) {
        let ticking = false;
        let lastScrollY = window.scrollY || window.pageYOffset;
        let fruitOffset = 0;

        const updatePhraseParallax = () => {
            const rect = phrase.getBoundingClientRect();
            const currentScrollY = window.scrollY || window.pageYOffset;
            const direction = currentScrollY > lastScrollY ? 1 : -1;
            const isVisible = rect.bottom > -220 && rect.top < window.innerHeight + 220;

            if (isVisible && currentScrollY !== lastScrollY) {
                fruitOffset += direction * 12;
                fruitOffset = Math.min(170, Math.max(-120, fruitOffset));
                phraseFruit.style.setProperty('--phrase-fruit-y', `${fruitOffset}px`);
            }

            lastScrollY = currentScrollY;
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
    const profileSelect = document.getElementById('profile');
    const cvInput = document.getElementById('cv');

    if (!form || !responseMsg || !btnText) return;

    if (profileSelect && cvInput) {
        profileSelect.addEventListener('change', () => {
            if (profileSelect.value === 'trabaja') {
                cvInput.style.display = 'block';
            } else {
                cvInput.style.display = 'none';
            }
        });
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (cvInput.files[0] && cvInput.files[0].size > 1024 * 1024 * 1024) {
            responseMsg.classList.remove('hidden');
            responseMsg.innerText = 'El archivo CV es demasiado grande (máx. 1GB).';
            responseMsg.classList.add('form-message--error');
            responseMsg.classList.remove('text-green-700');
            return;
        }

        btnText.innerText = 'Enviando...';

        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('profile', document.getElementById('profile').value);
        formData.append('product', document.getElementById('product').value);
        formData.append('cell', document.getElementById('cell').value);
        formData.append('email', document.getElementById('email').value);
        formData.append('message', document.getElementById('message').value);
        if (cvInput.files[0]) {
            formData.append('cv', cvInput.files[0]);
        }

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                responseMsg.classList.remove('hidden');
                responseMsg.innerText = 'Gracias! Tu mensaje ha sido enviado.';
                responseMsg.classList.add('text-green-700');
                responseMsg.classList.remove('form-message--error');
                form.reset();
                cvInput.style.display = 'none';
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            responseMsg.classList.remove('hidden');
            responseMsg.innerText = 'Error enviando mensaje. Intenta de nuevo.';
            responseMsg.classList.add('form-message--error');
            responseMsg.classList.remove('text-green-700');
        } finally {
            btnText.innerText = 'Enviar';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
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

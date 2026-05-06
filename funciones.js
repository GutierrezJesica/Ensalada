// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Animación al hacer scroll (Fade In)
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 2. Manejo del Formulario
    const form = document.getElementById('contactForm');
    const responseMsg = document.getElementById('responseMsg');
    const btnText = document.getElementById('btnText');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        // Cambiar estado del botón
        btnText.innerText = "Enviando...";
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Simulación de envío (Aquí conectarías con Formspree o tu API)
        console.log("Datos capturados:", formData);

        setTimeout(() => {
            btnText.innerText = "Enviar Solicitud";
            responseMsg.classList.remove('hidden');
            responseMsg.innerText = "¡Gracias! Tu mensaje ha sido enviado.";
            responseMsg.classList.add('text-green-600');
            form.reset();
        }, 1500);
    });
});
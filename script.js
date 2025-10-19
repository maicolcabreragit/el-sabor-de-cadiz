// Funcionalidad de navegación suave
function scrollToReservation() {
    const reservationSection = document.getElementById('reservation');
    if (reservationSection) {
        reservationSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Funcionalidad del modal de reservas
function openReservationModal() {
    const modal = document.getElementById('reservationModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        
        // Establecer fecha mínima como hoy
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('date');
        if (dateInput) {
            dateInput.min = today;
        }
    }
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('reservationModal');
    if (event.target === modal) {
        closeReservationModal();
    }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeReservationModal();
    }
});

// Funcionalidad del formulario de reservas
document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(reservationForm);
            const reservationData = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                date: formData.get('date'),
                time: formData.get('time'),
                guests: formData.get('guests'),
                comments: formData.get('comments')
            };
            
            // Validar datos
            if (validateReservationData(reservationData)) {
                // Simular envío de reserva
                submitReservation(reservationData);
            }
        });
    }
    
    // Configurar validación en tiempo real
    setupFormValidation();
});

function validateReservationData(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        errors.push('Por favor, introduce un número de teléfono válido');
    }
    
    if (!data.date) {
        errors.push('Por favor, selecciona una fecha');
    } else if (new Date(data.date) < new Date().setHours(0, 0, 0, 0)) {
        errors.push('La fecha no puede ser anterior a hoy');
    }
    
    if (!data.time) {
        errors.push('Por favor, selecciona una hora');
    }
    
    if (!data.guests) {
        errors.push('Por favor, indica el número de comensales');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function isValidPhone(phone) {
    // Validar formato de teléfono español
    const phoneRegex = /^(\+34|0034|34)?[6|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

function setupFormValidation() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Formatear número de teléfono mientras se escribe
            let value = this.value.replace(/\D/g, '');
            if (value.startsWith('34')) {
                value = '+' + value;
            } else if (value.startsWith('6') || value.startsWith('7') || value.startsWith('8') || value.startsWith('9')) {
                value = '+34' + value;
            }
            this.value = value;
        });
    }
    
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                this.setCustomValidity('La fecha no puede ser anterior a hoy');
            } else {
                this.setCustomValidity('');
            }
        });
    }
}

function submitReservation(data) {
    // Mostrar indicador de carga
    const submitButton = document.querySelector('#reservationForm button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Simular envío (aquí se integraría con el backend real)
    setTimeout(() => {
        // Simular respuesta exitosa
        showNotification(`
            <strong>¡Reserva confirmada!</strong><br>
            Hemos recibido tu solicitud de reserva para ${data.guests} personas 
            el ${formatDate(data.date)} a las ${data.time}.<br>
            Te contactaremos en breve al ${data.phone} para confirmar.
        `, 'success');
        
        // Limpiar formulario
        document.getElementById('reservationForm').reset();
        
        // Cerrar modal después de un breve delay
        setTimeout(() => {
            closeReservationModal();
        }, 2000);
        
        // Restaurar botón
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // En un entorno real, aquí se enviarían los datos al servidor:
        // fetch('/api/reservations', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        
    }, 2000);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
}

function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        font-size: 14px;
        line-height: 1.4;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Añadir animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Añadir al DOM
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Permitir cerrar haciendo clic
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Funcionalidad de scroll suave para todos los enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Efecto de aparición gradual para elementos al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar a elementos que queremos animar
    const animatedElements = document.querySelectorAll('.menu-item, .experience-item, .testimonial, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Inicializar animaciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupScrollAnimations();
});

// Funcionalidad para hacer clic en teléfono
document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // En dispositivos móviles, esto abrirá la app de teléfono
            // En desktop, mostrará un mensaje
            if (!/Mobi|Android/i.test(navigator.userAgent)) {
                showNotification('Haz clic para copiar el número: ' + this.textContent, 'info');
                navigator.clipboard.writeText(this.textContent).catch(() => {
                    // Fallback si clipboard API no está disponible
                    console.log('Número de teléfono:', this.textContent);
                });
            }
        });
    });
});

// Optimización de imágenes lazy loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// Funcionalidad de búsqueda en FAQ (opcional)
function setupFAQSearch() {
    const faqItems = document.querySelectorAll('.faq-item');
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar en preguntas frecuentes...';
    searchInput.style.cssText = `
        width: 100%;
        padding: 15px;
        margin-bottom: 30px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 16px;
    `;
    
    const faqSection = document.querySelector('.faq .container');
    if (faqSection && faqItems.length > 0) {
        faqSection.insertBefore(searchInput, faqSection.querySelector('.faq-list'));
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            faqItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Inicializar búsqueda FAQ
document.addEventListener('DOMContentLoaded', setupFAQSearch);


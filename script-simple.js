// Versión simplificada del script
console.log('Script simple cargado correctamente');

// Función para manejar los botones de servicio
window.selectPackage = function(packageType) {
    console.log('selectPackage llamado con:', packageType);
    alert('Paquete seleccionado: ' + packageType);
    
    // Buscar la sección de contacto
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        // Hacer scroll a la sección
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Después de un momento, mostrar el formulario y seleccionar el paquete
        setTimeout(function() {
            // Mostrar el formulario
            const form = document.getElementById('contact-form');
            if (form) {
                form.style.display = 'block';
            }
            
            // Actualizar el texto del botón
            const toggleBtn = document.querySelector('.btn-form-toggle');
            if (toggleBtn) {
                const btnText = toggleBtn.querySelector('.btn-text');
                if (btnText) {
                    btnText.textContent = 'Ocultar Formulario';
                }
            }
            
            // Seleccionar el paquete en el dropdown
            const packageSelect = document.getElementById('package');
            if (packageSelect) {
                packageSelect.value = packageType;
            }
        }, 800);
    }
}

// Función para toggle del formulario de contacto
window.toggleContactForm = function() {
    const form = document.getElementById('contact-form');
    const button = document.querySelector('.btn-form-toggle');
    
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block';
        button.querySelector('.btn-text').textContent = 'Ocultar Formulario';
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        form.style.display = 'none';
        button.querySelector('.btn-text').textContent = 'Formulario Completo';
    }
}

// Función simple de prueba
window.testClick = function() {
    alert('¡El botón funciona!');
}

console.log('Funciones globales registradas');

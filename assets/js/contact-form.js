// Melhorias para o formulário de contato com Netlify Forms
document.addEventListener('DOMContentLoaded', function() {
    
    // Adicionar validação em tempo real
    addRealTimeValidation();
    
    // Adicionar efeitos visuais nos links sociais
    addSocialLinksEffects();
    
    // Configurar feedback visual no envio (Netlify processará o formulário)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Validar formulário antes de enviar
            if (!validateForm()) {
                e.preventDefault();
                return false;
            }
            
            // Mostrar loading (Netlify redirecionará para success.html)
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
        });
    }
});

function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    
    // Remover classes de erro anteriores
    field.classList.remove('is-invalid');
    
    // Validação de campo obrigatório
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        field.classList.add('is-invalid');
        showFieldError(field, 'Este campo é obrigatório.');
    }
    
    // Validação de email
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            field.classList.add('is-invalid');
            showFieldError(field, 'Por favor, insira um email válido.');
        }
    }
    
    // Se válido, remover mensagem de erro
    if (isValid) {
        field.classList.add('is-valid');
        hideFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    // Remover mensagem de erro anterior
    hideFieldError(field);
    
    // Criar nova mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Inserir após o campo
    field.parentNode.appendChild(errorDiv);
}

function hideFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

function addRealTimeValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remover classe de erro enquanto digita
            this.classList.remove('is-invalid');
            hideFieldError(this);
        });
    });
}

function addSocialLinksEffects() {
    const socialLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="instagram.com"]');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function showMessage(message, status) {
    // Remover mensagens anteriores
    const existingMessages = document.querySelectorAll('.alert-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Criar nova mensagem
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${status === 'success' ? 'success' : 'danger'} alert-message`;
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        max-width: 400px;
        padding: 15px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    alertDiv.innerHTML = `
        <strong>${status === 'success' ? 'Sucesso!' : 'Erro!'}</strong> ${message}
        <button type="button" class="close" style="float: right; background: none; border: none; font-size: 20px; cursor: pointer;">&times;</button>
    `;
    
    // Adicionar ao body
    document.body.appendChild(alertDiv);
    
    // Adicionar evento de fechar
    const closeBtn = alertDiv.querySelector('.close');
    closeBtn.addEventListener('click', () => alertDiv.remove());
    
    // Auto remover após 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

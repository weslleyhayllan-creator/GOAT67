// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// FAQ accordion functionality
document.querySelectorAll('.faq-item h3').forEach(item => {
    item.addEventListener('click', function() {
        const faqItem = this.parentElement;
        faqItem.classList.toggle('active');
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.5s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .right-item, .duty-item, .resource-card').forEach(el => {
    observer.observe(el);
});

// Search functionality (optional)
function searchContent(query) {
    const sections = document.querySelectorAll('section');
    const searchQuery = query.toLowerCase();
    let results = 0;

    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(searchQuery)) {
            section.style.display = 'block';
            results++;
        } else {
            section.style.display = 'none';
        }
    });

    return results;
}

// Form validation (if contact form is added)
function validateForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim() === '') {
        errors.push('Nome é obrigatório');
    }

    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Email inválido');
    }

    if (!formData.message || formData.message.trim() === '') {
        errors.push('Mensagem é obrigatória');
    }

    return errors;
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Tooltip functionality
function showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
    tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';

    setTimeout(() => {
        tooltip.remove();
    }, 3000);
}

// Print page functionality
function printPage() {
    window.print();
}

// Download content as PDF (requires additional library)
function downloadPDF() {
    alert('Para fazer download em PDF, use o navegador para imprimir e salvar como PDF');
}

// Share functionality
function shareContent(platform) {
    const url = window.location.href;
    const title = document.title;

    switch(platform) {
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${title}%20${url}`, '_blank');
            break;
        case 'email':
            window.location.href = `mailto:?subject=${title}&body=${url}`;
            break;
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press '?' for help
    if (e.key === '?') {
        showHelp();
    }
    // Press 'Escape' to close modals
    if (e.key === 'Escape') {
        closeModals();
    }
});

function showHelp() {
    alert('Atalhos de teclado:\n\n' +
          '? - Mostrar ajuda\n' +
          'Esc - Fechar modais\n' +
          'Clique nos títulos das seções para navegar');
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.textContent = '↑';
scrollToTopBtn.id = 'scrollToTopBtn';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #1e3a8a;
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 99;
    font-size: 18px;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.backgroundColor = '#f59e0b';
    scrollToTopBtn.style.transform = 'scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.backgroundColor = '#1e3a8a';
    scrollToTopBtn.style.transform = 'scale(1)';
});

// Dark mode toggle (optional)
let darkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    applyDarkMode();
}

function applyDarkMode() {
    if (darkMode) {
        document.body.style.backgroundColor = '#1f2937';
        document.body.style.color = '#f3f4f6';
        document.querySelectorAll('.card, .right-item, .duty-item, .resource-card').forEach(el => {
            el.style.backgroundColor = '#374151';
            el.style.color = '#f3f4f6';
        });
    } else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#1f2937';
        document.querySelectorAll('.card, .right-item, .duty-item, .resource-card').forEach(el => {
            el.style.backgroundColor = '#ffffff';
            el.style.color = '#1f2937';
        });
    }
}

// Initialize dark mode if previously enabled
applyDarkMode();

// Performance monitoring
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Tempo de carregamento da página: ' + pageLoadTime + 'ms');
});

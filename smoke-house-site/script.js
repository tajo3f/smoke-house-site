/* =========================================
   1. CONFIGURAÇÃO DE DADOS (PRODUTOS)
========================================= */
const produtos = [
    { 
        nome: "Seda Zomo Natural", 
        preco: "R$ 6,00", 
        img: "https://www.lojacasafe.com.br/loja/wp-content/uploads/2024/03/15259202642_SEDA20ZOMO20NATURAL20SLIM20COM203320FOLHAS20-20CASA20FE201.jpg" 
    },
    { 
        nome: "Piteira Glass Premium", 
        preco: "R$ 29,00", 
        img: "https://i0.wp.com/bestsessions.com.br/wp-content/uploads/2024/05/IMG_9649_Easy-Resize.com_.jpg?fit=2048%2C2048&ssl=1" 
    },
    { 
        nome: "Isqueiro Clipper Gold", 
        preco: "R$ 45,00", 
        img: "https://images.tcdn.com.br/img/editor/up/649364/clipper_metal.jpg" 
    },
    { 
        nome: "Dichavador Aero King", 
        preco: "R$ 89,00", 
        img: "https://m.media-amazon.com/images/I/71uM5vB7W2L._AC_SL1500_.jpg" 
    }
];

/* =========================================
   2. TELA DE CARREGAMENTO (LOADER)
========================================= */
window.addEventListener('load', () => {
    const progressBar = document.getElementById('pb');
    let width = 0;
    
    const interval = setInterval(() => {
        width += Math.random() * 20;
        if (width >= 100) {
            width = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
                iniciarAnimacoes();
            }, 500);
        }
        progressBar.style.width = width + '%';
    }, 100);
});

/* =========================================
   3. CURSOR CUSTOMIZADO
========================================= */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

document.addEventListener('mousemove', (e) => {
    // Cursor principal (ponto)
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Seguidor (atraso suave)
    setTimeout(() => {
        follower.style.left = e.clientX - 20 + 'px';
        follower.style.top = e.clientY - 20 + 'px';
    }, 50);
});

// Efeito de aumento no hover de links e botões
const targets = document.querySelectorAll('.hover-target, a, button');
targets.forEach(target => {
    target.addEventListener('mouseenter', () => follower.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => follower.classList.remove('cursor-hover'));
});

/* =========================================
   4. EFEITO DE PARTÍCULAS (HERO)
========================================= */
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = Math.random() * -1 - 0.5;
        this.opacity = Math.random();
    }
    update() {
        this.y += this.speedY;
        if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
        }
    }
    draw() {
        ctx.fillStyle = `rgba(255, 153, 0, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 80; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

/* =========================================
   5. RENDERIZAÇÃO E EFEITO 3D NOS CARDS
========================================= */
const productGrid = document.getElementById('product-grid');

produtos.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card reveal hover-target';
    
    card.innerHTML = `
        <img src="${item.img}" alt="${item.nome}">
        <h3>${item.nome}</h3>
        <span class="price">${item.preco}</span>
        <button class="buy-btn">ADQUIRIR</button>
    `;
    
    // Efeito Tilt (Inclinagem 3D)
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15 * -1;
        const rotateY = (x - centerX) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
    
    productGrid.appendChild(card);
});

/* =========================================
   6. ANIMAÇÃO DE SCROLL (REVEAL)
========================================= */
function iniciarAnimacoes() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left').forEach(el => observer.observe(el));
}

// Header dinâmico ao rolar
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
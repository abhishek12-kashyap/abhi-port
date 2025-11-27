// ==========================================
// FUTURISTIC PORTFOLIO - MAIN JAVASCRIPT
// 3D Animations, Parallax, Smooth Scrolling
// ==========================================

// ==========================================
// LOADING ANIMATION
// ==========================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const loaderPercentage = document.querySelector('.loader-percentage');
    let progress = 0;
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                initAnimations();
            }, 500);
        }
        loaderPercentage.textContent = Math.floor(progress) + '%';
    }, 150);
});

// ==========================================
// NAVBAR FUNCTIONALITY
// ==========================================
const navbar = document.getElementById('navbar');
const navBurger = document.getElementById('navBurger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
navBurger.addEventListener('click', () => {
    navBurger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navBurger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'visible';
    });
});

// Active link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// SMOOTH SCROLLING
// ==========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// ==========================================
// TYPING ANIMATION FOR HERO
// ==========================================
const typingText = document.querySelector('.typing-text');
const texts = [
    'Full-Stack Learner',
    '2+ Years Experience in Programming',
    'Creative Problem Solver',
    'Passionate Developer'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }
    
    const typingSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typingSpeed);
}

// Start typing animation after page load
setTimeout(typeText, 1000);

// ==========================================
// PARTICLES.JS INITIALIZATION
// ==========================================
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ff006e'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ff006e',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ==========================================
// THREE.JS 3D BACKGROUND ANIMATION
// ==========================================
function init3DBackground() {
    if (typeof THREE === 'undefined') return;
    
    const container = document.getElementById('three-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    
    // Create geometric shapes
    const geometries = [
        new THREE.TorusGeometry(10, 3, 16, 100),
        new THREE.OctahedronGeometry(10, 0),
        new THREE.IcosahedronGeometry(10, 0)
    ];
    
    const material = new THREE.MeshPhongMaterial({
        color: 0xff006e,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    
    const meshes = [];
    geometries.forEach((geometry, index) => {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (index - 1) * 30;
        mesh.position.z = -50;
        scene.add(mesh);
        meshes.push(mesh);
    });
    
    // Lighting
    const light = new THREE.PointLight(0xff006e, 1, 100);
    light.position.set(0, 0, 50);
    scene.add(light);
    
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    camera.position.z = 50;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        meshes.forEach((mesh, index) => {
            mesh.rotation.x += 0.005 + (index * 0.002);
            mesh.rotation.y += 0.005 + (index * 0.002);
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Mouse parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        
        camera.position.x = mouseX * 5;
        camera.position.y = mouseY * 5;
        camera.lookAt(scene.position);
    });
}

// ==========================================
// GSAP SCROLL ANIMATIONS
// ==========================================
function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Animate skill cards with stagger
    gsap.from('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 70%'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
    
    // Animate project cards with 3D effect
    gsap.utils.toArray('.project-card').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%'
            },
            rotateY: 90,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Parallax effect for hero section
    gsap.to('.hero-3d-model', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 200,
        opacity: 0.5
    });
    
    // Parallax for section backgrounds
    gsap.utils.toArray('section').forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            backgroundPosition: '50% 100px'
        });
    });
}

// ==========================================
// SKILL PROGRESS BARS ANIMATION
// ==========================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ==========================================
// 3D TILT EFFECT FOR CARDS
// ==========================================
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card, .skill-card, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// ==========================================
// CONTACT FORM SUBMISSION
// ==========================================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with form data
    const mailtoLink = `mailto:abhi26ku@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-check-circle"></i> <span>Message Sent!</span>';
    submitButton.style.background = '#10b981';
    
    setTimeout(() => {
        submitButton.innerHTML = originalText;
        submitButton.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ==========================================
// CURSOR TRAIL EFFECT
// ==========================================
function initCursorTrail() {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll('.cursor-circle');
    
    // Create cursor trail circles
    if (circles.length === 0 && window.innerWidth > 768) {
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.className = 'cursor-circle';
            circle.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: rgba(255, 0, 110, 0.5);
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.3s ease;
            `;
            document.body.appendChild(circle);
        }
    }
    
    const circleElements = document.querySelectorAll('.cursor-circle');
    
    document.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
    });
    
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        circleElements.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.transform = `scale(${(circleElements.length - index) / circleElements.length})`;
            
            const nextCircle = circleElements[index + 1] || circleElements[0];
            x += (parseInt(nextCircle.style.left) || coords.x - 5 - x) * 0.3;
            y += (parseInt(nextCircle.style.top) || coords.y - 5 - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    }
    
    if (window.innerWidth > 768) {
        animateCircles();
    }
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.info-card, .contact-card, .experience-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
}

// ==========================================
// FLOATING ANIMATION FOR HERO ELEMENTS
// ==========================================
function initFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-card, .hero-3d-model');
    
    floatingElements.forEach((element, index) => {
        const randomDelay = index * 0.5;
        const randomDuration = 3 + Math.random() * 2;
        
        element.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
    });
}

// ==========================================
// INITIALIZE ALL FEATURES
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles background
    setTimeout(initParticles, 100);
    
    // Initialize 3D background
    setTimeout(init3DBackground, 200);
    
    // Initialize skill bars animation
    setTimeout(animateSkillBars, 300);
    
    // Initialize 3D tilt effect
    setTimeout(init3DTilt, 400);
    
    // Initialize cursor trail
    setTimeout(initCursorTrail, 500);
    
    // Initialize scroll reveal
    setTimeout(initScrollReveal, 600);
    
    // Initialize floating animation
    setTimeout(initFloatingAnimation, 700);
});

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Additional scroll optimizations can be added here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ==========================================
// EASTER EGG: KONAMI CODE
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
    
    console.log('🎉 Easter Egg Activated! You found the secret!');
}

// ==========================================
// LOG WELCOME MESSAGE
// ==========================================
console.log('%c🚀 Welcome to Abhishek Kashyap\'s Portfolio!', 'color: #ff006e; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);');
console.log('%c💻 Developed with passion and futuristic design', 'color: #fff; font-size: 14px;');
console.log('%c✨ Try the Konami Code for a surprise!', 'color: #ff006e; font-size: 12px;');

// ==========================================
// EXPORT FOR MODULE USAGE (OPTIONAL)
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initParticles,
        init3DBackground,
        initAnimations,
        animateSkillBars,
        init3DTilt
    };
}
document.addEventListener('DOMContentLoaded', function() {
    initPageNavigation();
    
    initMobileMenu();
    
    initLightingSimulator();
    
    initFAQ();
    
    initContactForm();
    
    initShoppingCart();
    
    initFooterLinks();

    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(255, 0, 150, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const buttons = document.querySelectorAll('.btn-primary, .btn-hero, .btn-product');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

function initPageNavigation() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
            
            const mobileMenu = document.querySelector('.mobile-nav');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    });
    
    const pageButtons = document.querySelectorAll('[data-page]');
    pageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
        });
    });
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    

    pages.forEach(page => {
        page.classList.remove('active');
    });
    

    navLinks.forEach(link => {
        link.classList.remove('active');
    });
        

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
       
        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
   
    window.scrollTo(0, 0);
}


function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
       
        document.addEventListener('click', function(e) {
            if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
}


let currentDevice = 'moving-head';
let animationId = null;

function initLightingSimulator() {
    const deviceBtns = document.querySelectorAll('.device-btn');
    const intensitySlider = document.getElementById('intensity');
    const colorPicker = document.getElementById('color');
    const beamWidthSlider = document.getElementById('beamWidth');
    const speedSlider = document.getElementById('speed');
    const patternSelect = document.getElementById('pattern');
    const strobeSlider = document.getElementById('strobe');
    
    const lightSource = document.getElementById('lightSource');
    const lightBeam = document.getElementById('lightBeam');
    const lightEffects = document.getElementById('lightEffects');
    const intensityDisplay = document.getElementById('intensityDisplay');
    const colorDisplay = document.getElementById('colorDisplay');
    
   
    deviceBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            deviceBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentDevice = this.getAttribute('data-device');
            updateLightingDevice();
        });
    });
    
   
    if (intensitySlider) {
        intensitySlider.addEventListener('input', function() {
            const value = this.value;
            const intensityValue = document.getElementById('intensityValue');
            if (intensityValue) intensityValue.textContent = value + '%';
            
            updateLighting();
        });
    }
    
   
    if (colorPicker) {
        colorPicker.addEventListener('input', function() {
            updateLighting();
        });
    }
    
   
    if (beamWidthSlider) {
        beamWidthSlider.addEventListener('input', function() {
            const value = this.value;
            const beamWidthValue = document.getElementById('beamWidthValue');
            if (beamWidthValue) beamWidthValue.textContent = value + '%';
            
            updateLighting();
        });
    }
    
   
    if (speedSlider) {
        speedSlider.addEventListener('input', function() {
            const value = this.value;
            const speedValue = document.getElementById('speedValue');
            if (speedValue) speedValue.textContent = value + '%';
            
            updateLighting();
        });
    }
    
   
    if (patternSelect) {
        patternSelect.addEventListener('change', function() {
            updateLighting();
        });
    }
    
    
    if (strobeSlider) {
        strobeSlider.addEventListener('input', function() {
            const value = this.value;
            const strobeValue = document.getElementById('strobeValue');
            if (strobeValue) strobeValue.textContent = value + '%';
            
            updateLighting();
        });
    }
    
    
    updateLighting();
}

function updateLightingDevice() {
    const lightSource = document.getElementById('lightSource');
    const lightBeam = document.getElementById('lightBeam');
    const strobeSlider = document.getElementById('strobe');
    const beamWidthSlider = document.getElementById('beamWidth');
    
    if (!lightSource || !lightBeam) return;
    
    
    lightSource.className = 'light-source';
    lightBeam.className = 'light-beam';
    
    
    updateControlVisibility();
    
    switch (currentDevice) {
        case 'moving-head':
            lightSource.style.background = 'radial-gradient(circle, rgba(255, 0, 150, 0.8), transparent)';
            lightBeam.style.background = 'linear-gradient(to bottom, rgba(255, 0, 150, 0.8), transparent)';
            lightBeam.style.width = '4px';
            lightBeam.style.height = '200px';
            break;
        case 'laser':
            lightSource.style.background = 'radial-gradient(circle, rgba(0, 255, 0, 0.9), transparent)';
            lightBeam.style.background = 'linear-gradient(to bottom, rgba(0, 255, 0, 0.9), transparent)';
            lightBeam.style.width = '2px';
            lightBeam.style.height = '300px';
            break;
        case 'strobe':
            lightSource.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent)';
            lightBeam.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0.9), transparent)';
            lightBeam.style.width = '8px';
            lightBeam.style.height = '150px';
            break;
        case 'disco-ball':
            lightSource.style.background = 'radial-gradient(circle, rgba(255, 255, 0, 0.8), transparent)';
            lightBeam.style.background = 'linear-gradient(to bottom, rgba(255, 255, 0, 0.8), transparent)';
            lightBeam.style.width = '6px';
            lightBeam.style.height = '100px';
            break;
        case 'led-panel':
            lightSource.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.8), transparent)';
            lightBeam.style.background = 'linear-gradient(to bottom, rgba(0, 212, 255, 0.8), transparent)';
            lightBeam.style.width = '10px';
            lightBeam.style.height = '80px';
            break;
    }
    
    updateLighting();
}

function updateControlVisibility() {
    const strobeGroup = document.querySelector('[for*="strobe"]')?.parentElement;
    const beamWidthGroup = document.querySelector('[for*="beamWidth"]')?.parentElement;
    const patternGroup = document.querySelector('[for*="pattern"]')?.parentElement;
    
    
    if (strobeGroup) {
        strobeGroup.style.display = currentDevice === 'strobe' ? 'block' : 'none';
    }
    
    if (beamWidthGroup) {
        beamWidthGroup.style.display = ['moving-head', 'laser'].includes(currentDevice) ? 'block' : 'none';
    }
    
    if (patternGroup) {
        patternGroup.style.display = ['moving-head', 'laser'].includes(currentDevice) ? 'block' : 'none';
    }
}

function updateLighting() {
    const intensitySlider = document.getElementById('intensity');
    const colorPicker = document.getElementById('color');
    const beamWidthSlider = document.getElementById('beamWidth');
    const speedSlider = document.getElementById('speed');
    const patternSelect = document.getElementById('pattern');
    const strobeSlider = document.getElementById('strobe');
    
    const lightSource = document.getElementById('lightSource');
    const lightBeam = document.getElementById('lightBeam');
    const lightEffects = document.getElementById('lightEffects');
    const intensityDisplay = document.getElementById('intensityDisplay');
    const colorDisplay = document.getElementById('colorDisplay');
    
    if (!lightSource || !lightBeam) return;
    
    
    const intensity = intensitySlider ? intensitySlider.value : 50;
    const color = colorPicker ? colorPicker.value : '#ff0096';
    const beamWidth = beamWidthSlider ? beamWidthSlider.value : 50;
    const speed = speedSlider ? speedSlider.value : 30;
    const pattern = patternSelect ? patternSelect.value : 'static';
    const strobe = strobeSlider ? strobeSlider.value : 50;
    
    
    const opacity = intensity / 100;
    let size = 50 + (intensity / 2);
    
    
    switch (currentDevice) {
        case 'laser':
            size = 30 + (intensity / 3);
            break;
        case 'strobe':
            size = 80 + (intensity / 1.5);
            break;
        case 'disco-ball':
            size = 60 + (intensity / 2.5);
            break;
        case 'led-panel':
            size = 100 + (intensity / 1.2);
            break;
    }
    
    lightSource.style.opacity = opacity;
    lightSource.style.width = size + 'px';
    lightSource.style.height = size + 'px';
    lightBeam.style.opacity = opacity;
    
    
    lightSource.style.background = `radial-gradient(circle, ${color}, transparent)`;
    lightBeam.style.background = `linear-gradient(to bottom, ${color}, transparent)`;
    
    
    let width = 2 + (beamWidth / 25);
    let height = 200;
    
    switch (currentDevice) {
        case 'laser':
            width = 1 + (beamWidth / 50);
            height = 300;
            break;
        case 'strobe':
            width = 4 + (beamWidth / 20);
            height = 150;
            break;
        case 'disco-ball':
            width = 3 + (beamWidth / 30);
            height = 100;
            break;
        case 'led-panel':
            width = 5 + (beamWidth / 15);
            height = 80;
            break;
    }
    
    lightBeam.style.width = width + 'px';
    lightBeam.style.height = height + 'px';
    
    
    if (intensityDisplay) intensityDisplay.textContent = intensity + '%';
    if (colorDisplay) colorDisplay.textContent = color;
    
    
    updateAnimations(speed, pattern, strobe);
}

function updateAnimations(speed, pattern, strobe) {
    const lightBeam = document.getElementById('lightBeam');
    const lightEffects = document.getElementById('lightEffects');
    const intensitySlider = document.getElementById('intensity');
    
    if (!lightBeam) return;
    
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    const speedMultiplier = speed / 50; 
    const strobeRate = strobe / 100;
    const baseIntensity = intensitySlider ? intensitySlider.value / 100 : 0.5;
    
    let angle = 0;
    let strobeState = true;
    let strobeCounter = 0;
    
    function animate() {
        angle += speedMultiplier;
        strobeCounter++;
        

        switch (currentDevice) {
            case 'strobe':

                const strobeInterval = Math.max(1, Math.floor(60 / (strobeRate * 10)));
                if (strobeCounter % strobeInterval === 0) {
                    strobeState = !strobeState;
                }
                lightBeam.style.opacity = strobeState ? baseIntensity : 0;
                lightBeam.style.transform = 'translate(-50%, -50%) rotate(0deg)';
                break;
                
            case 'disco-ball':

                lightBeam.style.transform = `translate(-50%, -50%) rotate(${angle * 2}deg)`;
                lightBeam.style.opacity = baseIntensity;
                break;
                
            case 'led-panel':

                lightBeam.style.transform = 'translate(-50%, -50%) rotate(0deg)';
                lightBeam.style.opacity = baseIntensity;
                break;
                
            default: 

                switch (pattern) {
                    case 'circle':
                        const radius = currentDevice === 'laser' ? 60 : 80;
                        const x = Math.cos(angle * Math.PI / 180) * radius;
                        const y = Math.sin(angle * Math.PI / 180) * radius;
                        lightBeam.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle}deg)`;
                        break;
                    case 'figure8':
                        const x8 = Math.sin(angle * Math.PI / 180) * 60;
                        const y8 = Math.sin(2 * angle * Math.PI / 180) * 30;
                        lightBeam.style.transform = `translate(calc(-50% + ${x8}px), calc(-50% + ${y8}px)) rotate(${angle}deg)`;
                        break;
                    case 'random':
                        if (strobeCounter % 30 === 0) {
                            const randomX = (Math.random() - 0.5) * 120;
                            const randomY = (Math.random() - 0.5) * 120;
                            const randomAngle = Math.random() * 360;
                            lightBeam.style.transform = `translate(calc(-50% + ${randomX}px), calc(-50% + ${randomY}px)) rotate(${randomAngle}deg)`;
                        }
                        break;
                    default: 
                        lightBeam.style.transform = 'translate(-50%, -50%) rotate(0deg)';
                }
                lightBeam.style.opacity = baseIntensity;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}


function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = answer.classList.contains('active');
            

            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
            });
            

            if (!isActive) {
                answer.classList.add('active');
            }
        });
    });
}


function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
         
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}


let cart = [];

function initShoppingCart() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartClose = document.getElementById('cartClose');
    

    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            cartModal.classList.add('active');
            updateCartDisplay();
        });
    }
    

    if (cartClose) {
        cartClose.addEventListener('click', function() {
            cartModal.classList.remove('active');
        });
    }
    

    if (cartModal) {
        cartModal.addEventListener('click', function(e) {
            if (e.target === cartModal || e.target.classList.contains('cart-overlay')) {
                cartModal.classList.remove('active');
            }
        });
    }
    

    document.addEventListener('click', function(e) {
        console.log('Document clicked, target:', e.target);
        console.log('Target tag name:', e.target.tagName);
        console.log('Target class list:', e.target.classList.toString());
        console.log('Target has data-product:', e.target.hasAttribute('data-product'));
        

        if (e.target && e.target.tagName === 'BUTTON' && e.target.hasAttribute('data-product')) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Button clicked:', e.target);
            console.log('Button text:', e.target.textContent);
            
            const productId = e.target.getAttribute('data-product');
            const price = parseFloat(e.target.getAttribute('data-price'));
            const productCard = e.target.closest('.product-card');
            const productName = productCard ? productCard.querySelector('.product-title').textContent : 'Unknown Product';
            
            console.log('Product data:', { productId, price, productName });
            
            if (productId && price && productName) {
                addToCart(productId, productName, price);
                

                const originalText = e.target.textContent;
                const originalBg = e.target.style.background;
                
                e.target.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                e.target.textContent = 'ADDED!';
                e.target.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    e.target.style.background = originalBg;
                    e.target.textContent = originalText;
                    e.target.style.transform = '';
                }, 1500);
            } else {
                console.error('Missing product data:', { productId, price, productName });
            }
        }
    });
}

function addToCart(productId, productName, price) {
    console.log('Adding to cart:', { productId, productName, price });
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        console.log('Updated existing item:', existingItem);
    } else {
        const newItem = {
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        };
        cart.push(newItem);
        console.log('Added new item:', newItem);
    }
    
    console.log('Cart contents:', cart);
    updateCartCount();
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            updateCartDisplay();
        }
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        console.log('Cart count updated:', totalItems);
    } else {
        console.error('Cart count element not found');
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    console.log('Updating cart display, cart length:', cart.length);
    
    if (!cartItems || !cartTotal) {
        console.error('Cart display elements not found');
        return;
    }
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; color: #666; padding: 40px;">Your cart is empty</div>';
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">💡</div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">×</button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    console.log('Cart display updated, total:', total);
}


function initFooterLinks() {
    // Handle footer navigation links
    const footerLinks = document.querySelectorAll('.footer-links a[data-page]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            showPage(targetPage);
        });
    });
    

    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('.newsletter-input');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {

                this.textContent = 'Subscribed!';
                this.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                newsletterInput.value = '';
                
                setTimeout(() => {
                    this.textContent = 'Subscribe';
                    this.style.background = '';
                }, 2000);
            } else {
                newsletterInput.style.borderColor = '#ff0000';
                setTimeout(() => {
                    newsletterInput.style.borderColor = '';
                }, 2000);
            }
        });
    }
    

    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulate social media interaction
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

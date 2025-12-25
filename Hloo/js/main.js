document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'light') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // Animated Preloader Particles
    function createPreloaderParticles() {
        const container = document.getElementById('preloaderParticles');
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        const symbols = ['✦', '◆', '✧', '•'];
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'preloader-particle';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.color = colors[i % colors.length];
            particle.style.fontSize = (0.8 + Math.random() * 0.6) + 'rem';
            container.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 100 + Math.random() * 40;
            const duration = 2 + Math.random() * 1;
            
            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                rotation: 360 + Math.random() * 360,
                opacity: 0,
                duration: duration,
                repeat: -1,
                ease: 'power1.inOut'
            });
        }
    }
    
    createPreloaderParticles();

    // Multi-Sphere Escape Effect with Arrow Motion
    function initMultipleSpheres() {
        const sphereIds = ['counterSphere1', 'counterSphere2', 'counterSphere3'];
        
        sphereIds.forEach(id => {
            const sphere = document.getElementById(id);
            const container = sphere.closest('.visitor-sphere-container');
            if (!sphere || !container) return;
            
            let isEscaping = false;
            let targetX = 0;
            let targetY = 0;
            let currentX = 0;
            let currentY = 0;
            let animationFrameId = null;
            
            container.style.position = 'relative';
            container.style.transition = 'none';
            
            const smoothMove = () => {
                // Ultra smooth interpolation towards target position
                currentX += (targetX - currentX) * 0.05;
                currentY += (targetY - currentY) * 0.05;
                
                container.style.transform = `translate(${currentX}px, ${currentY}px)`;
                
                if (isEscaping) {
                    animationFrameId = requestAnimationFrame(smoothMove);
                }
            };
            
            container.addEventListener('mouseenter', () => {
                isEscaping = true;
                container.style.transition = 'none';
                smoothMove();
            });
            
            container.addEventListener('mousemove', (e) => {
                if (!isEscaping) return;
                
                const rect = container.getBoundingClientRect();
                const sphereX = rect.left + rect.width / 2;
                const sphereY = rect.top + rect.height / 2;
                
                const dx = sphereX - e.clientX;
                const dy = sphereY - e.clientY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 250) {
                    const angle = Math.atan2(dy, dx);
                    const escapeDistance = 200 + (250 - distance) * 0.8;
                    targetX = Math.cos(angle) * escapeDistance;
                    targetY = Math.sin(angle) * escapeDistance;
                } else {
                    targetX = 0;
                    targetY = 0;
                }
            });
            
            container.addEventListener('mouseleave', () => {
                isEscaping = false;
                targetX = 0;
                targetY = 0;
                
                // Smooth return animation
                container.style.transition = 'transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                container.style.transform = 'translate(0, 0)';
                currentX = 0;
                currentY = 0;
                
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            });
        });
    }
    
    // Visitor Counter with CountAPI
    function initVisitorCounter() {
        fetch('https://api.countapi.xyz/hit/prasanna-portfolio-2024/visits')
            .then(res => res.json())
            .then(data => {
                const count = data.value;
                const countElement = document.getElementById('count');
                const ordinalElement = document.getElementById('ordinal');
                const visitorStatElement = document.getElementById('visitorStat');
                
                // Animate number increment
                let currentCount = 0;
                const increment = Math.ceil(count / 30);
                const animationInterval = setInterval(() => {
                    currentCount += increment;
                    if (currentCount >= count) {
                        currentCount = count;
                        clearInterval(animationInterval);
                    }
                    countElement.textContent = currentCount.toLocaleString();
                    visitorStatElement.textContent = currentCount.toLocaleString();
                }, 30);
                
                // Update ordinal
                ordinalElement.textContent = (count + 1).toLocaleString();
                
                // Create celebration particles on button click
                const counterBtn = document.getElementById('counterBtn');
                if (counterBtn) {
                    counterBtn.addEventListener('click', () => {
                        createCounterParticles();
                        // Animate button
                        gsap.to(counterBtn, {
                            scale: 1.05,
                            duration: 0.2,
                            yoyo: true,
                            repeat: 1
                        });
                    });
                }
            })
            .catch(err => {
                console.log('Counter API error:', err);
                document.getElementById('count').textContent = '0';
            });
    }
    
    // Create celebratory particles
    function createCounterParticles() {
        const card = document.getElementById('counterCard');
        if (!card) return;
        
        const colors = ['#d63447', '#ffd700', '#00d9ff', '#ff1744'];
        const symbols = ['⭐', '✨', '💫', '🎉', '🌟', '⚡', '✦'];
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '999';
            particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            particle.style.color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
            particle.style.fontWeight = 'bold';
            
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            document.body.appendChild(particle);
            
            const angle = (i / 20) * Math.PI * 2;
            const distance = 150 + Math.random() * 100;
            const duration = 1.2 + Math.random() * 0.8;
            const delay = Math.random() * 0.1;
            
            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                rotation: 360 + Math.random() * 360,
                opacity: 0,
                scale: 0,
                duration: duration,
                delay: delay,
                ease: 'back.out',
                onComplete: () => particle.remove()
            });
        }
    }
    
    initVisitorCounter();
    initMultipleSpheres();

    // Draggable Visitor Counter Card
    function initDraggableCounter() {
        const card = document.getElementById('counterCard');
        const dragHandle = document.getElementById('dragHandle');
        if (!card || !dragHandle) return;
        
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        let startX = 0;
        let startY = 0;
        
        dragHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            card.classList.add('dragging');
            
            const rect = card.getBoundingClientRect();
            startX = e.clientX;
            startY = e.clientY;
            offsetX = rect.left;
            offsetY = rect.top;
            
            // Add drag effect
            gsap.to(card, {
                boxShadow: '0 50px 120px rgba(214, 52, 71, 0.6)',
                duration: 0.2
            });
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            card.style.position = 'fixed';
            card.style.left = (offsetX + deltaX) + 'px';
            card.style.top = (offsetY + deltaY) + 'px';
            card.style.width = 'auto';
            card.style.maxWidth = '520px';
            
            // Tilt effect while dragging
            const tiltX = (deltaY / 100) * 2;
            const tiltY = (deltaX / 100) * -2;
            card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        });
        
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            card.classList.remove('dragging');
            
            // Reset position with animation
            gsap.to(card, {
                left: 'auto',
                top: 'auto',
                position: 'relative',
                width: '100%',
                transform: 'rotateX(0deg) rotateY(0deg)',
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
                boxShadow: '0 20px 60px rgba(214, 52, 71, 0.3), inset 0 0 30px rgba(214, 52, 71, 0.1)'
            });
            
            // Create drag completion particles
            createDragCompleteParticles();
        });
    }
    
    // Particles for drag completion
    function createDragCompleteParticles() {
        const card = document.getElementById('counterCard');
        if (!card) return;
        
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.fontSize = '1.5rem';
            particle.style.pointerEvents = 'none';
            particle.textContent = ['✨', '💫', '⭐', '🌟'][Math.floor(Math.random() * 4)];
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 80 + Math.random() * 40;
            
            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: 'back.out',
                onComplete: () => particle.remove()
            });
        }
    }
    
    initDraggableCounter();

    // Interactive Sphere Click Handler
    function initSphereInteraction() {
        const sphereContainer = document.querySelector('.visitor-sphere-container');
        const sphere = document.getElementById('counterSphere');
        if (!sphereContainer || !sphere) return;
        
        sphereContainer.addEventListener('click', () => {
            // Trigger celebration
            createCounterParticles();
            
            // Create burst effect from sphere
            const colors = ['#d63447', '#ffd700', '#00d9ff', '#ff1744'];
            for (let i = 0; i < 12; i++) {
                const burst = document.createElement('div');
                burst.style.position = 'fixed';
                burst.style.pointerEvents = 'none';
                burst.style.width = '8px';
                burst.style.height = '8px';
                burst.style.borderRadius = '50%';
                burst.style.backgroundColor = colors[i % colors.length];
                
                const rect = sphereContainer.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                burst.style.left = centerX + 'px';
                burst.style.top = centerY + 'px';
                burst.style.zIndex = '998';
                burst.style.boxShadow = `0 0 10px ${colors[i % colors.length]}`;
                document.body.appendChild(burst);
                
                const angle = (i / 12) * Math.PI * 2;
                const distance = 120 + Math.random() * 80;
                
                gsap.to(burst, {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.out',
                    onComplete: () => burst.remove()
                });
            }
            
            // Pulse the sphere
            gsap.to(sphere, {
                scale: 1.1,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        });
    }
    
    initSphereInteraction();

    // Chaseable Sphere Mechanic
    function initChaseableSphere() {
        const sphereContainer = document.querySelector('.visitor-sphere-container');
        if (!sphereContainer) return;
        
        let mouseX = 0;
        let mouseY = 0;
        let isChasing = false;
        const chaseRadius = 150; // Distance at which sphere starts running
        
        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Continuous chase check
        const chaseInterval = setInterval(() => {
            const rect = sphereContainer.getBoundingClientRect();
            const sphereCenterX = rect.left + rect.width / 2;
            const sphereCenterY = rect.top + rect.height / 2;
            
            // Calculate distance from mouse to sphere
            const dx = mouseX - sphereCenterX;
            const dy = mouseY - sphereCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // If mouse is close, make sphere run away
            if (distance < chaseRadius) {
                isChasing = true;
                
                // Calculate direction away from mouse
                const angle = Math.atan2(dy, dx);
                const runDistance = 100;
                const targetX = Math.cos(angle + Math.PI) * runDistance;
                const targetY = Math.sin(angle + Math.PI) * runDistance;
                
                // Animate sphere to run away
                gsap.to(sphereContainer, {
                    x: targetX,
                    y: targetY,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            } else if (isChasing && distance > chaseRadius + 100) {
                // Return to original position when mouse moves away
                isChasing = false;
                gsap.to(sphereContainer, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.4)',
                    overwrite: 'auto'
                });
            }
        }, 16); // ~60fps
    }
    
    initChaseableSphere();

    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Interactive Logo Click Handler
    const logo = document.querySelector('.logo');
    let logoClickCount = 0;
    
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        logoClickCount++;
        
        const logoBounds = logo.getBoundingClientRect();
        const centerX = logoBounds.left + logoBounds.width / 2;
        const centerY = logoBounds.top + logoBounds.height / 2;
        
        // Skip complex effects on mobile
        if (isMobile) {
            logo.classList.remove('playing');
            void logo.offsetWidth;
            logo.classList.add('playing');
            setTimeout(() => logo.classList.remove('playing'), 500);
            return;
        }
        
        // Trigger spin animation
        logo.classList.remove('playing');
        void logo.offsetWidth;
        logo.classList.add('playing');
        
        // Create explosion effect
        logo.classList.add('explosion');
        setTimeout(() => logo.classList.remove('explosion'), 600);
        
        // Create spinning rings
        const ringConfigs = [
            { size: 80, delay: 0 },
            { size: 120, delay: 0.15 },
            { size: 160, delay: 0.3 }
        ];
        
        ringConfigs.forEach((config, idx) => {
            const ring = document.createElement('div');
            ring.className = `logo-ring ring${idx + 1}`;
            ring.style.width = config.size + 'px';
            ring.style.height = config.size + 'px';
            ring.style.left = (centerX - config.size / 2) + 'px';
            ring.style.top = (centerY - config.size / 2) + 'px';
            document.body.appendChild(ring);
            
            setTimeout(() => ring.remove(), 1150);
        });
        
        // Create shockwave
        const shockwave = document.createElement('div');
        shockwave.className = 'logo-shockwave';
        shockwave.style.width = '30px';
        shockwave.style.height = '30px';
        shockwave.style.left = (centerX - 15) + 'px';
        shockwave.style.top = (centerY - 15) + 'px';
        document.body.appendChild(shockwave);
        setTimeout(() => shockwave.remove(), 850);
        
        // Create lightning bolts
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const lightning = document.createElement('div');
                lightning.className = 'logo-lightning';
                lightning.textContent = '⚡';
                
                const angle = (i / 5) * Math.PI * 2;
                const distance = 60;
                lightning.style.left = (centerX + Math.cos(angle) * distance) + 'px';
                lightning.style.top = (centerY + Math.sin(angle) * distance) + 'px';
                document.body.appendChild(lightning);
                
                setTimeout(() => lightning.remove(), 200);
            }, i * 80);
        }
        
        // Create colorful particles (enhanced) - Reduced count on mobile
        const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
        const particleColors = currentTheme === 'light' 
            ? { primary: ['#6b3fa0', '#ff6b35', '#00a8e8', '#d63447'], secondary: ['#ff6b35', '#00a8e8', '#6b3fa0'] }
            : { primary: ['#ff6b7a', '#ffd700', '#00d9ff', '#ff1744'], secondary: ['#ffd700', '#00d9ff', '#ff6b7a'] };
        
        const particleConfigs = [
            { char: '✦', colors: particleColors.primary, count: 6 },
            { char: '◆', colors: particleColors.secondary, count: 4 }
        ];
        
        particleConfigs.forEach(config => {
            for (let i = 0; i < config.count; i++) {
                const particle = document.createElement('div');
                particle.className = 'logo-particle';
                particle.textContent = config.char;
                particle.style.color = config.colors[i % config.colors.length];
                particle.style.left = centerX + 'px';
                particle.style.top = centerY + 'px';
                particle.style.fontSize = (1 + Math.random() * 0.8) + 'rem';
                document.body.appendChild(particle);
                
                const angle = (i / config.count) * Math.PI * 2 + Math.random() * 0.5;
                const distance = 80 + Math.random() * 60;
                const duration = 0.8 + Math.random() * 0.4;
                
                gsap.to(particle, {
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    rotation: Math.random() * 360,
                    opacity: 0,
                    duration: duration,
                    ease: 'power2.out',
                    onComplete: () => particle.remove()
                });
            }
        });
        
        // Remove animation class after animation completes
        setTimeout(() => logo.classList.remove('playing'), 1000);
    });

    // Parallax Background Effect - Disabled on Mobile
    if (!isMobile) {
        const backgroundImage = document.querySelector('.background-image');
        
        // Scroll parallax
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            backgroundImage.style.transform = `translateY(${scrollY * 0.5}px)`;
        });

        // Mouse hover parallax
        document.addEventListener('mousemove', (e) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (e.clientX - centerX) * 0.02;
            const moveY = (e.clientY - centerY) * 0.02;
            
            gsap.to(backgroundImage, {
                x: moveX,
                y: moveY,
                duration: 0.8,
                overwrite: 'auto',
                ease: 'power2.out'
            });
        });
    }

    // Water Droplet Click Animation - Disabled on Mobile
    if (!isMobile) {
        document.addEventListener('click', (e) => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const droplet = document.createElement('div');
            droplet.className = `water-droplet ${currentTheme}`;
            droplet.style.left = e.clientX + 'px';
            droplet.style.top = e.clientY + 'px';
            
            document.body.appendChild(droplet);

            const ring1 = document.createElement('div');
            ring1.className = 'droplet-ring';
            ring1.style.width = '0px';
            ring1.style.height = '0px';
            droplet.appendChild(ring1);

            const ring2 = document.createElement('div');
            ring2.className = 'droplet-ring';
            ring2.style.width = '0px';
            ring2.style.height = '0px';
            droplet.appendChild(ring2);

            // Animate rings
            gsap.to(ring1, {
                width: '80px',
                height: '80px',
                duration: 0.8,
                ease: 'power2.out',
                opacity: 0
            });

            gsap.to(ring2, {
                width: '150px',
                height: '150px',
                duration: 1.2,
                delay: 0.2,
                ease: 'power2.out',
                opacity: 0,
                onComplete: () => {
                    droplet.remove();
                }
            });
        });
    }

    const preloader = document.querySelector('.preloader');
    
    setTimeout(() => {
        preloader.classList.add('hidden');
        initHeroAnimations();
    }, 1200);

    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-toggle, .question-header, .friend-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorFollower.classList.remove('active');
            });
        });
    }

    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
            backToTop.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTop.classList.remove('visible');
        }

        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    function initHeroAnimations() {
        const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

        heroTimeline
            .to('.hero-greeting', {
                opacity: 1,
                y: 0,
                duration: 0.8
            })
            .to('.name-line', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2
            }, '-=0.4')
            .to('.hero-title-wrapper', {
                opacity: 1,
                duration: 0.6
            }, '-=0.4')
            .to('.hero-description', {
                opacity: 1,
                y: 0,
                duration: 0.6
            }, '-=0.3')
            .to('.hero-cta', {
                opacity: 1,
                y: 0,
                duration: 0.6
            }, '-=0.3')
            .to('.hero-image-container', {
                opacity: 1,
                scale: 1,
                duration: 0.8
            }, '-=0.6');

        gsap.to('.hero-image-container', {
            y: 20,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    gsap.set('.hero-greeting, .name-line, .hero-description, .hero-cta', {
        opacity: 0,
        y: 30
    });
    gsap.set('.hero-title-wrapper', { opacity: 0 });
    gsap.set('.hero-image-container', { opacity: 0, scale: 0.9 });

    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.8
        });
    });

    gsap.from('.about-image-wrapper', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: -100,
        opacity: 0,
        duration: 1
    });

    gsap.from('.about-text-wrapper', {
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2
    });

    gsap.utils.toArray('.about-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.1
        });
    });

    const skillBars = document.querySelectorAll('.skill-progress');
    
    ScrollTrigger.create({
        trigger: '.skills-section',
        start: 'top 80%',
        onEnter: () => {
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
        },
        onLeaveBack: () => {
            skillBars.forEach(bar => {
                bar.style.width = '0%';
            });
        }
    });

    gsap.utils.toArray('.contact-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.15
        });
    });

    gsap.utils.toArray('.social-link').forEach((link, index) => {
        gsap.from(link, {
            scrollTrigger: {
                trigger: '.social-links',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            scale: 0,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });

    const friendsSwiper = new Swiper('.friends-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.friends-next',
            prevEl: '.friends-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                centeredSlides: false,
            },
            992: {
                slidesPerView: 3,
                centeredSlides: false,
            }
        },
        on: {
            init: function() {
                gsap.from('.friend-card', {
                    scrollTrigger: {
                        trigger: '.friends-swiper',
                        start: 'top 80%',
                    },
                    y: 100,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15
                });
            }
        }
    });

    const questionItems = document.querySelectorAll('.question-item');
    
    questionItems.forEach(item => {
        const header = item.querySelector('.question-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            questionItems.forEach(q => q.classList.remove('active'));
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    gsap.utils.toArray('.question-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            x: index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.6
        });
    });

    const particlesContainer = document.getElementById('particles');
    
    function createParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = Math.random() * 5 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 5 + 's';
            particlesContainer.appendChild(particle);
            
            gsap.to(particle, {
                y: -100 - Math.random() * 200,
                x: (Math.random() - 0.5) * 100,
                opacity: 0,
                duration: 3 + Math.random() * 4,
                repeat: -1,
                delay: Math.random() * 3
            });
        }
    }
    
    createParticles();

    gsap.utils.toArray('section').forEach(section => {
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            backgroundPosition: '50% 100%',
            ease: 'none'
        });
    });

    const tiltElements = document.querySelectorAll('.about-card, .contact-card');
    
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    const textElements = document.querySelectorAll('.hero-name .name-line');
    
    textElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.animationDelay = index * 0.05 + 's';
            el.appendChild(span);
        });
    });

    gsap.to('.hero-image-decoration', {
        rotation: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    const magnetButtons = document.querySelectorAll('.btn');
    
    magnetButtons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    const messageForm = document.getElementById('messageForm');
    const submitBtn = messageForm ? messageForm.querySelector('.submit-btn') : null;

    if (messageForm && submitBtn) {
        gsap.from('.message-form-wrapper', {
            scrollTrigger: {
                trigger: '.message-form-wrapper',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });

        gsap.from('.message-icon', {
            scrollTrigger: {
                trigger: '.message-form-wrapper',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            scale: 0,
            rotation: 180,
            duration: 0.6,
            delay: 0.3,
            ease: 'back.out(1.7)'
        });

        gsap.from('.message-form-header h3, .message-form-header p', {
            scrollTrigger: {
                trigger: '.message-form-wrapper',
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.4,
            ease: 'power2.out'
        });

        gsap.from('.form-group', {
            scrollTrigger: {
                trigger: '.message-form',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 40,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.5,
            ease: 'power2.out'
        });

        gsap.from('.submit-btn', {
            scrollTrigger: {
                trigger: '.submit-btn',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: 0.7,
            ease: 'power2.out'
        });

        const inputs = messageForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input.closest('.input-wrapper'), {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            input.addEventListener('blur', () => {
                gsap.to(input.closest('.input-wrapper'), {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        messageForm.addEventListener('submit', function(e) {
            submitBtn.classList.add('loading');
            
            gsap.to(submitBtn, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    }

    console.log('Portfolio website loaded successfully!');
});

// Gallery Theme Switching on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const gallerySection = document.getElementById('artgallery');
    const galleryOuterBox = document.querySelector('.gallery-outer-box');
    const navbar = document.querySelector('.navbar');
    
    if (gallerySection && galleryOuterBox && navbar) {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gallerySection.classList.add('in-gallery');
                    navbar.classList.add('gallery-mode');
                    galleryOuterBox.style.opacity = '1';
                } else {
                    gallerySection.classList.remove('in-gallery');
                    navbar.classList.remove('gallery-mode');
                }
            });
        }, observerOptions);
        
        observer.observe(galleryOuterBox);
    }
});

// Water Droplet Effect on Mouse Move
const htmlElement = document.documentElement;
let dropletThrottle = false;

document.addEventListener('mousemove', function(e) {
    if (window.innerWidth < 768 || dropletThrottle) return;
    
    dropletThrottle = true;
    createWaterDroplet(e.clientX, e.clientY);
    
    setTimeout(() => {
        dropletThrottle = false;
    }, 80);
});

function createWaterDroplet(x, y) {
    const droplet = document.createElement('div');
    const theme = htmlElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    droplet.className = 'water-droplet ' + theme;
    
    const ring = document.createElement('div');
    ring.className = 'droplet-ring';
    
    droplet.appendChild(ring);
    droplet.style.left = (x - 7.5) + 'px';
    droplet.style.top = (y - 7.5) + 'px';
    
    document.body.appendChild(droplet);
    
    setTimeout(() => {
        droplet.remove();
    }, 800);
}

// Arrow Animation for CTA Button
const arrowDownBtns = document.querySelectorAll('.btn-primary i.fa-arrow-down');
arrowDownBtns.forEach(arrow => {
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary i.fa-arrow-down {
            animation: arrowDown 1.5s ease-in-out infinite;
        }
        @keyframes arrowDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
        }
    `;
    document.head.appendChild(style);
});

// Update back-to-top visibility with scroll
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Escaping Name Effect - DISABLED
// document.addEventListener('DOMContentLoaded', function() {
//     const heroName = document.querySelector('.hero-name');
//     if (!heroName) return;
//     
//     let isEscaping = false;
//     let currentX = 0;
//     let currentY = 0;
//     
//     heroName.style.position = 'relative';
//     heroName.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//     
//     heroName.addEventListener('mouseenter', function() {
//         if (isEscaping) return;
//         isEscaping = true;
//         heroName.classList.add('escaping');
//     });
//     
//     heroName.addEventListener('mousemove', function(e) {
//         if (!isEscaping) return;
//         
//         const rect = heroName.getBoundingClientRect();
//         const nameX = rect.left + rect.width / 2;
//         const nameY = rect.top + rect.height / 2;
//         
//         const mouseX = e.clientX;
//         const mouseY = e.clientY;
//         
//         const dx = nameX - mouseX;
//         const dy = nameY - mouseY;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         
//         // If cursor is close, name runs away
//         if (distance < 250) {
//             const angle = Math.atan2(dy, dx);
//             const escapeDistance = 300 + (250 - distance);
//             currentX = Math.cos(angle) * escapeDistance;
//             currentY = Math.sin(angle) * escapeDistance;
//             
//             // Clamp to screen bounds with padding
//             const padding = 50;
//             currentX = Math.max(-window.innerWidth / 2 + padding, Math.min(window.innerWidth / 2 - padding, currentX));
//             currentY = Math.max(-window.innerHeight / 2 + padding, Math.min(window.innerHeight / 2 - padding, currentY));
//             
//             heroName.style.transform = `translate(${currentX}px, ${currentY}px)`;
//         }
//     });
//     
//     heroName.addEventListener('mouseleave', function() {
//         isEscaping = false;
//         heroName.classList.remove('escaping');
//         heroName.style.transition = 'transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//         heroName.style.transform = 'translate(0, 0)';
//         currentX = 0;
//         currentY = 0;
//     });
// });

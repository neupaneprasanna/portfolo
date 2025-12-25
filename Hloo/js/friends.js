// Friends data - 15 friends
const friendsData = [
    { name: "Sandesh Rai", role: "Closest Buddy", image: "assets/images/sandesh.jpeg", description: "'He can switch from singing to dancing faster than most people can unlock their phones. Every moment is a chance for him to drop a beat or strike a pose. If life had background music, he'd definitely be the one performing it.'" },
    { name: "Jasbin Kandel Chettri", role: "Guitar Bro", image: "assets/images/jasbin.jpg", description: "'He's the kind of guy who strums a guitar and somehow looks even more handsome with every chord. Even his warm-up notes sound like he's auditioning for a movie scene. If charm had a soundtrack, he'd probably be playing it.'" },
    { name: "Abijit Gurung", role: "Mr. Giggle", image: "assets/images/abijit.jpg", description: "'They're that close friend who can turn even a boring moment into a comedy scene. Their bright, fair look matches their bright energy, always making everyone laugh without even trying.'" },
    { name: "Asif Ali", role: "Asif King", image: "assets/images/asif.jpg", description: "'He's the kind of guy who can analyze anything - from math problems to random situations - with surprising accuracy. He loves giving playful little judgments, but always in a fun, harmless way. His confidence just adds extra charm to his whole smart friend vibe.'" },
    { name: "Bardan Rajak", role: "Confidence Monster", image: "assets/images/bardan.jpg", description: "'He talks, and somehow everyone listens - because confidence just sticks to him. Every sentence feels like a headline, and every word has its own swagger. Basically, he's proof that being smooth and articulate can be a full-time job.'" },
    { name: "Aashutosh Kafle", role: "Professor Specs", image: "assets/images/ashutosh.jpg", description: "'With glasses perched perfectly, he can spot mistakes from a mile away - especially in homework. Books fear him, exams respect him, and everyone else just quietly takes notes. Basically, he's the human version of a cheat sheet, but way cooler.'" },
    { name: "Manish Banjara", role: "Brainiac Supreme", image: "assets/images/manish.jpg", description: "'He can analyze problems like a detective on a caffeine high and create logic so tight it could trap a cat. Nothing escapes his reasoning, except maybe his own lost keys. Basically, he makes chaos look like it was planned all along.'" },
    { name: "Bibek Lamichhane", role: "Naughty Navigator", image: "assets/images/bibek.png", description: "'He has a talent for turning every harmless plan into a mischievous adventure. No rule is safe, no idea too cheeky, and somehow everyone ends up laughing or running. Basically, he is the friend who keeps life a little chaotic, but in the best way.'" },
    { name: "Utkrista Shrestha", role: "Captain Random", image: "assets/images/utkrista.jpg", description: "'He can turn any serious conversation into a comedy show with his illogical ideas. Somehow, in the middle of all the nonsense, he is helpful and kind. Basically, he is like a walking meme with a heart of gold.'" },
    { name: "unknown1", role: "Close Companion", image: "assets/images/friend10.jpg", description: "Your loyalty means everything. Through every season of life, you've remained steadfast and true." },
    { name: "unknown2", role: "Friend", image: "assets/images/friend11.jpg", description: "Genuine soul with a heart of gold. You remind me daily why friendship is the greatest treasure." },
    { name: "unknown3", role: "Childhood Friend", image: "assets/images/friend12.jpg", description: "Memories we've built last forever. Every moment with you feels like coming back home always." },
    { name: "unknown4", role: "Close Friend", image: "assets/images/friend13.jpg", description: "You get me without explanation. Our connection runs deeper than words could ever describe here." },
    { name: "unknown5", role: "Best Friend", image: "assets/images/friend14.jpg", description: "My person, my anchor, my source of light. Forever grateful for you in my life and journey." },
    { name: "unknown6", role: "Friend", image: "assets/images/friend15.jpg", description: "Life tastes better with you in it. You turn ordinary moments into extraordinary memories always." }
];

const passwordModal = document.getElementById('passwordModal');
const passwordInput = document.getElementById('passwordInput');
const passwordSubmit = document.getElementById('passwordSubmit');
const passwordError = document.getElementById('passwordError');
const passwordParticlesContainer = document.getElementById('passwordParticles');

// Generate floating particles in password modal
function generatePasswordParticles() {
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'password-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        passwordParticlesContainer.appendChild(particle);
    }
}

// Particle floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.4; }
        50% { transform: translateY(-30px) translateX(${Math.random() > 0.5 ? 20 : -20}px) scale(1.5); opacity: 0.8; }
    }
`;
document.head.appendChild(style);

// Initialize particles on load
generatePasswordParticles();

const entranceOverlay = document.getElementById('entranceOverlay');
const friendsMain = document.getElementById('friendsMain');
const cardsTable = document.getElementById('cardsTable');
const friendModal = document.getElementById('friendModal');
const modalClose = document.getElementById('modalClose');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const clearSearchButton = document.getElementById('clearSearch');

// Track all created cards
let cardElements = {};

// Password verification
const CORRECT_PASSWORD = 'handsome';
let passwordVerified = false;

function verifyPassword() {
    const enteredPassword = passwordInput.value;
    
    if (enteredPassword === CORRECT_PASSWORD) {
        passwordVerified = true;
        passwordModal.style.display = 'none';
        startAnimatedEntrance();
    } else {
        passwordError.textContent = 'Incorrect password. Try again.';
        passwordInput.value = '';
        passwordInput.focus();
    }
}

// Password submit button click
passwordSubmit.addEventListener('click', verifyPassword);

// Password input Enter key
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        verifyPassword();
    }
});

// 3D Animated entrance with transitions
function startAnimatedEntrance() {
    // Show the entrance overlay
    entranceOverlay.classList.add('show');
    
    // After 2.5 seconds, fade out entrance and show cards
    setTimeout(() => {
        entranceOverlay.classList.add('fade-out');
        friendsMain.classList.add('active');
        // Small delay to ensure DOM has laid out
        setTimeout(() => scatterCards(), 100);
    }, 2500);
}

// Don't start animation until password is verified
// startAnimatedEntrance() is called after password verification in verifyPassword()

function scatterCards() {
    cardsTable.innerHTML = '';
    
    friendsData.forEach((friend, index) => {
        setTimeout(() => {
            createCard(friend, index);
        }, index * 80);
    });
}

function createCard(friend, index) {
    const card = document.createElement('div');
    card.className = 'card-old-paper card-scatter';
    card.dataset.friendName = friend.name.toLowerCase();
    
    // Random scattered positions on the table
    const containerWidth = cardsTable.clientWidth || window.innerWidth;
    const containerHeight = cardsTable.clientHeight || (window.innerHeight - 80);
    const cardWidth = 220;
    const cardHeight = 300;
    
    // More aggressive scattering - allow cards to go further out
    const maxX = Math.max(containerWidth - cardWidth, cardWidth);
    const maxY = Math.max(containerHeight - cardHeight, cardHeight);
    
    const randomX = Math.random() * (maxX - cardWidth * 0.5) + cardWidth * 0.25;
    const randomY = Math.random() * (maxY - cardHeight * 0.5) + cardHeight * 0.25;
    const randomRotZ = (Math.random() - 0.5) * 60; // -30 to +30 degrees for more scatter
    const randomRotX = (Math.random() - 0.5) * 20; // more tilt variation
    const randomRotY = (Math.random() - 0.5) * 15; // more tilt variation
    const randomZ = Math.floor(Math.random() * friendsData.length); // stacking order
    
    card.style.setProperty('--x', `${randomX}px`);
    card.style.setProperty('--y', `${randomY}px`);
    card.style.setProperty('--rz', `${randomRotZ}deg`);
    card.style.setProperty('--rx', `${randomRotX}deg`);
    card.style.setProperty('--ry', `${randomRotY}deg`);
    card.style.setProperty('--z', randomZ);
    
    // Store original position and rotation for reset
    card.dataset.originalX = randomX;
    card.dataset.originalY = randomY;
    card.dataset.originalRz = randomRotZ;
    card.dataset.originalRx = randomRotX;
    card.dataset.originalRy = randomRotY;
    card.dataset.originalZ = randomZ;
    
    // Store card reference
    cardElements[friend.name.toLowerCase()] = card;
    card.style.animationDelay = `${index * 0.06}s`;
    
    card.innerHTML = `
        <div class="card-tear card-tear-1"></div>
        <div class="card-tear card-tear-2"></div>
        <div class="card-tear card-tear-3"></div>
        
        <div class="card-image-wrapper">
            <img src="${friend.image}" alt="${friend.name}" class="card-image" onerror="this.style.display='none'">
        </div>
        
        <div class="card-content">
            <div class="card-friend-name">${friend.name}</div>
            <div class="card-friend-role">${friend.role}</div>
        </div>
    `;
    
    // Drag functionality
    let isDragging = false;
    let dragOccurred = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let startX = 0;
    let startY = 0;
    let maxZ = 1;

    card.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragOccurred = false;
        card.classList.add('dragging');
        
        // Immediately remove any transitions for smooth dragging
        card.style.transition = 'none';
        
        // Calculate offset between mouse position and card position
        const rect = card.getBoundingClientRect();
        const tableRect = cardsTable.getBoundingClientRect();
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        startX = e.clientX;
        startY = e.clientY;
        
        // Bring card to front
        maxZ++;
        card.style.zIndex = maxZ;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        // Check if user actually dragged (moved more than 5px)
        if (Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5) {
            dragOccurred = true;
        }
        
        const tableRect = cardsTable.getBoundingClientRect();
        let newX = e.clientX - tableRect.left - dragOffsetX;
        let newY = e.clientY - tableRect.top - dragOffsetY;
        
        // Keep card within bounds
        newX = Math.max(0, Math.min(newX, tableRect.width - 220));
        newY = Math.max(0, Math.min(newY, tableRect.height - 300));
        
        card.style.setProperty('--x', `${newX}px`);
        card.style.setProperty('--y', `${newY}px`);
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            card.classList.remove('dragging');
            // Keep transition off after dragging
            card.style.transition = 'none';
        }
    });

    // Hover animations
    card.addEventListener('mouseenter', () => {
        if (!isDragging) {
            card.classList.add('card-active');
            // Add a slight tilt on hover
            const tiltX = (Math.random() - 0.5) * 5;
            const tiltY = (Math.random() - 0.5) * 5;
            card.style.setProperty('--hover-rx', `${tiltX}deg`);
            card.style.setProperty('--hover-ry', `${tiltY}deg`);
        }
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('card-active');
    });

    // Double-click to spin the card
    card.addEventListener('dblclick', (e) => {
        if (!isDragging) {
            e.preventDefault();
            card.style.animation = 'cardSpin 0.8s ease-in-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 800);
        }
    });

    card.addEventListener('click', (e) => {
        // Only open modal if card wasn't actually dragged
        if (!dragOccurred && !isDragging) {
            openModal(friend, card);
        }
    });

    cardsTable.appendChild(card);
}

function openModal(friend, cardElement) {
    // Get card position for pick-up animation
    const rect = cardElement.getBoundingClientRect();
    const tableRect = cardsTable.getBoundingClientRect();
    
    // Calculate relative position from card to center
    const cardCenterX = rect.left - window.innerWidth / 2;
    const cardCenterY = rect.top - window.innerHeight / 2 + 80;
    const cardRotZ = parseInt(cardElement.style.getPropertyValue('--rz')) || 0;
    
    // Set CSS variables for animation
    const modalContent = document.querySelector('.modal-content');
    modalContent.style.setProperty('--card-start-x', `${cardCenterX}px`);
    modalContent.style.setProperty('--card-start-y', `${cardCenterY}px`);
    modalContent.style.setProperty('--card-start-rz', `${cardRotZ}deg`);
    
    document.getElementById('modalName').textContent = friend.name;
    document.getElementById('modalRole').textContent = friend.role;
    document.getElementById('modalDescription').textContent = friend.description;
    
    // Set modal image
    const modalImage = document.getElementById('modalImage');
    modalImage.style.backgroundImage = `url(${friend.image})`;
    
    friendModal.classList.add('active');
}

function closeModal() {
    friendModal.classList.remove('active');
}

// Modal close events
modalClose.addEventListener('click', closeModal);
friendModal.addEventListener('click', (e) => {
    if (e.target === friendModal) closeModal();
});

// Keyboard close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Search functionality
function searchCard(searchTerm) {
    if (!searchTerm.trim()) {
        resetAllCards();
        return;
    }
    
    const searchLower = searchTerm.toLowerCase();
    let found = false;
    
    // FIRST: Reset all cards from previous search state
    Object.entries(cardElements).forEach(([friendName, card]) => {
        card.classList.remove('search-found', 'search-dimmed');
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
    });
    
    // THEN: Apply new search
    Object.entries(cardElements).forEach(([friendName, card]) => {
        if (friendName.includes(searchLower)) {
            // Found matching card - bring to top
            found = true;
            
            // Add highlight animation
            card.classList.add('search-found');
            
            // Smooth animation to top-center with slight pop
            card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            // Directly set position properties (more reliable than CSS variables)
            const centerX = window.innerWidth / 2 - 110; // 110 is half of card width (220px)
            const topY = 120;
            
            card.style.left = `${centerX}px`;
            card.style.top = `${topY}px`;
            card.style.zIndex = friendsData.length + 100;
            
            // Reset rotations for flat display
            card.style.setProperty('--rz', '0deg');
            card.style.setProperty('--rx', '0deg');
            card.style.setProperty('--ry', '0deg');
        } else {
            // Dim other cards
            card.classList.add('search-dimmed');
            card.style.opacity = '0.4';
            card.style.pointerEvents = 'none';
        }
    });
    
    return found;
}

function resetAllCards() {
    Object.entries(cardElements).forEach(([friendName, card]) => {
        card.classList.remove('search-found', 'search-dimmed');
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        
        // Apply transition only during reset animation
        card.style.transition = 'all 0.6s ease';
        
        // Reset to original position using CSS variables
        card.style.left = '';
        card.style.top = '';
        card.style.zIndex = '';
        
        card.style.setProperty('--x', `${card.dataset.originalX}px`);
        card.style.setProperty('--y', `${card.dataset.originalY}px`);
        card.style.setProperty('--rz', `${card.dataset.originalRz}deg`);
        card.style.setProperty('--rx', `${card.dataset.originalRx}deg`);
        card.style.setProperty('--ry', `${card.dataset.originalRy}deg`);
        card.style.setProperty('--z', card.dataset.originalZ);
        
        // Remove transition after animation completes
        setTimeout(() => {
            card.style.transition = 'none';
        }, 600);
    });
}

// Search button click
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm.trim()) {
        const found = searchCard(searchTerm);
        clearSearchButton.style.display = found ? 'flex' : 'none';
    }
});

// Search on Enter key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value;
        if (searchTerm.trim()) {
            const found = searchCard(searchTerm);
            clearSearchButton.style.display = found ? 'flex' : 'none';
        }
    }
});

// Clear search
clearSearchButton.addEventListener('click', () => {
    searchInput.value = '';
    resetAllCards();
    clearSearchButton.style.display = 'none';
});

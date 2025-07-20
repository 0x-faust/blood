// ===== SOFIANE'S SANCTUARY - JAVASCRIPT INTERACTIONS =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ROTATING QUOTES FUNCTIONALITY =====
    const rotatingQuotes = document.querySelector('.rotating-quotes');
    
    if (rotatingQuotes) {
        const quotes = rotatingQuotes.querySelectorAll('.quote-item');
        let currentQuoteIndex = 0;
        
        // Function to show next quote
        function showNextQuote() {
            // Hide current quote
            quotes[currentQuoteIndex].classList.remove('active');
            
            // Move to next quote (loop back to start if at end)
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            
            // Show next quote after a brief delay
            setTimeout(() => {
                quotes[currentQuoteIndex].classList.add('active');
            }, 300);
        }
        
        // Start rotating quotes every 4 seconds
        // Edit this interval to change how fast quotes rotate
        setInterval(showNextQuote, 4000);
    }
    
    // ===== TYPEWRITER EFFECT FOR INTRO QUOTE =====
    const introQuoteText = document.querySelector('.quote-text');
    
    if (introQuoteText) {
        const originalText = introQuoteText.textContent;
        
        // Function to create typewriter effect
        function typewriterEffect(element, text, speed = 50) {
            element.textContent = '';
            element.style.opacity = '1';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    // Add cursor blink effect at the end
                    element.style.borderRight = '2px solid #6a5acd';
                    element.style.animation = 'blink 1s infinite';
                    
                    // Remove cursor after 3 seconds
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                        element.style.animation = 'none';
                    }, 3000);
                }
            }, speed);
        }
        
        // Start typewriter effect after page loads
        // Uncomment the line below to enable typewriter effect
        // setTimeout(() => typewriterEffect(introQuoteText, originalText), 1000);
    }
    
    // ===== SMOOTH SCROLLING FOR NAVIGATION =====
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only handle internal links (same page anchors)
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== PARALLAX EFFECT FOR BACKGROUND =====
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    // Add parallax effect on scroll (throttled for performance)
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ===== FADE IN ANIMATION ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in animation
    const fadeElements = document.querySelectorAll('.letter-item, .memory-item, .welcome-content');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(element);
    });
    
    // ===== ENHANCED HEARTBEAT ANIMATION =====
    const heart = document.querySelector('.heart');
    
    if (heart) {
        // Add click interaction to heart
        heart.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'heartbeat 0.5s ease-in-out 3, heartbeat 2s ease-in-out infinite 1.5s';
            }, 10);
        });
        
        // Add hover effect
        heart.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.color = '#8a7ae8';
        });
        
        heart.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = '#6a5acd';
        });
    }
    
    // ===== NAVIGATION ACTIVE STATE =====
    function updateActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage || 
                (currentPage === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active nav link on page load
    updateActiveNavLink();
    
    // ===== LETTER AND MEMORY HOVER EFFECTS =====
    const letterItems = document.querySelectorAll('.letter-item');
    const memoryItems = document.querySelectorAll('.memory-item');
    
    [...letterItems, ...memoryItems].forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===== RANDOM QUOTE GENERATOR (BONUS FEATURE) =====
    // Array of additional quotes that can be dynamically added
    const bonusQuotes = [
        "In the mathematics of love, you are my infinite.",
        "I collect your silences like rare butterflies.",
        "We are two souls writing the same poem in different languages.",
        "Your name is the prayer I whisper to the stars.",
        "In the library of my heart, you are the only book I need.",
        "Time stops when I think of you, and eternity begins.",
        "You are the answer to questions I didn't know I was asking."
    ];
    
    // Function to add a random bonus quote (can be called from console or triggered by events)
    window.addRandomQuote = function() {
        if (rotatingQuotes && bonusQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * bonusQuotes.length);
            const randomQuote = bonusQuotes[randomIndex];
            
            const newQuoteElement = document.createElement('div');
            newQuoteElement.className = 'quote-item';
            newQuoteElement.innerHTML = `<p>"${randomQuote}"</p>`;
            
            rotatingQuotes.appendChild(newQuoteElement);
            
            // Remove the used quote from the array
            bonusQuotes.splice(randomIndex, 1);
            
            console.log('Added new quote:', randomQuote);
        }
    };
    
    // ===== KEYBOARD SHORTCUTS =====
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go to home
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey) {
            window.location.href = 'index.html';
        }
        
        // Press 'L' to go to letters
        if (e.key.toLowerCase() === 'l' && !e.ctrlKey && !e.altKey) {
            window.location.href = 'letters.html';
        }
        
        // Press 'M' to go to memories
        if (e.key.toLowerCase() === 'm' && !e.ctrlKey && !e.altKey) {
            window.location.href = 'memories.html';
        }
        
        // Press 'Q' to add a random quote (Easter egg)
        if (e.key.toLowerCase() === 'q' && !e.ctrlKey && !e.altKey) {
            if (typeof addRandomQuote === 'function') {
                addRandomQuote();
            }
        }
    });
    
    // ===== CONSOLE WELCOME MESSAGE =====
    console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                    Welcome to Sofiane's Sanctuary            ║
    ║                                                              ║
    ║  "In the spaces between code, poetry finds its voice."      ║
    ║                                                              ║
    ║  Keyboard shortcuts:                                         ║
    ║  • H - Home                                                  ║
    ║  • L - Letters                                               ║
    ║  • M - Memories                                              ║
    ║  • Q - Add random quote                                      ║
    ║                                                              ║
    ║  Functions available:                                        ║
    ║  • addRandomQuote() - Add a new quote to rotation           ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
    `);
    
    // ===== PERFORMANCE OPTIMIZATION =====
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
    
    // ===== ACCESSIBILITY ENHANCEMENTS =====
    // Add skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--accent-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const mainContent = document.querySelector('.main-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // ===== CUSTOM CURSOR EFFECT (OPTIONAL) =====
    // Uncomment the following code to add a custom cursor effect
    /*
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(106, 90, 205, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', function() {
        cursor.style.transform = 'scale(1.5)';
    });
    
    document.addEventListener('mouseup', function() {
        cursor.style.transform = 'scale(1)';
    });
    */
});

// ===== CSS ANIMATION KEYFRAMES (Added via JavaScript) =====
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: #6a5acd; }
        51%, 100% { border-color: transparent; }
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
`;
document.head.appendChild(style);


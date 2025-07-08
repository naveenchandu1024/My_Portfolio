// DOM Elements
const cursorFollower = document.querySelector('.cursor-follower');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const skillLevels = document.querySelectorAll('.skill-level');
const header = document.querySelector('header');
const logo = document.querySelector('.logo-text');

// Custom cursor
if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    gsapCursorAnimation(e);
  });
}

function gsapCursorAnimation(e) {
  // If GSAP is loaded, use it for smoother animation
  if (typeof gsap !== 'undefined') {
    gsap.to(cursorFollower, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.1
    });
  } else {
    // Fallback to regular positioning
    cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }
}

// Navbar links hover effects
navLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    if (cursorFollower) cursorFollower.style.transform += ' scale(1.5)';
    link.style.color = 'var(--accent-color)';
  });
  
  link.addEventListener('mouseleave', () => {
    if (cursorFollower) cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    link.style.color = '';
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Close mobile nav if it's open
    if (navLinksContainer.classList.contains('active')) {
      toggleMobileNav();
    }
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Mobile navigation toggle
function toggleMobileNav() {
  navLinksContainer.classList.toggle('active');
  
  // Toggle aria-expanded attribute
  const expanded = mobileNavToggle.getAttribute('aria-expanded') === 'true' || false;
  mobileNavToggle.setAttribute('aria-expanded', !expanded);
  
  // Animate hamburger to X
  const hamburgerLines = document.querySelectorAll('.hamburger span');
  if (navLinksContainer.classList.contains('active')) {
    hamburgerLines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    hamburgerLines[1].style.opacity = '0';
    hamburgerLines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  } else {
    hamburgerLines[0].style.transform = 'none';
    hamburgerLines[1].style.opacity = '1';
    hamburgerLines[2].style.transform = 'none';
    document.body.style.overflow = ''; // Re-enable scrolling
  }
}

if (mobileNavToggle) {
  mobileNavToggle.addEventListener('click', toggleMobileNav);
}

// Typewriter effect for the typed text
function typeWriterEffect() {
  const typedText = document.querySelector('.typed-text');
  if (!typedText) return;
  
  const phrases = ["Web Developer", "Java Developer", "UI Designer", "Tech Enthusiast"];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      typedText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50;
    } else {
      typedText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      // Pause at the end of typing
      isDeleting = true;
      typingSpeed = 1000; // Pause before deleting
    } else if (isDeleting && currentCharIndex === 0) {
      // Move to the next phrase
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing new phrase
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start the typing effect
  setTimeout(type, 1000); // Initial delay
}

// Scroll animations
function scrollAnimations() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const appearOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      });
    }, appearOptions);
    
    // Add animation class to elements we want to animate
    const animateElements = document.querySelectorAll('.interest-card, .project-card, .certification-card, .skill-item');
    animateElements.forEach(element => {
      element.classList.add('fade-in');
      appearOnScroll.observe(element);
    });
  }
}

// Active section highlighting
function activeSectionHighlight() {
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.pageYOffset >= sectionTop - 150) {
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
}

// Header scroll effect
function headerScrollEffect() {
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.style.boxShadow = 'var(--nav-shadow)';
      header.style.height = '70px';
    } else {
      header.style.boxShadow = 'none';
      header.style.height = '80px';
    }
    
    if (scrollTop > lastScrollTop && scrollTop > 300) {
      // Scrolling down
      header.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
}

// Add CSS animation class
function addAnimationClass() {
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .fade-in.appear {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
}

// Initialize all animations and interactive features
function init() {
  typeWriterEffect();
  scrollAnimations();
  activeSectionHighlight();
  headerScrollEffect();
  addAnimationClass();
  
  // Stagger the animation of skill bars
  skillLevels.forEach((level, index) => {
    setTimeout(() => {
      level.style.transform = 'scaleX(1)';
    }, 300 * index);
  });
}

// Run the initialization function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init); 
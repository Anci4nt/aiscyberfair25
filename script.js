document.addEventListener('DOMContentLoaded', () => {
  const scrollBtn = document.getElementById('scrollBtn');
  const contentSection = document.getElementById('content');
  const heroSection = document.getElementById('hero');
  const storyParagraphs = document.querySelectorAll('.story p');
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  setTimeout(() => {
    heroSection.classList.add('loaded');
  }, 100);
  
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
  
  scrollBtn.addEventListener('click', () => {
    const startPosition = window.pageYOffset;
    const targetPosition = window.innerHeight;
    const distance = targetPosition - startPosition;
    const duration = 1200; // ms
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easeOutQuint = function(t) {
        return 1 + (--t) * t * t * t * t;
      };
      
      const easeInOutQuint = function(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      };
      
      window.scrollTo(0, startPosition + distance * easeInOutQuint(progress));
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  });
  
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.classList.add('hover-effect');
  });
  
  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.classList.remove('hover-effect');
  });
  
  function checkScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const contentPosition = contentSection.getBoundingClientRect();
    
    if (scrollPosition > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
    
    const heroOpacity = Math.max(0, 1 - (scrollPosition / (windowHeight * 0.7)));
    
    heroSection.style.opacity = heroOpacity;
    
    if (contentPosition.top < windowHeight * 0.75) {
      contentSection.classList.add('visible');
      
      storyParagraphs.forEach((paragraph, index) => {
        setTimeout(() => {
          paragraph.style.opacity = '1';
          paragraph.style.transform = 'translateY(0)';
        }, 200 * index);
      });
    }
    
    if (contentPosition.top < windowHeight) {
      const parallaxOffset = (windowHeight - contentPosition.top) * 0.1;
      contentSection.style.transform = `translateY(${Math.min(30, parallaxOffset)}px)`;
    }
    
    if (scrollPosition < windowHeight) {
      const buttonScale = 1 - (scrollPosition / windowHeight) * 0.1;
      const buttonTranslate = scrollPosition * 0.05;
      scrollBtn.style.transform = `scale(${buttonScale}) translateY(${buttonTranslate}px)`;
      scrollBtn.style.opacity = 1 - (scrollPosition / windowHeight) * 1.5;
    }
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let startTime = null;
        
        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          const easeInOutQuart = function(t) {
            return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
          };
          
          window.scrollTo(0, startPosition + distance * easeInOutQuart(progress));
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }
        
        requestAnimationFrame(animation);
      }
    });
  });
  
  checkScroll();
  
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        checkScroll();
        scrollTimeout = null;
      }, 10); 
    }
  });
  
  window.addEventListener('resize', checkScroll);
});


// import './style.css'

// // Initialize the flip cards functionality
// document.addEventListener('DOMContentLoaded', () => {
//   // Get all learn more buttons
//   const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
  
//   // Add click event listeners to each button
//   learnMoreButtons.forEach((button, index) => {
//     button.addEventListener('click', (e) => {
//       e.stopPropagation(); // Prevent the click from triggering the flip
      
//       // Get the card title
//       const cardTitle = button.closest('.flip-card-back').querySelector('h3').textContent;
      
//       // Show a message when the button is clicked
//       alert(`You clicked Learn More for ${cardTitle}! More information would be displayed here.`);
      
//       // You could also redirect to another page or open a modal here
//       console.log(`Learn more clicked for card ${index + 1}: ${cardTitle}`);
//     });
//   });
  
//   // Optional: Add a click listener to flip cards on mobile (touch) devices
//   const flipCards = document.querySelectorAll('.flip-card');
  
//   flipCards.forEach(card => {
//     card.addEventListener('click', () => {
//       // Toggle a class to make it work on mobile
//       card.classList.toggle('clicked');
      
//       // If the card has the clicked class, add the rotation
//       if (card.classList.contains('clicked')) {
//         card.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
//       } else {
//         card.querySelector('.flip-card-inner').style.transform = '';
//       }
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const blockCount = 20;

  for (let i = 0; i < blockCount; i++) {
      const block = document.createElement('div');
      block.className = 'floating-block';
      
      // Random position
      block.style.left = `${Math.random() * 100}%`;
      block.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration and delay
      const duration = 10 + Math.random() * 10;
      const delay = Math.random() * 5;
      block.style.animation = `float ${duration}s infinite ${delay}s ease-in-out`;
      
      container.appendChild(block);
  }
});
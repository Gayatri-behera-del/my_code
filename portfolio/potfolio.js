// Function to handle the scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // If the element is visible in the viewport
        if (entry.isIntersecting) {
            // Add the 'active' class to start the CSS transition
            entry.target.classList.add('active');
            // Stop observing once the animation is played
            observer.unobserve(entry.target);
        }
    });
}, {
    // Root margin defines the area around the root (viewport) used for intersection.
    // '-50px' means the element must be 50px inside the viewport to trigger.
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1 // Percentage of target visible to trigger callback
});

// Select all elements that should animate on scroll
const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

// Attach the observer to each element
elementsToAnimate.forEach(element => {
    observer.observe(element);
});
(function () {
  "use strict";
  console.log("reading js");

  // Get all elements with the class 'zoom-image'
  const images = document.querySelectorAll('.zoom-image');

  // Add event listeners for the hover effect to each image
  images.forEach((image) => {
    const imageContainer = image.parentElement;
    imageContainer.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX - imageContainer.getBoundingClientRect().left;
      const mouseY = e.clientY - imageContainer.getBoundingClientRect().top;

      const normalizedX = mouseX / imageContainer.offsetWidth;
      const normalizedY = mouseY / imageContainer.offsetHeight;

      image.style.transformOrigin = `${normalizedX * 100}% ${normalizedY * 100}%`;
    });

    imageContainer.addEventListener('mouseover', () => {
      image.style.transition = 'transform 1s, filter 0.5s ease-out';
      image.style.transform = 'scale(3)';
    });

    imageContainer.addEventListener('mouseout', () => {
      image.style.transition = 'transform 1s, filter 0.5s ease-out';
      image.style.transform = 'scale(1)';
    });
  });

  const mobileMenu = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');
  
  mobileMenu.addEventListener('click', function () {
    navList.classList.toggle('show');
  });
})();

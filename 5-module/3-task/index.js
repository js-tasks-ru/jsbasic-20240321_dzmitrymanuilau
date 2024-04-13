function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const slideWidth = carouselInner.offsetWidth;
  let currentSlide = 0;

  function updateButtonsVisibility() {
      if (currentSlide === 0) {
          arrowLeft.style.display = 'none';
          arrowRight.style.display = '';
      } else if (currentSlide === 3) {
          arrowLeft.style.display = '';
          arrowRight.style.display = 'none';
      } else {
          arrowLeft.style.display = '';
          arrowRight.style.display = '';
      }
  }

  updateButtonsVisibility();

  arrowLeft.addEventListener('click', function () {
      currentSlide--;
      const translateValue = -currentSlide * slideWidth;
      carouselInner.style.transform = `translateX(${translateValue}px)`;
      updateButtonsVisibility();
  });

  arrowRight.addEventListener('click', function () {
      currentSlide++;
      const translateValue = -currentSlide * slideWidth;
      carouselInner.style.transform = `translateX(${translateValue}px)`;
      updateButtonsVisibility();
  });
}
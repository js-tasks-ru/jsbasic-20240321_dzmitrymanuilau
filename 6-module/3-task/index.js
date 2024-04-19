import createElement from '../../assets/lib/create-element.js';

// Экспортируем класс Carousel по умолчанию
export default class Carousel {
  constructor(slides) {
    // Сохраняем слайды и устанавливаем текущий индекс слайда
    this.slides = slides;
    this.currentSlideIndex = 0;
    // Вызываем метод отрисовки карусели
    this.render();
  }

  render() {
    // Создаем DOM элемент карусели
    this.elem = createElement(`
      <div class="carousel">
        <!-- Кнопки переключения -->
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none;">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <!-- Обертка для слайдов -->
        <div class="carousel__inner">
          <!-- Рендерим каждый слайд -->
          ${this.slides.map(slide => this.renderSlide(slide)).join('')}
        </div>
      </div>
    `);
    // Инициализируем карусель
    this.initCarousel();
  }

  renderSlide(slide) {
    // Генерируем HTML для отдельного слайда
    return `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `;
  }

  initCarousel() {
    // Добавляем обработчики событий для кнопок и кнопок "Плюс"
    this.elem.querySelector('.carousel__arrow_right').addEventListener('click', () => this.onArrowClick('right'));
    this.elem.querySelector('.carousel__arrow_left').addEventListener('click', () => this.onArrowClick('left'));
    this.elem.querySelectorAll('.carousel__button').forEach(button => {
      button.addEventListener('click', event => this.onPlusButtonClick(event));
    });
  }

  onArrowClick(direction) {
    // Обрабатываем клики по кнопкам переключения
    const inner = this.elem.querySelector('.carousel__inner');
    const slideWidth = this.elem.querySelector('.carousel__slide').offsetWidth;
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');

    if (direction === 'right') {
      this.currentSlideIndex++;
      arrowLeft.style.display = '';
    } else if (direction === 'left') {
      this.currentSlideIndex--;
      arrowRight.style.display = '';
    }

    inner.style.transform = `translateX(-${slideWidth * this.currentSlideIndex}px)`;

    if (this.currentSlideIndex === 0) {
      arrowLeft.style.display = 'none';
    } else if (this.currentSlideIndex === this.slides.length - 1) {
      arrowRight.style.display = 'none';
    }
  }

  onPlusButtonClick(event) {
    // Обрабатываем клики по кнопкам "Плюс"
    const slideId = event.target.closest('.carousel__slide').dataset.id;
    const customEvent = new CustomEvent('product-add', {
      detail: slideId,
      bubbles: true
    });
    this.elem.dispatchEvent(customEvent);
  }
}
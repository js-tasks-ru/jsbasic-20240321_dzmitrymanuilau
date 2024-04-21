export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.createSlider();
    this.initEventListeners();
  }

  createSlider() {
    const slider = document.createElement('div');
    slider.className = 'slider';

    // Slider thumb and value display
    slider.innerHTML = `
      <div class="slider__thumb" style="left: ${this.getPercentage()}%">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: ${this.getPercentage()}%"></div>
      <div class="slider__steps">${this.createSteps()}</div>
    `;
    return slider;
  }

  createSteps() {
    return Array.from({ length: this.steps }, (_, index) => {
      return `<span ${index === this.value ? 'class="slider__step-active"' : ''}></span>`;
    }).join('');
  }

  initEventListeners() {
    this.elem.addEventListener('click', this.onClick.bind(this));
  }

  onClick(event) {
    const newLeft = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = newLeft / this.elem.offsetWidth;
    const approximateValue = leftRelative * (this.steps - 1);
    const newValue = Math.round(approximateValue);
    this.setValue(newValue);
  }

  setValue(newValue) {
    if (newValue < 0 || newValue >= this.steps) {
      return; // Guard against invalid value assignment
    }

    this.value = newValue;
    const percentage = this.getPercentage();

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const steps = this.elem.querySelectorAll('span');

    thumb.style.left = `${percentage}%`;
    progress.style.width = `${percentage}%`;

    if (this.elem.querySelector('.slider__step-active')) {
      this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
    }
    steps[newValue].classList.add('slider__step-active');

    thumb.querySelector('.slider__value').textContent = newValue;

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  getPercentage() {
    return (this.value / (this.steps - 1)) * 100;
  }
}
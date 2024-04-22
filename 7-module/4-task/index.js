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
    const thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', this.onPointerDown.bind(this));
    this.elem.addEventListener('click', this.onClick.bind(this));
  }

  onPointerDown(event) {
    event.preventDefault();
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onPointerMove.bind(this));
    document.addEventListener('pointerup', this.onPointerUp.bind(this));
  }

  onPointerMove(event) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    leftRelative = Math.max(0, Math.min(leftRelative, 1));

    const newLeftPercent = leftRelative * 100;
    const newValue = Math.round(leftRelative * (this.steps - 1));

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    thumb.style.left = `${newLeftPercent}%`;
    progress.style.width = `${newLeftPercent}%`;

    this.updateValue(newValue);
  }

  onPointerUp() {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');
    this.setValue(this.value);
  }

  onClick(event) {
    const newLeft = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = newLeft / this.elem.offsetWidth;
    const newValue = Math.round(leftRelative * (this.steps - 1));
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

    steps.forEach(step => step.classList.remove('slider__step-active'));
    steps[newValue].classList.add('slider__step-active');

    thumb.querySelector('.slider__value').textContent = newValue;

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  updateValue(newValue) {
    if (newValue !== this.value) {
      this.value = newValue;
      this.elem.querySelector('.slider__value').textContent = newValue;
      const steps = this.elem.querySelectorAll('span');
      steps.forEach(step => step.classList.remove('slider__step-active'));
      steps[newValue].classList.add('slider__step-active');
    }
  }

  getPercentage() {
    return (this.value / (this.steps - 1)) * 100;
  }
}
import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.render();
    this.attachEventListeners();
  }

  render() {
    const arrowLeftHtml = `<button class="ribbon__arrow ribbon__arrow_left"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`;
    const arrowRightHtml = `<button class="ribbon__arrow ribbon__arrow_right"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></button>`;

    const categoriesHtml = this.categories.map(category => 
      `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`
    ).join('');

    this.elem.innerHTML = `${arrowLeftHtml}<nav class="ribbon__inner">${categoriesHtml}</nav>${arrowRightHtml}`;
    this.updateArrows();
  }

  attachEventListeners() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    arrowLeft.addEventListener('click', () => {
      ribbonInner.scrollBy(-350, 0);
    });

    arrowRight.addEventListener('click', () => {
      ribbonInner.scrollBy(350, 0);
    });

    ribbonInner.addEventListener('scroll', () => {
      this.updateArrows();
    });

    ribbonInner.addEventListener('click', event => {
      event.preventDefault();
      const target = event.target.closest('.ribbon__item');
      if (target) {
        this.selectCategory(target);
      }
    });
  }

  updateArrows() {
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const scrollLeft = ribbonInner.scrollLeft;
    const scrollWidth = ribbonInner.scrollWidth;
    const clientWidth = ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    this.elem.querySelector('.ribbon__arrow_left').classList.toggle('ribbon__arrow_visible', scrollLeft > 0);
    this.elem.querySelector('.ribbon__arrow_right').classList.toggle('ribbon__arrow_visible', scrollRight > 1);
  }

  selectCategory(selectedItem) {
    this.elem.querySelectorAll('.ribbon__item').forEach(item => item.classList.remove('ribbon__item_active'));
    selectedItem.classList.add('ribbon__item_active');
    this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
      detail: selectedItem.dataset.id,
      bubbles: true
    }));
  }
}
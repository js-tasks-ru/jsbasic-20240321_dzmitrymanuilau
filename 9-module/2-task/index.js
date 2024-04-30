import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';

import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor() {
    this.slides = slides;
    this.categories = categories;
    this.initComponents();
    this.initEventListeners();
  }

  initComponents() {
    // Очищаем контейнеры перед инициализацией компонентов, чтобы избежать дублирования
    const carouselHolder = document.querySelector('[data-carousel-holder]');
    carouselHolder.innerHTML = '';
    this.carousel = new Carousel(this.filterUniqueSlides(this.slides));
    carouselHolder.appendChild(this.carousel.elem);

    const ribbonHolder = document.querySelector('[data-ribbon-holder]');
    ribbonHolder.innerHTML = '';
    this.ribbonMenu = new RibbonMenu(this.categories);
    ribbonHolder.appendChild(this.ribbonMenu.elem);

    const sliderHolder = document.querySelector('[data-slider-holder]');
    sliderHolder.innerHTML = '';
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    sliderHolder.appendChild(this.stepSlider.elem);

    const cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.innerHTML = '';
    this.cartIcon = new CartIcon();
    cartIconHolder.appendChild(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);
  }

  filterUniqueSlides(slides) {
    const uniqueIds = new Set();
    return slides.filter(slide => {
      const isDuplicate = uniqueIds.has(slide.id);
      uniqueIds.add(slide.id);
      return !isDuplicate;
    });
  }

  async render() {
    try {
      const response = await fetch('products.json');
      const products = await response.json();

      const gridHolder = document.querySelector('[data-products-grid-holder]');
      gridHolder.innerHTML = '';  // Очистка предыдущих товаров
      this.productsGrid = new ProductsGrid(products);
      gridHolder.appendChild(this.productsGrid.elem);

      this.updateFilters();
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }

  updateFilters() {
    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  initEventListeners() {
    document.body.addEventListener('product-add', event => {
      const product = this.productsGrid.products.find(p => p.id === event.detail);
      if (product) {
        this.cart.addProduct(product);
      }
    });

    this.stepSlider.elem.addEventListener('slider-change', event => {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', event => {
      this.productsGrid.updateFilter({ category: event.detail });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', event => {
      this.productsGrid.updateFilter({ noNuts: event.target.checked });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', event => {
      this.productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
    });
  }
}

// Использование класса Main при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  const main = new Main();
  main.render();
});
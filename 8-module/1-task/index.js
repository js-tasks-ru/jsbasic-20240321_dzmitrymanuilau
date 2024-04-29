import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if (!this.elem.offsetWidth && !this.elem.offsetHeight) {
      return; // Иконка корзины скрыта
    }
  
    if (window.innerWidth <= 767) {
      Object.assign(this.elem.style, {
        position: '',
        top: '',
        right: '',
        zIndex: ''
      });
      return; // Не перемещаем иконку в "мобильном" режиме
    }
  
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;
  
    if (scrollTop > initialTopCoord - this.elem.offsetHeight) {
      this.elem.style.position = 'fixed';
      this.elem.style.top = '50px'; // Фиксируем иконку на 50px сверху
      this.elem.style.zIndex = '1000'; // Повышаем z-index
  
      let container = document.querySelector('.container');
      if (container) {
        let containerRect = container.getBoundingClientRect();
        let containerRightEdge = containerRect.right + 20; // 20px правее контейнера
        let screenRightEdge = document.documentElement.clientWidth - 10; // 10px от правого края окна
        let maxRightPosition = Math.min(containerRightEdge, screenRightEdge); // Находим меньшее значение
  
        this.elem.style.right = `${document.documentElement.clientWidth - maxRightPosition}px`;
      } else {
        this.elem.style.right = '10px'; // Если контейнер не найден, устанавливаем 10px от правого края
      }
    } else {
      Object.assign(this.elem.style, {
        position: 'absolute', // Возвращаем абсолютное позиционирование
        top: '',
        right: '',
        zIndex: ''
      });
    }
  }  
}
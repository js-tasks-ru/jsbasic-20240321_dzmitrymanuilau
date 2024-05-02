import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';
import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count++;
    } else {
      cartItem = { product, count: 1 };
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.count += amount;

        if (cartItem.count === 0) {
            this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
        }

        this.onProductUpdate(cartItem);
    }
}

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.count), 0);
  }

  renderProduct(product, count) {
    return createElement(`
      <div class="cart-product" data-product-id="${product.id}">
        <div class="cart-product__img">
          <img src="/assets/images/products/${product.image}" alt="${escapeHtml(product.name)}">
        </div>
        <div class="cart-product__info">
          <div class="cart-product__title">${escapeHtml(product.name)}</div>
          <div class="cart-product__price-wrap">
            <div class="cart-counter">
              <button type="button" class="cart-counter__button cart-counter__button_minus">
                <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
              </button>
              <span class="cart-counter__count">${count}</span>
              <button type="button" class="cart-counter__button cart-counter__button_plus">
                <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
              </button>
            </div>
            <div class="cart-product__price">€${product.price.toFixed(2)}</div>
          </div>
        </div>
      </div>
    `);
  }

  renderOrderForm() {
    return createElement(`
      <form class="cart-form">
        <h5 class="cart-form__title">Delivery</h5>
        <div class="cart-form__group cart-form__group_row">
          <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
          <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
          <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
        </div>
        <div class="cart-form__group">
          <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
        </div>
        <div class="cart-buttons">
          <div class="cart-buttons__buttons btn-group">
            <div class="cart-buttons__info">
              <span class="cart-buttons__info-text">total</span>
              <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
            </div>
            <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
          </div>
        </div>
      </form>
    `);
  }

  renderModal() {
    if (!this.modal) {
      this.modal = new Modal();
    }
    this.modal.setTitle("Your order");

    const modalBody = document.createElement('div');

    this.cartItems.forEach(item => {
      modalBody.appendChild(this.renderProduct(item.product, item.count));
    });

    modalBody.appendChild(this.renderOrderForm());
    this.modal.setBody(modalBody);
    this.modal.open();

    this.addModalEventListeners(modalBody);
  }

  addModalEventListeners(modalBody) {
    modalBody.addEventListener('click', event => {
      const button = event.target.closest('.cart-counter__button');
      if (button) {
        const productElement = button.closest('.cart-product');
        const productId = productElement.dataset.productId;
        const isPlus = button.classList.contains('cart-counter__button_plus');
        this.updateProductCount(productId, isPlus ? 1 : -1);
      }
    });

    const form = modalBody.querySelector('.cart-form');
    form.addEventListener('submit', event => this.onSubmit(event));
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    if (this.modal && this.modal.isOpen()) {
        const productElement = this.modal.modalElement.querySelector(`[data-product-id="${cartItem.product.id}"]`);
        if (productElement) {
            const countElement = productElement.querySelector('.cart-counter__count');
            const priceElement = productElement.querySelector('.cart-product__price');
            countElement.textContent = cartItem.count;
            priceElement.textContent = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`; // Обновляем индивидуальную стоимость товара

            if (cartItem.count === 0) {
                productElement.remove();
            }
        }

        const totalPriceElement = this.modal.modalElement.querySelector('.cart-buttons__info-price');
        totalPriceElement.textContent = `€${this.getTotalPrice().toFixed(2)}`; // Обновляем общую стоимость

        // Закрытие модального окна, если в корзине не осталось товаров
        if (this.isEmpty()) {
            this.modal.close();
        }
    }
}

onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
    })
    .then(data => {
        // Очищаем корзину
        this.cartItems = [];
        // Обновляем иконку корзины
        this.cartIcon.update(this);
        
        // Проверяем наличие модального окна
        if (this.modal && this.modal.isOpen()) {
            // Устанавливаем заголовок модальному окну на "Success!"
            this.modal.setTitle('Success!');
            
            // Устанавливаем содержимое модального окна
            const successContent = createElement(`
                <div class="modal__body-inner">
                    <p>Order successful! Your order is being cooked.<br>
                    We will notify you about delivery time shortly.<br>
                    <img src="/assets/images/delivery.gif"></p>
                </div>
            `);
            this.modal.setBody(successContent);
            // Открываем модальное окно
            this.modal.open(); 
        }
        // Удаляем класс загрузки с кнопки
        submitButton.classList.remove('is-loading');
    })
    .catch(error => {
        console.error('Error:', error);
        // Удаляем класс загрузки с кнопки в случае ошибки
        submitButton.classList.remove('is-loading');
        // Проверяем наличие модального окна
        if (this.modal && this.modal.isOpen()) {
            // Устанавливаем заголовок модальному окну на "Error!"
            this.modal.setTitle('Error!');
            // Устанавливаем содержимое модального окна с сообщением об ошибке
            this.modal.setBody(createElement(`
                <div class="modal__body-inner">
                    <p>There was an error processing your order. Please try again.</p>
                </div>
            `));
            // Открываем модальное окно с сообщением об ошибке
            this.modal.open();
        }
    });
}

}
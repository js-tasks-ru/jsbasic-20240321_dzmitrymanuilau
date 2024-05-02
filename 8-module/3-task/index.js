export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return; // Проверяем, что переданный объект product действителен

    let cartItem = this.cartItems.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.count++; // Увеличиваем количество, если товар уже есть в корзине
    } else {
      cartItem = { product, count: 1 }; // Создаем новый элемент корзины, если товара нет
      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id === productId);

    if (cartItem) {
      cartItem.count += amount; // Изменяем количество на указанное в amount

      if (cartItem.count === 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId); // Удаляем товар, если его количество стало равно нулю
      }

      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0; // Проверяем, пуста ли корзина
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0); // Считаем общее количество товаров в корзине
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.count), 0); // Считаем общую стоимость товаров в корзине
  }

  onProductUpdate(cartItem) {
    // Планируется реализация в следующей задаче
    this.cartIcon.update(this);
  }
}
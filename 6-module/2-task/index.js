import createElement from '../../assets/lib/create-element.js';

class ProductCard {
    constructor(product) {
        this.product = product;
        this.render();
        this.elem.addEventListener('click', this.onAddButtonClick.bind(this));
    }

    render() {
        this.elem = createElement(`
            <div class="card">
                <div class="card__top">
                    <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
                    <span class="card__price">€${this.formatPrice(this.product.price)}</span>
                </div>
                <div class="card__body">
                    <div class="card__title">${this.product.name}</div>
                    <button type="button" class="card__button">
                        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                    </button>
                </div>
            </div>
        `);
    }

    formatPrice(price) {
        return price.toFixed(2);
    }

    onAddButtonClick() {
        const event = new CustomEvent("product-add", {
            detail: this.product.id,
            bubbles: true
        });
        this.elem.dispatchEvent(event);
    }
}

export default ProductCard;
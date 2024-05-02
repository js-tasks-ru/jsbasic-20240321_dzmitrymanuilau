import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
    constructor(products) {
        this.products = products;
        this.filters = {};
        this.elem = createElement('<div class="products-grid"></div>');
        this.render();
    }

    render() {
        this.inner = createElement('<div class="products-grid__inner"></div>');
        this.elem.appendChild(this.inner);
        this.updateDisplay();
    }

    updateFilter(filters) {
        Object.assign(this.filters, filters);
        this.updateDisplay();
    }

    updateDisplay() {
        this.inner.innerHTML = '';
        let filteredProducts = this.products.filter(product => {
            if (this.filters.noNuts && product.nuts) return false;
            if (this.filters.vegeterianOnly && !product.vegeterian) return false;  // ОШИБОЧНЫЙ ПЕРЕВОД! 'vegeterian' вместо 'vegetarian'
            if (this.filters.maxSpiciness !== undefined && product.spiciness > this.filters.maxSpiciness) return false;
            if (this.filters.category && product.category !== this.filters.category) return false;
            return true;
        });
        filteredProducts.forEach(product => {
            let productCard = new ProductCard(product);
            this.inner.appendChild(productCard.elem);
        });
    }
}
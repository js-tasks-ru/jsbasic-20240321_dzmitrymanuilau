import createElement from '../../assets/lib/create-element.js';

export default class Modal {
    constructor() {
        this.render();
        this.attachEvents();
    }

    render() {
        const html = `
            <div class="modal">
                <div class="modal__overlay" data-element="overlay"></div>
                <div class="modal__inner" data-element="inner">
                    <div class="modal__header">
                        <button type="button" class="modal__close" data-element="close">&times;</button>
                        <h3 class="modal__title" data-element="title">Default Title</h3>
                    </div>
                    <div class="modal__body" data-element="body">Default body content</div>
                </div>
            </div>`;
        this.modalElement = createElement(html);
        this.overlay = this.modalElement.querySelector('.modal__overlay');
    }

    attachEvents() {
        this.modalElement.querySelector('[data-element="close"]').addEventListener('click', () => this.close());
        this.keydownHandler = event => {
            if (event.code === 'Escape') {
                this.close();
            }
        };
    }

    open() {
        if (!this.isOpen()) {
            document.body.appendChild(this.modalElement);
            document.body.classList.add('is-modal-open');
            document.addEventListener('keydown', this.keydownHandler);
        }
    }

    setTitle(title) {
        this.modalElement.querySelector('[data-element="title"]').textContent = title;
    }

    setBody(content) {
        const body = this.modalElement.querySelector('[data-element="body"]');
        body.innerHTML = '';  // Clear existing content first
        body.append(content); // Use append for Node or HTMLString
    }

    close() {
        if (this.isOpen()) {
            document.body.classList.remove('is-modal-open');
            document.body.removeChild(this.modalElement);
            document.removeEventListener('keydown', this.keydownHandler);
        }
    }

    isOpen() {
        return document.body.contains(this.modalElement);
    }
}
import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }
    let cartItem = this.cartItems.find((el) => el.product.id === product.id);

    if (!cartItem) {
      cartItem = {
        product: product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    } else {
      cartItem.count += 1;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((el) => el.product.id === productId);

    if (cartItem) {
      cartItem.count += amount;
      if (cartItem.count == 0) {
        let index = this.cartItems.indexOf(cartItem);
        this.cartItems.splice(index, 1);
        if (this.cartItems.length) {
          this.modal.close();
          this.renderModal();
        } else {
          this.modal.close();
        }
      }

      this.onProductUpdate(cartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    let carCount = 0;
    if (this.cartItems) {
      this.cartItems.map((el) => {
        carCount += el.count;
      });
    }
    return carCount;
  }

  getTotalPrice() {
    let cartPrice = 0;
    if (this.cartItems) {
      this.cartItems.map((el) => {
        cartPrice = cartPrice + el.count * el.product.price;
      });
    }
    return cartPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
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
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
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
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    this.cartItems.forEach((el) => {
      const html = this.renderProduct(el.product, el.count);
      this.modal.setBody(html);
      html
        .querySelector(".cart-counter__button_minus")
        .addEventListener("click", () => {
          this.updateProductCount(el.product.id, -1);
        });
      html
        .querySelector(".cart-counter__button_plus")
        .addEventListener("click", () => {
          this.updateProductCount(el.product.id, 1);
        });
    });

    this.modal.setBody(this.renderOrderForm());
    const form = this.modal.modal.querySelector(".cart-form");

    form.addEventListener("submit", (event) => {
      this.onSubmit(event);
    });
    this.modal.open();
  }

  onProductUpdate(cartItem) {
    console.log(cartItem);

    this.body = document.querySelector("body");
    if (this.body.classList.contains("is-modal-open") && cartItem.count != 0) {
      // Элемент, который хранит количество товаров с таким productId в корзине
      let productCount = this.modal.modal.querySelector(
        `[data-product-id="${cartItem.product.id}"] .cart-counter__count`,
      );
      productCount.innerHTML = cartItem.count;

      // Элемент с общей стоимостью всех единиц этого товара
      let productPrice = this.modal.modal.querySelector(
        `[data-product-id="${cartItem.product.id}"] .cart-product__price`,
      );
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;

      // Элемент с суммарной стоимостью всех товаров
      let infoPrice = this.modal.modal.querySelector(
        `.cart-buttons__info-price`,
      );
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }

    this.cartIcon.update(this);
  }

  async onSubmit(event) {
    event.preventDefault();

    const button = this.modal.modal.querySelector('button[type="submit"]');
    button.classList.add("is-loading");

    const form = this.modal.modal.querySelector(".cart-form");

    let response = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(form),
    });

    if (response.status != 200) return;

    this.modal.setTitle(`Success!`);

    const modalBody = this.modal.modal.querySelector(".modal__body");
    modalBody.innerHTML = "";

    modalBody.append(
      createElement(`
  <div class="modal__body-inner">
    <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
    </p>
  </div>
`),
    );

    this.cartItems = [];
    this.cartIcon.update(this);
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

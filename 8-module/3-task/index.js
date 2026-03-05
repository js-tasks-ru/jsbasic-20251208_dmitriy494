export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче
    this.cartIcon.update(this);
  }
}

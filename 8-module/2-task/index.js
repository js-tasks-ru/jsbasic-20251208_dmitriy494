import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: true, // true/false
      vegeterianOnly: false, // true/false
      maxSpiciness: 4, // числа от 0 до 4
      category: "", // уникальный идентификатор категории товара
    };
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
        </div>
      </div>`);

    let productsGridInner = this.elem.querySelector(".products-grid__inner");

    this.products.map((el) => {
      let card = new ProductCard(el);

      productsGridInner.append(card.elem);
    });
  }

  updateFilter(filters) {
    const key = Object.keys(filters)[0];

    console.log(filters);
    this.filters[key] = filters[key];
    console.log(this.filters[key]);

    console.log(this.products);

    let newProduct = this.products.filter((el) => {
      if (this.filters.noNuts && el.nuts) {
        return false;
      }

      if (this.filters.vegeterianOnly && !el.vegeterian) {
        return false;
      }

      if (el.spiciness > this.filters.maxSpiciness) {
        return false;
      }

      if (this.filters.category && el.category !== this.filters.category) {
        return false;
      }

      return true; // ✅ все проверки прошли
    });

    console.log(newProduct);

    this.updateProduct(newProduct);
  }

  updateProduct(newProduct) {
    let productsGridInner = this.elem.querySelector(".products-grid__inner");
    productsGridInner.innerHTML = "";

    newProduct.map((el) => {
      let card = new ProductCard(el);

      productsGridInner.append(card.elem);
    });
  }
}

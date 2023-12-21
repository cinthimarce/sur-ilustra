import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    countProduct: 0,
  }),
  getters: {
    getCartList(state) {
      return state.cart.map((prod) => {
        const myProd = { ...prod };
        myProd.total = prod.quantity * prod.price;
        return myProd;
      });
    },
    cartTotalProducts(state) {
      return state.cart.reduce((total, prod) => total + prod.quantity, 0);
    },
    cartTotalPrice() {
      return this.getCartList.reduce((total, prod) => total + prod.total, 0);
    },
    cartCount(state) {
      return state.cart.length;
    },
  },
  actions: {
    addProductToCart(product) {
      const existingProduct = this.cart.find(
        (prod) => prod.id === product.id && prod.withFrame === product.withFrame
      );

      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        this.cart.push(product);
      }
      this.countProduct += product.quantity;
    },
    removeProductCart({ id, withFrame }) {
      const productIndex = this.cart.findIndex(
        (prod) => prod.id === id && prod.withFrame === withFrame
      );
      if (productIndex !== -1) {
        this.cart.splice(productIndex, 1);
      }
    },
    addStockCart({ id, withFrame }) {
      const productIndex = this.cart.findIndex(
        (prod) => prod.id === id && prod.withFrame === withFrame
      );
      if (productIndex !== -1) {
        this.cart[productIndex].quantity += 1;
      }
    },
    subtractStockCart({ id, withFrame }) {
      const productIndex = this.cart.findIndex(
        (prod) =>
          prod.id === id && prod.withFrame === withFrame && prod.quantity > 1
      );
      if (productIndex !== -1) {
        this.cart[productIndex].quantity -= 1;
      }
    },
  },
});

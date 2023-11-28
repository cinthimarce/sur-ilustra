import { defineStore } from "pinia";
import { galeria } from "@/lib/data";


export const useCartStore = defineStore('cart', {
    state: () => ({
        cart: [],
        gallery: { ilustrations: [], scultures: [] }
    }),
    getters: {
        getCartList(state) {
            return state.cart.map(prod => {
                const myProd = prod
                myProd.total = prod.count * prod.price
                return myProd
            })
        },
        cardCount(state) {
            return state.cart.length
        },
        galleryProducts(state) {
            return state.gallery
        },
        cartTotalPrice() {
            return this.getCartList.reduce((total, prod) => {
                return total + prod.total
            }, 0);
        }
    },
    actions: {
        initializeGallery() {
            this.gallery = galeria;
        },
        addProductCart(product) {
            const exist = this.cart.some(prod => prod.id == product.id);
            if (!exist) {
                this.cart.push(product);
            } else {
                this.cart.forEach(prod => {
                    if (prod.id == product.id) {
                        prod.count += 1
                    }
                })

            }
        },
        removeProductCart(idProduct) {
            const index = this.cart.findIndex(prod => prod.id == idProduct)
            this.cart.splice(index, 1)
        },

        addStockCart(idProduct) {
            this.cart.forEach(prod => {
                if (prod.id == idProduct) {
                    prod.count += 1
                }
            })
        },

        removeStockCart(idProduct) {
            this.cart.forEach(prod => {
                if (prod.id == idProduct && prod.count > 1) {
                    prod.count -= 1
                }
            })
        },
        getIlustrationById (id){
            return this.gallery.ilustrations.find(ilustration => ilustration.id == id)
          }   
    }

})
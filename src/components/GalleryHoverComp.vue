<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="item in ilustrations" :key="item.id">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :elevation="isHovering ? 12 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
              class="transparent"
            >
              <v-img
                :src="item.image"
                height="310px"
                cover
                @click="redirectTo(item.id)"
              >
                <div class="align-self-center">
                  <v-card-title
                    class="text-h6 text-transparent d-flex flex-column align-center"
                    :class="{ 'show-btns': isHovering }"
                    :color="transparent"
                  >
                  </v-card-title>
                </div>

                <v-expand-transition>
                  <v-btn
                    v-if="isHovering"
                    class="d-flex transition-fast-in-fast-out color-primary v-card--reveal text-h9"
                    :class="{ isHovering }"
                    style="height: 10%"
                    @click="showCard(item.id)"
                  >
                    <v-text class="text-overline">Ver Detalle</v-text>
                  </v-btn>
                </v-expand-transition>
              </v-img>
              <v-card-text>
                <p class="font-weight-light text-septenary text-h6 ma-0">
                  {{ item.title }}
                </p>
                <p class="font-weight-medium text-grey subtext-card">
                  {{ item.subtext }}
                </p>
              </v-card-text>
              
              <v-divider color="info"></v-divider>
              
              <v-sheet class="d-flex justify-center mb-4 pt-4">
                <v-sheet
                  class="pl-5 text-h5 font-weight-bold text-septenary"
                  >{{ formatCurrency(item.price) }}</v-sheet
                >
                <v-sheet class="pr-5"
                  ><!-- <v-btn
                    size="small"
                    elevation="0"
                    color="septenary"
                    icon="mdi-cart-outline"
                  ></v-btn
                > --></v-sheet>
              </v-sheet>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
    <!--Modal-->
    <div>
      <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
        v-model="dialog"
      >
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="septenary"
              class="pr-2"
              :title="galleryShowCards.title"
            >
              <v-spacer></v-spacer>
              <v-btn icon dark @click="isActive.value = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-items> </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <!--ingresando el componente showCards-->
              <GalleryDialogComp :ilustraciones="galleryShowCards" />
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn class="color-bg-cart px-6 mb-4" variant="text"
                >Agregar al Carrito</v-btn 
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
  </v-container>
</template>
 
<script setup>
//import { defineProps } from "vue";
//const propsImg = defineProps(["galleryData"]);
import { useCartStore } from "@/stores/cart";
import { ref } from "vue";
import GalleryDialogComp from "./GalleryDialogComp.vue";
import { useRouter } from "vue-router";

//states
const transparent = "rgba(255, 255, 255, 0)";
const cartStore = useCartStore();
const dialog = ref(false);
const galleryShowCards = ref([]);
const ilustrations = cartStore.galleryProducts.ilustrations;
const route = useRouter();

const formatCurrency = (value) =>{
  return new Intl.NumberFormat('es-CL',{
    style: 'currency',
    currency: 'CLP',
  }).format(value)
}

//functions
// function add(item) {
//   let prod = {
//     id: item.id,
//     title: item.title,
//     image: item.image,
//     price: item.price,
//     count: 1,
//   };
//   console.log(prod);
//   cartStore.addProductCart(prod);
// }
//console.log(cartStore.cartProduct.values)

// creando funcion para ruta dinamica

const redirectTo = (id) => {
  route.push(`/ilustration/${id}`);
};

const showCard = (id) => {
  dialog.value = true;
  galleryShowCards.value = ilustrations.find(
    (ilustration) => ilustration.id == id
  );
};
</script>
 
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;300&display=swap;wght@500");

.transparent {
  transition: opacity 0.3s ease-in-out;
}

.transparent:not(.on-hover) {
  opacity: 0.75;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}

.show-btns {
  color: #315467 !important;
  text-shadow: 2px 2px 4px rgb(125, 124, 124);
}

.color-primary {
  background-color: #e3f26d;
  color: #556560;
  font-family: "Raleway", sans-serif;
  opacity: 0.8;
}

.text-septenary {
  color: #315467;
}

.text-grey {
  color: #1d1d1d;
}

.color-bg-cart {
  background-color: #e3f26d;
  color: #315467;
  border-bottom: none;
}
.subtext-card{
  font-size: 0.85rem;
}
</style>
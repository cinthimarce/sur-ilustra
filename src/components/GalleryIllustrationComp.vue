<template>
  <v-container>
    <v-row d-flex align-center>
      <!-- SMALL IMAGE-->
      <v-card-actions class="d-flex align-center flex-column " height="200">
        <!-- <v-btn variant="plain" icon="mdi-chevron-up" @click="prev"></v-btn> -->
        <v-col cols="auto" class="pa-10">
          <v-sheet :height="130" :width="130">
            <v-hover v-slot="{ isHovering, props }">
              <GalleyCardSmall :src_image="src_image" :isHovering="isHovering" :props="props"
                @changeImage="handleChangeImage(src_image)" />
            </v-hover>
          </v-sheet>
          <v-sheet :height="130" :width="130">
            <v-hover v-slot="{ isHovering, props }">
              <GalleyCardSmall :src_image="src_canva" :isHovering="isHovering" :props="props"
                @changeImage="handleChangeImage(src_canva)" />
            </v-hover>
          </v-sheet>
        </v-col>
        <!-- <v-btn variant="text" icon="mdi-chevron-down" @click="next"></v-btn> -->
      </v-card-actions>
      <!-- IMAGE-->
      <v-col cols="d-flex">
        <v-card class="mx-auto" max-width="600" elevation="0">
          <div>
            <GalleryImg :src_image="currentImage" />
          </div>
        </v-card>
      </v-col>
      <!--...-->
      <v-col cols="auto" order="12" class="">
        <v-card class="mx-auto pt-1 px-4 " width="300" elevation="0">
          <!-- DESCRIPTION PRODUCT -->
          <v-card-title class="color-title  pb-2 font-bold">{{
            ilustration.title
          }}</v-card-title>
          <v-card-subtitle class="pt-2 pb-2 color-subtitle text-h6 ">
            <div>{{ ilustration.text }}</div>
          </v-card-subtitle>
          <v-card-subtitle class="pt-2 pb-0  text-caption-2 text">
            <div class="text">{{ ilustration.subtext }}</div>
          </v-card-subtitle>
          <v-card-text class="pt-2 text-h7  color-price">
            <div>{{ ilustration.description }}</div>
          </v-card-text>
          <v-card-title class="text-h4 pt-2">
            <div class="color-picture">
              <h4 class="font-weight-light" elevation="0" v-if="checkboxEnmarcado == false">{{
                formatCurrency(ilustration.price) }}</h4>
              <h4 v-else>{{ formatCurrency(ilustration.priceMarco) }}</h4>
            </div>
            <v-card-text class="text-overline color-picture mt-2 pa-0">
              <div v-if="checkboxEnmarcado == false">(*Precio por unidad)</div>
                <v-fade-transition hide-on-leave>
                  <v-card elevation="0"
                    v-if="checkboxEnmarcado"
                    class="mx-auto">
                    <div class="color-picture">(*Precio por lámina + marco)</div>
                  </v-card>
                </v-fade-transition>
            </v-card-text>
            <div class="ps-1 color-title text-overline font-weight-bold pb-1 pt-3">Agregar Marco</div>
            
            <v-btn-toggle group>
              <v-btn color="septenary" variant="outlined" :outlined="!checkboxEnmarcado" @click="toggleCheckbox">
                $10.500
              </v-btn>
            </v-btn-toggle>

            <!-- <v-checkbox
              v-model="checkboxEnmarcado"
              label="agregar enmarcado"
            ></v-checkbox> -->
            <!-- <div>
                <v-checkbox
                  class="ps-1 color-title text-overline"
                  label="$38.500 Enmarcado"
                ></v-checkbox>
              </div> -->
          </v-card-title>
          <!-- COUNT -->
          <GalleryCounter :count="count" @add="incrementProduct" @remove="decrementProduct" />
          <!-- BOTTOM ADD CART-->
          <v-card-actions class="justify-center">
            <v-btn class="color-bg-cart px-6 mb-4 ml-1" variant="text" color="septenary"
              @click="addProduct(ilustration)">Agregar al Carrito</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- SNACKBAR V.MOBILE-->
    <GallerySnackBar @snackbarClosed="handleSnackbarClosed" v-model="snackbarVisible" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRoute } from "vue-router";
import GalleryImg from '../components/GalleryIlustrationsComp/GalleryImg.vue'
import GalleyCardSmall from '../components/GalleryIlustrationsComp/GalleryCardSmall.vue'
import GalleryCounter from '../components/GalleryIlustrationsComp/GalleryCounter.vue'
import GallerySnackBar from '../components/GalleryIlustrationsComp/GallerySnackBar.vue'


const route = useRoute();
const cartStore = useCartStore();

const ilustrationId = ref(route.params.id);
const ilustration = ref([]);

const count = ref(0)

//Manejo de imagene central en base a componente GalleryCardSmall

const src_image = ref(null);
const src_canva = ref(null);
const currentImage = ref(`/img/casa${ilustrationId.value}.jpg`);

const handleChangeImage = (newImage) => {
  currentImage.value = newImage
}

//snackbar
const snackbarVisible = ref(false)
function handleSnackbarClosed() {
  snackbarVisible.value = false;
}



// Button Enmarcado
const checkboxEnmarcado = ref(false)
const toggleCheckbox = () => {
  checkboxEnmarcado.value = !checkboxEnmarcado.value;
};



const incrementProduct = () => count.value++
const decrementProduct = () => (count.value > 0 ? count.value-- : null)

const addProduct = (item) => {
  if (count.value > 0) {
    let product = {
      id: item.id,
      title: item.title,
      image: item.image,
      count: count.value,
      withMarco: checkboxEnmarcado.value,
      price: checkboxEnmarcado.value ? item.priceMarco : item.price
    }
    cartStore.addProductCart(product);
    count.value = 0;
    snackbarVisible.value = true;
  }
}

// funcion que formatea los precios a moneda chilena 
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(value)
}

onMounted(() => {
  ilustration.value = cartStore.getIlustrationById(ilustrationId.value);

  src_image.value = `/img/casa${ilustrationId.value}.jpg`;
  src_canva.value = `/img/casa${ilustrationId.value}_canva.jpg`;

  // console.log(ilustration.value)
  // console.log(src_image.value)
});
</script>

<style scoped>
.font-bold {
  font-family: 'Homemade Apple', cursive;
  font-size: 1.6rem;
  color: #315467;
}

.v-btn-toggle--active {
  background-color: grey lighten-4 !important;
}

.color-bg-cart {
  background-color: #e3f26d;
}

.margin-lupa {
  margin-right: 4rem;
}

.text-caption-2 {
  font-size: 0.98rem;
}

.color-subtitle {
  color: #315467;
}

.color-price {
  color: #8AA49B;
}

.color-picture {
  color: #315467;
}

.text-center-cantidad {
  text-align: center;
}

.text-field {
  color: #000;
  font-weight: 400;
  font-style: normal;
  border: 1px solid #315467;

}

.color-count {
  color: #315467;
}

.precio-unidad {
  font-size: 0.8rem;
}
.btn-outlined{
  border:#315467;
}
</style>
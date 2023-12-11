<template>
  <v-container>
    <v-row d-flex>
      <!--CARRUSEL MODO MOBILE-->
      <v-col cols="auto" class="d-md-none">
        <CarruselGalleryMobile :image_src="src_image" :image_canva="src_canva"/>
      </v-col>
      <!--IMAGENES PEQUEÑAS MODO DESKTOP-->
      <v-col class="d-none d-md-flex" cols="auto" md="2">
        <v-card-actions class="d-flex align-center flex-column" height="200">
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
        </v-card-actions>
      </v-col>
      <!--IMAGEN PRINCIPAL MODO DESKTOP-->
      <v-col class="d-none d-md-flex" cols="12" md="6">
        <GalleryImg :src_image="currentImage" />
      </v-col>
      <!--...-->
      <v-col cols="auto" order="12">
        <v-card class="mx-auto pt-1 px-4 " width="300" elevation="0">
          <!-- DESCRIPTION PRODUCT -->
          <CardDetails :details="ilustration"/>
          <!--DETALLES DEL PRECIO-->
          <PriceDetail
            :checkboxEnmarcado="checkboxEnmarcado" :formatCurrency="formatCurrency"
            :price="ilustration.price" :priceMarco="ilustration.priceMarco" @toggleCheckbox="toggleCheckbox"/>
          <!-- COUNT -->
          <GalleryCounter :count="count" @add="incrementProduct" @remove="decrementProduct" />
          <!-- BOTTOM ADD CART-->
          <AddCartButton @addProduct="addProduct" :ilustration="ilustration"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted} from "vue";
import { useCartStore } from "@/stores/cart";
import { useRoute } from "vue-router";
import { formatCurrency } from '../components/GalleryIlustrationsComp/base/FormatCurrency.js'
import Swal from 'sweetalert2'

import GalleryImg from '../components/GalleryIlustrationsComp/IsDesktop/GalleryImg.vue'
import GalleyCardSmall from '../components/GalleryIlustrationsComp/IsDesktop/GalleryCardSmall.vue'
import GalleryCounter from '../components/GalleryIlustrationsComp/GalleryCounter.vue'
import CarruselGalleryMobile from '../components/GalleryIlustrationsComp/IsMobile/CarruselGalleryMobile.vue'
import CardDetails from '../components/GalleryIlustrationsComp/GalleryDetails/CardDetails.vue'
import PriceDetail from '../components/GalleryIlustrationsComp/GalleryDetails/PriceDetails.vue'
import AddCartButton from '../components/GalleryIlustrationsComp/GalleryDetails/AddCartButton.vue'


const route = useRoute();
const cartStore = useCartStore();

const ilustrationId = ref(route.params.id);
const ilustration = ref([]);

const count = ref(0)

//Manejo de las imagenes para los componentes 

// const src_image = require(`@/assets/img/casa${ilustrationId.value}.jpg`);
// const src_canva = require(`@/assets/img/casa${ilustrationId.value}_canva.jpg`);
const src_image = ref([])
const src_canva = ref([])
const currentImage = ref(`/img/casa${ilustrationId.value}.jpg`);

const handleChangeImage = (newImage) => {
  currentImage.value = newImage
}

// const imageCarrusel = ref([
//   {
//     url: src_image,
//     alt: 'Ilustracion uno'
//   },
//   {
//     url: src_canva,
//     alt: 'Ilustracion dos'
//   },
// ])

// Button Enmarcado
const checkboxEnmarcado = ref(false)
const toggleCheckbox = () => {
  checkboxEnmarcado.value = !checkboxEnmarcado.value;
};


//Count Cart
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
    Swal.fire({
      title: "Producto agregado con exito",
      //text:"",
      icon: 'success',
      iconColor: 'greenlight',
      confirmButtonColor: 'green',
      confirmButtonText: 'Entendido',
      timer: 2000,
      timerProgressBar: true,
      //toast: true
    })
  }
}

onMounted(() => {
  ilustration.value = cartStore.getIlustrationById(ilustrationId.value);

  src_image.value = `/img/casa${ilustrationId.value}.jpg`;
  src_canva.value = `/img/casa${ilustrationId.value}_canva.jpg`;
});
</script>

<style scoped>
/* .font-bold {
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

.btn-outlined {
  border: #315467;
} */
</style>
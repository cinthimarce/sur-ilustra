<template>
  <v-container>
    <v-row d-flex align-center>
      <!-- SMALL IMAGE-->
      <v-card-actions class="d-flex align-center flex-column " height="200">
        <!-- <v-btn variant="plain" icon="mdi-chevron-up" @click="prev"></v-btn> -->
          <v-col cols="auto" class="pa-10">
            <v-sheet :height="130" :width="130">
              <v-hover v-slot="{ isHovering, props }">
                <v-card elevation="0" v-bind="props">
                  <v-img cover :src="src_image" class="border"></v-img>
                  <v-overlay :model-value="isHovering" contained scrim="#036358" class="align-center justify-center">
                    <v-btn icon="mdi-eye-outline" variant="text" color="nonary"></v-btn>
                  </v-overlay>
                </v-card>
              </v-hover>
            </v-sheet>
            <v-sheet :height="130" :width="130">
              <v-hover v-slot="{ isHovering, props }">
                <v-card elevation="0" v-bind="props">
                  <v-img cover :src="src_image_canva" class="border"></v-img>
                  <v-overlay :model-value="isHovering" contained scrim="#036358" class="align-center justify-center">
                    <v-btn icon="mdi-eye-outline" variant="text" color="nonary"></v-btn>
                  </v-overlay>
                </v-card>
              </v-hover>
            </v-sheet>
          </v-col>
        <!-- <v-btn variant="text" icon="mdi-chevron-down" @click="next"></v-btn> -->
      </v-card-actions>    
      <!-- IMAGE-->
      <v-col cols="d-flex">
        <v-card class="mx-auto" max-width="600" elevation="0">
            <v-img class="d-flex align-end " :src="src_image" cover content>
              <div class="d-flex justify-end margin-lupa mb-2 ml-1">
                <v-avatar>
                  <v-btn icon="mdi-magnify-plus-outline" variant="plain"></v-btn>
                </v-avatar>
              </div>
              <div class="text-center">
            <!-- SNACKBAR V.MOBILE-->    
            <v-snackbar v-model="snackbar" :timeout="timeout" color="primary">
              {{ text }}
              <template v-slot:actions>
                <v-btn color="blue" variant="text" @click="snackbar = false" icon="mdi-close">
                </v-btn>
              </template>
            </v-snackbar>
          </div>
            </v-img>
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
              <h4 class="font-weight-light" elevation="0" v-if="checkboxEnmarcado == false">{{ formatCurrency(ilustration.price)  }}</h4>
              <h4 v-else>{{ formatCurrency(ilustration.priceMarco) }}</h4>
            </div>
            <v-card-text class="text-overline color-picture mt-2 pa-0">
              <div >(*Precio por unidad)</div>
            </v-card-text>
            <div class="ps-1 color-title text-overline font-weight-bold pb-1 pt-3">Agregar Marco</div>
            <v-btn-toggle
              v-model="text"
              color="deep-purple-accent-3"
              group> 
              <v-btn value="Producto agregado al carrito con éxito" variant="outlined" class="mr-2"> $ 10.500 </v-btn>
            </v-btn-toggle>

            <!-- <v-btn variant="outlined" class="mr-2 ">
              $ 10.500
            </v-btn> -->

            <v-checkbox
              v-model="checkboxEnmarcado"
              label="agregar enmarcado"
            ></v-checkbox>
            <!-- <div>
                <v-checkbox
                  class="ps-1 color-title text-overline"
                  label="$38.500 Enmarcado"
                ></v-checkbox>
              </div> -->
          </v-card-title>
          <!-- COUNT -->
          <v-card class="mx-auto pt-6 px-4 d-flex py-6 ml-7" width="200" elevation="0">
            <v-btn @click="decrementProduct" color="septenary" icon="mdi-minus" round elevation="0"></v-btn>
            <div class="text-field d-flex align-center mx-4" elevation="0">
              <h3 class="px-4 color-count" elevation="0">{{ count }}</h3>
            </div>
            <v-btn @click="incrementProduct" color="septenary" icon="mdi-plus" elevation="0" round></v-btn>
          </v-card>
          <!-- BOTTOM ADD CART-->
          <v-card-actions class="justify-center">
            <v-btn class="color-bg-cart px-6 mb-4 ml-1" variant="text" color="septenary"
              @click="addProduct(ilustration)">Agregar al Carrito</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRoute } from "vue-router";

const route = useRoute();
const cartStore = useCartStore();

const ilustrationId = ref(route.params.id);
const ilustration = ref([]);
const src_image = ref(null);
const count = ref(0)

//snackbar
const snackbar = ref(false)
const timeout = 3500
const text = 'Producto agregado al carrito con éxito'

// checkboxEnmarcado
const checkboxEnmarcado = ref(false)

const incrementProduct = () => count.value++
const decrementProduct = () => (count.value > 0 ? count.value-- : null)

const addProduct = (item) => {
  if (count.value > 0) {
    let product ={
      id: item.id,
      title: item.title,
      image: item.image,
      count: count.value,
      withMarco: checkboxEnmarcado.value,
      price: checkboxEnmarcado.value ? item.priceMarco : item.price
    }
    cartStore.addProductCart(product);
    count.value = 0;
    snackbar.value = true;
  }
}

// funcion que formatea los precios a moneda chilena 
const formatCurrency = (value) =>{
  return new Intl.NumberFormat('es-CL',{
    style: 'currency',
    currency: 'CLP',
  }).format(value)
}

onMounted(() => {
  ilustration.value = cartStore.getIlustrationById(ilustrationId.value);

  src_image.value = `/img/casa${ilustrationId.value}.jpg`;

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
.color-count{
  color: #315467;
}
.precio-unidad{
  font-size: 0.8rem;
}
</style>
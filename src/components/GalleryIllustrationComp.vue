<template>
  <v-container>
  <v-row d-flex align-center>
  <!-- SMALL IMAGE-->
    <v-col cols="auto" class="pa-10">
      <v-sheet :height="130" :width="130">
        <v-hover v-slot="{ isHovering, props }">
          <v-card elevation="0" v-bind="props">
              <v-img cover :src="src_image" class="border"></v-img>
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center">
                <v-btn icon="mdi-magnify" variant="text" color="nonary"></v-btn>
              </v-overlay>
          </v-card>
        </v-hover>
      </v-sheet>
      <v-sheet :height="130" :width="130">
        <v-hover v-slot="{ isHovering, props }">
          <v-card elevation="0" v-bind="props">
              <v-img cover :src="src_image" class="border"></v-img>
              <v-overlay
                :model-value="isHovering"
                contained
                scrim="#036358"
                class="align-center justify-center">
                <v-btn icon="mdi-magnify" variant="text" color="nonary"></v-btn>
              </v-overlay>
          </v-card>
        </v-hover>
      </v-sheet>
    </v-col>
    <!-- IMAGE-->
    <v-col cols="d-flex">
      <v-card class="mx-auto" max-width="600" elevation="0">
        <v-card-actions class="justify-space-between">
          <!-- <v-btn variant="plain" icon="mdi-chevron-left" @click="prev"></v-btn> -->
          <v-img class="" :src="src_image" cover content></v-img>
          <v-btn variant="text" icon="mdi-chevron-right" @click="next"></v-btn>
        </v-card-actions>
      </v-card>
      <!-- LUPA-->
      <div class="d-flex justify-end margin-lupa" >
        <v-avatar>
          <v-btn icon="mdi-magnify" variant="plain"></v-btn>
        </v-avatar>
      </div>
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
        <v-card-title class="text-h4 font-weight-medium pt-2 pb-1">
          <div class="color-picture">$28.000<!-- {{ ilustration.price }} --></div>
          <div class="ps-1 color-title text-overline text-big font-weight-bold pb-1 pt-3">Enmarcado</div>
              <v-btn  variant="outlined" class="mr-2 ">
                $ 38.500
              </v-btn>
              <v-btn variant="outlined">
                SIN MARCO
              </v-btn>
              <!-- <div>
                <v-checkbox
                  class="ps-1 color-title text-overline"
                  label="$38.500 Enmarcado"
                ></v-checkbox>
              </div> -->
        </v-card-title> 
        <!-- COUNT -->
        <v-card class="mx-auto pt-6 px-4 text-center p" width="300" elevation="0">
          <v-text-field class="text-center-cantidad" label="Cantidad" variant="outlined">
            <template v-slot:append>
              <v-btn color="septenary" icon="mdi-plus" round></v-btn>
            </template>
            <template v-slot:prepend>
              <v-btn color="septenary" icon="mdi-minus" round></v-btn>
            </template>
          </v-text-field>
        </v-card>
        <!-- BOTTOM ADD CART-->
        <v-card-actions class="justify-center">
          <v-btn
            class="color-bg-cart px-6 mb-4"
            variant="text"
            color="septenary"
            >Agregar al Carrito</v-btn>
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

onMounted(() => {
  ilustration.value = cartStore.getIlustrationById(ilustrationId.value);

  src_image.value = `/img/casa${ilustrationId.value}.jpg`;

  // console.log(ilustration.value)
  // console.log(src_image.value)
});
</script>

<style scoped>
.font-bold{
  font-family: 'Homemade Apple', cursive;
  font-size: 1.6rem;
  color: #315467;
}
.color-bg-cart {
  background-color: #e3f26d;
}
.margin-lupa{
  margin-right: 4rem;
}
.text-caption-2{
  font-size: 1rem;
}
.color-subtitle{
  color: #315467;
}
.color-price{
  color: #8AA49B;
}
.text-big{
  font-size: 1.5rem;
}
.color-picture{
  color: #315467; 
}
.text-center-cantidad{
  text-align: center;
}
</style>
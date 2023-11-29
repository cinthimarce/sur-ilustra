<template>
  <v-row>
    <v-col cols="auto">
      <v-card class="overflow-auto" elevation="0" width="284">
        <v-img class="align-end" :src="src_image"  cover content></v-img>
      </v-card>
    </v-col>

    <v-col cols="auto">
      <v-card class="overflow-auto" width="284" elevation="0">
        <v-card-title class="color-title text-bold pb-0">{{
          ilustration.title
        }}</v-card-title>
        <v-card-subtitle class="pt-0 pb-1 color-subtitle text-overline">
            <div>{{ ilustration.text }}</div>          
        </v-card-subtitle>
        <v-card-subtitle class="pt-0 pb-0 color-subtitle  text-subtitle-1">
            <div>{{ ilustration.subtext }}</div>          
        </v-card-subtitle>
        <v-card-text class="pt-1 text-caption color-price">
          <div>{{ ilustration.description }}</div>
        </v-card-text>
        <v-card-title class="pt-0 color-price text-h6 font-weight-bold">
          <div>Print ${{ ilustration.price }}</div> 
          <div><v-checkbox class="ps-1 color-price" label="$38500 Enmarcado"></v-checkbox></div>
        </v-card-title>
        
      </v-card>
    </v-col>    
  </v-row> 
  <!-- COUNT-->
  <v-row>
    <v-col>
      <v-card class="mx-auto pt-1 px-4" width="300" elevation="0">
        <v-text-field label="Cantidad" variant="outlined">
          <template v-slot:append>
            <v-btn color="septenary" icon="mdi-plus" round></v-btn>
          </template>
          <template v-slot:prepend>
            <v-btn color="septenary" icon="mdi-minus" round></v-btn>
          </template>
        </v-text-field>
        <!-- <v-checkbox class="ps-10" label="Con Marco"></v-checkbox> -->
      </v-card>
      <v-card-actions class="justify-center">
              <v-btn class="color-bg-cart px-6 mb-4" variant="text" color="septenary"
                >Agregar al Carrito</v-btn 
              >
            </v-card-actions>
    </v-col>
    
  </v-row>
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
.color-bg-cart{
  background-color: #E3F26D;
}
</style>
<template>
  <v-row>
    <v-col cols="auto">
      <v-card class="overflow-auto" elevation="0" width="284">
        <v-img class="align-end" :src="ilustraciones.image" cover content>
        </v-img>
      </v-card>
    </v-col>

    <v-col cols="auto" >
      <v-card class="overflow-auto" width="284" elevation="0">
        <v-card-title class="color-title text-bold pb-0">{{
          ilustraciones.title
        }}</v-card-title>
        <v-card-subtitle class="pt-0 pb-1 color-subtitle text-overline">
            <div>{{ ilustraciones.text }}</div>          
        </v-card-subtitle>
        <v-card-subtitle class="pt-0 pb-0 color-subtitle  text-subtitle-1">
            <div>{{ ilustraciones.subtext }}</div>          
        </v-card-subtitle>
        <v-card-text class="pt-1 text-caption color-price">
          <div>{{ ilustraciones.description }}</div>
        </v-card-text>
        <v-card-title class="pt-0 color-price text-h6 font-weight-bold">
          <div>Print ${{ ilustraciones.price }}</div> 
          <div><v-checkbox class="ps-1 color-price" label="$38500 Enmarcado"></v-checkbox></div>
        </v-card-title>
        
      </v-card>
      
      
<!--       <v-card class="mx-auto pt-5 px-4" width="220px" elevation="0">
        <v-text-field label="Cantidad" variant="outlined">
          <template v-slot:append>
            <v-icon color="septenary"> mdi-plus </v-icon>
          </template>
          <template v-slot:prepend>
            <v-icon color="septenary"> mdi-minus </v-icon>
          </template>
        </v-text-field>
        <v-checkbox class="ps-6 " label="Con Marco"></v-checkbox>
      </v-card> -->
    </v-col>
  </v-row>

  <!-- COUNT-->
  <v-row>
    <v-col>
      <v-card class="mx-auto pt-1 px-4" width="250px" elevation="0">
        <v-text-field label="Cantidad" variant="outlined">
          <template v-slot:append>
            <v-btn color="septeary" icon="mdi-plus" round></v-btn>
          </template>
          <template v-slot:prepend>
            <v-btn color="septeary" icon="mdi-minus" round></v-btn>
          </template>
        </v-text-field>
        <!-- <v-checkbox class="ps-10" label="Con Marco"></v-checkbox> -->
      </v-card>
    </v-col>
  </v-row>

  <v-card-text class="text-center">
        <a
          class="color-price text-decoration-none"
          href="#"
          rel="noopener noreferrer"
          target="_blank">
          Ver más detalles del producto <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    
</template>
   
  <script>
export default {
  props: {
    ilustraciones: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.color-title {
  color: #315467;
}
.color-subtitle {
  color: #315467;
}
.color-price {
  color: #8aa49b;
}
</style>


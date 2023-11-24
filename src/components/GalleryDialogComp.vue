<template>
  <v-card class="mx-auto" width="600" color="deep-purple-darken-2">
    <v-img
      class="align-end text-white"
      height="400"
      :src="ilustraciones.image"
      cover
      content
    >
    </v-img>
    <v-card-title class="text-black text-bold">{{
      ilustraciones.title
    }}</v-card-title>
    <v-card-subtitle class="pt-4">
      <strong>${{ ilustraciones.price }}</strong>
    </v-card-subtitle>

    <v-card-text>
      <div>{{ ilustraciones.description }}</div>
    </v-card-text>
  </v-card>
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
<template>
    
    <v-card
      class="mx-auto"
      max-width="434"
      rounded="10"
    >
      <v-img
        
        height="100%"
        cover
        src="../assets/banner/canvas2.png"
      >
        <v-avatar
          color="grey"
          size="150"
          rounded="0"
        >
          <v-img cover src="../assets/banner/logohv.jpeg"></v-img>
        </v-avatar>
        <v-list-item
          class="text-white"
          title="Humberto Vera"
          subtitle="Creador de Enmarcaciones Aysén"
        ></v-list-item>
      </v-img>
    </v-card>
    
    <v-card 
    class="mx-auto"
    max-width="434"
    :text="description"></v-card>
    
</template>

<script setup>
    
import {} from 'vue'
const description =
 "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    
</script>

<style scoped>
    
</style>
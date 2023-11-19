<template>
  <v-container class="pa-4 text-center">
    <v-row class="fill-height" align="center" justify="center">
      <template v-for="item in propsImg.galleryData" :key="item.id">
        <v-col cols="12" md="4">
          <v-hover v-slot="{ isHovering, props }">
            <v-card
              :elevation="isHovering ? 12 : 2"
              :class="{ 'on-hover': isHovering }"
              v-bind="props"
            >
              <v-img :src="item.image" height="400px" cover>
                <div class="align-self-center">
                  <v-card-title
                    class="text-h6 text-transparent d-flex flex-column align-center"
                    :class="{ 'show-btns': isHovering }"
                    :color="transparent"
                  >
                    <!-- <p class="mt-4">
                      {{ item.title }}
                    </p> -->
                    <div >
                      <p class="mt-4 ma-0 text-body-1 font-weight-bold">
                        {{ item.text }}
                      </p>
                      <p class="text-caption font-weight-medium">
                        {{ item.subtext }}
                      </p>
                    </div>
                  </v-card-title>
                </div>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
 
<script setup>
import { defineProps } from "vue";

const propsImg = defineProps(["galleryData"]);
const transparent = "rgba(255, 255, 255, 0)";
</script>
 
<style scoped>
.v-card {
  transition: opacity 0.3s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: #315467 !important;
  text-shadow: 2px 2px 4px rgb(125, 124, 124);
}
</style>
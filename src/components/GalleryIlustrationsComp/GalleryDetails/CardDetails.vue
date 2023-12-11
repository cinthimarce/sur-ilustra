<template>
    <div>
        <v-card-title class="color-title  pb-2 font-bold">{{ props.details.title }}</v-card-title>
        <v-card-subtitle class="pt-2 pb-2 color-subtitle text-h6 ">
            <div>{{ props.details.text }}</div>
        </v-card-subtitle>
        <v-card-subtitle class="pt-2 pb-0  text-caption-2 text">
            <div class="text">{{ props.details.subtext}}</div>
        </v-card-subtitle>
        <v-card-text class="pt-2 text-h7  color-price">
            <div>{{ props.details.description }}</div>
        </v-card-text>
    </div>
</template>

<script setup>

import { defineProps } from 'vue'

const props = defineProps(['details'])

</script>

<style scoped>
.font-bold {
  font-family: 'Homemade Apple', cursive;
  font-size: 1.6rem;
  color: #315467;
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
</style>
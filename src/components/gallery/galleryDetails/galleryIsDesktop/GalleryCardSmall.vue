<template >
    <v-card elevation="0" v-bind="props.props">
        <v-img cover :aspect-ratio="4/3" :src="props.src_image" class="border"></v-img>
        <v-overlay :model-value="props.isHovering" contained scrim="#036358" class="align-center justify-center"
            @click="changeImage">
        </v-overlay>
    </v-card>
</template>

<script setup>

import { defineProps, defineEmits } from 'vue'
const props = defineProps(['src_image', 'isHovering', 'props'])


const emit = defineEmits(['changeImage'])

function changeImage() {
    emit('changeImage', props.src_image)
}

</script>

<style scoped></style>
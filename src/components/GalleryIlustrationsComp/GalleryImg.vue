<template>
    <v-img class="d-flex align-end " :src="src_image" cover content>
        <div class="d-flex justify-end margin-lupa mb-2 ml-1">
            <v-avatar>
                <v-btn icon="mdi-magnify-plus-outline" variant="plain"></v-btn>
            </v-avatar>
        </div>
    </v-img>
</template>

<script setup>

import { defineProps } from 'vue'
defineProps({
    src_image: String,
})

</script>

<style scoped></style>
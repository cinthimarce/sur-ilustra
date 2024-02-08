<script setup>
    
import { defineProps } from 'vue';
// Reactive Values

defineProps({
    message: String,
    color: String,
    snackbar: Boolean,
    icon: String
})
    

    // Computed Properties

    // Watchers

    // Lifecycle hooks

</script>

<template>
    <v-snackbar :model-value="snackbar" :color="color" multi-line timeout="2000" class="snackbar-text">
        <v-icon :icon="icon"></v-icon>
        {{ message }}
    </v-snackbar>
</template>

<style scoped>
.snackbar-text {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
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
    <v-snackbar :model-value="snackbar" :color="color" multi-line timeout="3000">
        <div class="snackbar-text">
            <v-icon :icon="icon" size="32"></v-icon>
            <h1 class="snack-title">{{ message }}</h1>
        </div>
    </v-snackbar>
</template>

<style scoped>
.snackbar-text {
    display: flex;
    justify-content: center;
    align-items: center;
}
.snack-title{
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    font-weight: 700;
}
</style>
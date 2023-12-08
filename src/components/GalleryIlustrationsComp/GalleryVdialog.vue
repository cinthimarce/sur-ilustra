<template>
    <div class="text-center">
        <v-dialog :v-model="dialog" width="auto">
            <v-card>
                <v-img :src="imageModel"></v-img>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>

import { defineProps } from 'vue'

defineProps('imageModel','dialog')

</script>

<style scoped></style>
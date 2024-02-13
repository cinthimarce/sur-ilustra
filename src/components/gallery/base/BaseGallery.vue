<template>
        <v-row class="fill-height" align="center" justify="center">
            <template v-for="producto in productos" :key="producto.id">
                <v-col cols="12" md="4">
                    <v-hover v-slot="{ isHovering, props }">
                        <v-card :elevation="isHovering ? 12 : 2" :class="{ 'on-hover': isHovering }" v-bind="props"
                            class="transparent">
                            <v-img :src="producto.imagen1" height="310px" cover @click="redirectTo(producto.nombre)">
                                <div class="align-self-center">
                                    <v-card-title class="text-h6 text-transparent d-flex flex-column align-center"
                                        :class="{ 'show-btns': isHovering }" :color="transparent">
                                    </v-card-title>
                                </div>

                                <v-expand-transition>
                                    <v-btn v-if="isHovering"
                                        class="d-flex transition-fast-in-fast-out color-primary v-card--reveal text-h9"
                                        :class="{ isHovering }" style="height: 10%">
                                        <v-text class="text-overline">Ver Detalle</v-text>
                                    </v-btn>
                                </v-expand-transition>
                            </v-img>
                            <v-card-text>
                                <p class="font-weight-light text-septenary text-h6 ma-0">
                                    {{ producto.nombre }}
                                </p>
                                <p class="font-weight-medium text-grey subtext-card">
                                    {{ producto.subtitulo }}
                                </p>
                            </v-card-text>

                            <v-divider color="info"></v-divider>

                            <v-sheet class="d-flex justify-center mb-4 pt-4">
                                <v-sheet class="pl-5 text-h5 font-weight-bold text-septenary">{{
                                    formatCurrency(producto.precio)
                                }}</v-sheet>
                            </v-sheet>
                        </v-card>
                    </v-hover>
                </v-col>
            </template>
        </v-row>
</template>

<script setup>
import { defineProps,defineEmits } from 'vue'
import { formatCurrency } from "./FormatCurrent.js"
// import { useRouter } from 'vue-router';


// const route = useRouter()
const transparent = "rgba(255, 255, 255, 0)";

defineProps({
    productos: Object,
})

const emit = defineEmits('redirectTo')


const redirectTo = (title,id) => {
  emit('redirectTo', title ,id);
};

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@100;300&display=swap;wght@500");

.transparent {
    transition: opacity 0.3s ease-in-out;
}

.transparent:not(.on-hover) {
    opacity: 0.75;
}

.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.9;
    position: absolute;
    width: 100%;
}

.show-btns {
    color: #315467 !important;
    text-shadow: 2px 2px 4px rgb(125, 124, 124);
}

.color-primary {
    background-color: #e3f26d;
    color: #556560;
    font-family: "Raleway", sans-serif;
    opacity: 0.8;
}

.text-septenary {
    color: #315467;
}

.text-grey {
    color: #1d1d1d;
}

.color-bg-cart {
    background-color: #e3f26d;
    color: #315467;
    border-bottom: none;
}

.subtext-card {
    font-size: 0.85rem;
}
</style>
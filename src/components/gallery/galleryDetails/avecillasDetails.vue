<script setup>
import { useGaleriaStore } from '@/stores/galeria';
import { useRoute } from 'vue-router';
//import { useCartStore } from '@/stores/cart';
import { ref, onBeforeMount, onMounted } from 'vue'
// import { formatCurrency } from "../base/FormatCurrent";
// import Swal from 'sweetalert2'

//Importando Componentes
import BreadcrumbsComp from "../base/BreadcrumbsComp.vue";
import CarruselGalleryMobile from "./galleryIsMobile/CarruselGalleryMobile.vue";
import GalleryImg from './galleryIsDesktop/GalleryImg.vue';
import GalleryCardSmall from './galleryIsDesktop/GalleryCardSmall.vue';
import CardDetails from './galleryComp/CardDetails.vue';

// Reactive Values
const galeriaStore = useGaleriaStore()
const avecillas = ref([])
const route = useRoute()
const nameAvecilla = route.params.nombre
const imagen1 = ref('')
const imagen2 = ref('')
const currentImage = ref('')

const handleChangeImage = (newImage) => {
    currentImage.value = newImage
}

//Manejo de imagenes


//Imagenes carousel


// Computed Properties

// Watchers

// RUTAS DE BREADCRUMBS
const rutas = [
    {
        title: 'Inicio',
        disabled: false,
        to: '/'
    },
    {
        title: 'Avecillas',
        disabled: false,
        to: '/avecillas'
    },
    {
        title: nameAvecilla,
        disabled: true
    }
]
// Lifecycle hooks
onMounted(() => {
    imagen1.value = avecillas.value.imagen1;
    imagen2.value = avecillas.value.imagen2;
    currentImage.value = avecillas.value.imagen1;
    console.log(imagen1.value)
    console.log(imagen2.value)
})
onBeforeMount(() => {
    avecillas.value = galeriaStore.getAvecillasByTitle(nameAvecilla)
})
</script>

<template>
    <v-container>
        <BreadcrumbsComp :rutas="rutas" />
        <v-row d-flex>
            <!-- CARRUSEL MODO MOBILE -->
            <v-col cols=12 class="d-md-none">
                <CarruselGalleryMobile :image-carousel="avecillas" />
            </v-col>
            <!--IMAGENES PEQUEÑAS MODO DESKTOP-->
            <v-col class="d-none d-md-flex" md=2>
                <v-card-actions class="d-flex align-center flex-column" height="200">
                    <v-col cols="auto" class="pa-10">
                        <v-sheet :height="130" :width="130">
                            <v-hover v-slot="{ isHovering, props }">
                                <GalleryCardSmall :is-hovering="isHovering" :props="props" :src_image="imagen1"
                                    @change-image="handleChangeImage" />
                            </v-hover>
                        </v-sheet>
                        <v-sheet :height="130" :width="130">
                            <v-hover v-slot="{ isHovering, props }">
                                <GalleryCardSmall :is-hovering="isHovering" :props="props" :src_image="imagen2"
                                    @change-image="handleChangeImage" />
                            </v-hover>
                        </v-sheet>
                    </v-col>
                </v-card-actions>
            </v-col>
            <!--IMAGEN PRINCIPAL MODO DESKTOP-->
            <v-col class="d-none d-md-flex" cols="auto" md=6>
                <GalleryImg :src_image="currentImage" />
            </v-col>
            <!--CARD DETALLES PRODUCTOS-->
            <v-col cols="auto" order=12>
                <v-card class="mx-auto pt-1 px-4" width="300" elevation=0>
                    <!-- DESCRIPCIÓN DEL PRODUCTO -->
                    <CardDetails :details="avecillas"/>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped></style>
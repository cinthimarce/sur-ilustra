<template>
    <v-container>
        <BreadcrumbsComp :rutas="rutas" />
        <v-row d-flex>
            <!-- CARRUSEL MODO MOBILE -->
            <v-col cols=12 class="d-md-none">
                <CarruselGalleryMobile :image-carousel="imageCarousel" />
            </v-col>
            <!--IMAGENES PEQUEÑAS MODO DESKTOP-->
            <v-col class="d-none d-md-flex" md=2>
                <v-card-actions class="d-flex align-center flex-column" height="200">
                    <v-col cols="auto" class="pa-10">
                        <v-sheet :height="130" :width="130">
                            <v-hover v-slot="{ isHovering, props }">
                                <GalleryCardSmall :is-hovering="isHovering" :props="props" :src_image="src_image"
                                    @change-image="handleChangeImage" />
                            </v-hover>
                        </v-sheet>
                        <v-sheet :height="130" :width="130">
                            <v-hover v-slot="{ isHovering, props }">
                                <GalleryCardSmall :is-hovering="isHovering" :props="props" :src_image="src_canva"
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
                    <CardDetails :details="ilustration" />
                    <!--DETALLES DEL PRECIO-->
                    <PriceDetails :descripcion-precio="descripcionPrecio" :marco-agregado="marcoAgregado" @toggle-marco="toggleMarco" :precio-mostrado="precioMostrado" :format-currency="formatCurrency"/>
                    <!--PRODUCT COUNTER-->
                    <ProductCounter :count="countProduct" @add="incrementProduct" @remove="decrementProduct" />
                    <!-- BOTTOM ADD CART-->
                    <AddCartButton @add-product="addProduct" :ilustration="ilustration" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useRoute } from "vue-router"
import { ref, onMounted, computed } from 'vue'
import { useCartStore } from "@/stores/cart";
import { useGalleryStore } from "@/stores/gallery";
import { formatCurrency } from "../base/FormatCurrent";
import Swal from 'sweetalert2'

//importando componentes 
import CarruselGalleryMobile from "./galleryIsMobile/CarruselGalleryMobile.vue";
import GalleryImg from "./galleryIsDesktop/GalleryImg.vue";
import CardDetails from "@/components/gallery/galleryDetails/galleryComp/CardDetails.vue";
import PriceDetails from "@/components/gallery/galleryDetails/galleryComp/PriceDetails.vue";
import ProductCounter from "./galleryComp/ProductCounter.vue";
import AddCartButton from "@/components/gallery/galleryDetails/galleryComp/AddCartButton.vue";
import BreadcrumbsComp from "../base/BreadcrumbsComp.vue";
import GalleryCardSmall from "./galleryIsDesktop/GalleryCardSmall.vue";


const route = useRoute()
const nameIlustration = route.params.title
const ilustrationId = route.params.id
const cartStore = useCartStore()
const galleryStore = useGalleryStore()
const ilustration = ref([])


//MANEJO DE IMAGENES
const src_image = ref(require(`@/assets/img/casa${ilustrationId}.jpg`))
const src_canva = ref(require(`@/assets/img/casa${ilustrationId}_canva.jpg`))
const currentImage = ref(require(`@/assets/img/casa${ilustrationId}.jpg`))

const handleChangeImage = (newImage) => {
    currentImage.value = newImage
}

//carousel images Mobile
const imageCarousel = [
    {
        url: require(`@/assets/img/casa${ilustrationId}.jpg`),
        alt: 'imagen de ilustración uno'
    },
    {
        url: require(`@/assets/img/casa${ilustrationId}_canva.jpg`),
        alt: 'imagen de ilustración uno'
    }
]

//toogleButtons
const marcoAgregado = ref(false)
const toggleMarco = () => {
    marcoAgregado.value = !marcoAgregado.value

}
const precioMostrado = computed(() => {
    const opciones = ilustration.value?.opciones;
    if (opciones && opciones.length >= 2) {
        return marcoAgregado.value ? opciones[1].price : opciones[0].price;
    }
    return 0;
});
const descripcionPrecio = computed(() => {
    return marcoAgregado.value && ilustration.value?.opciones ? '(*Precio por lámina + marco)' : '(*Precio por unidad)';
});
//Contador de productos
const countProduct = ref(0)
const incrementProduct = () => countProduct.value++
const decrementProduct = () => (countProduct.value > 0 ? countProduct.value-- : null)

const addProduct = (item) => {
    if (countProduct.value > 0) {
        const price = marcoAgregado.value ? item.opciones[1].price : item.opciones[0].price
        let product = {
            id: item.id,
            title: item.title,
            image: item.image,
            quantity: countProduct.value,
            withFrame: marcoAgregado.value,
            price: price
        }
        cartStore.addProductToCart(product);
        countProduct.value = 0;
        Swal.fire({
            title: "Producto agregado con exito",
            //text:"",
            icon: 'success',
            iconColor: 'greenlight',
            confirmButtonColor: 'green',
            confirmButtonText: 'Entendido',
            timer: 1500,
            timerProgressBar: true,
            //toast: true
        })
    }
}

// RUTAS DE BREADCRUMBS
const rutas = [
    {
        title: 'Inicio',
        disabled: false,
        to: '/'
    },
    {
        title: 'Ilustraciones',
        disabled: false,
        to: '/ilustration'
    },
    {
        title: nameIlustration,
        disabled: true
    }
]



onMounted(() => {
    ilustration.value = galleryStore.getIlustrationByTitle(nameIlustration)
    console.log(ilustrationId);
    console.log(nameIlustration);
    console.log(ilustration.value);
})
</script>

<style scoped></style>
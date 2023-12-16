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
                    <PriceDetails :checkboxEnmarcado="checkboxEnmarcado" :formatCurrency="formatCurrency"
                        :price="ilustration.price" :priceMarco="ilustration.priceMarco" @toggleCheckbox="toggleCheckbox" />
                    <!--PRODUCT COUNTER-->
                    <ProductCounter :count="count" @add="incrementProduct" @remove="decrementProduct" />
                    <!-- BOTTOM ADD CART-->
                    <AddCartButton @add-product="addProduct" :ilustration="ilustration" />
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useRoute } from "vue-router"
import { ref, onMounted } from 'vue'
import { useCartStore } from "@/stores/cart";
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
const ilustrationId = ref(route.params.id)
//const nameIlustration = ref(route.params.title)

const count = ref(0)

//MANEJO DE IMAGENES
const src_image = ref(require(`@/assets/img/casa${ilustrationId.value}.jpg`))
const src_canva = ref(require(`@/assets/img/casa${ilustrationId.value}_canva.jpg`))
const currentImage = ref(require(`@/assets/img/casa${ilustrationId.value}.jpg`))

const handleChangeImage = (newImage) => {
    currentImage.value = newImage
}

const cartStore = useCartStore()
const ilustration = ref([])

//carousel images Mobile
const imageCarousel = [
    {
        url: require(`@/assets/img/casa${ilustrationId.value}.jpg`),
        alt: 'imagen de ilustración uno'
    },
    {
        url: require(`@/assets/img/casa${ilustrationId.value}_canva.jpg`),
        alt: 'imagen de ilustración uno'
    }
]

// Button Enmarcado
const checkboxEnmarcado = ref(false)
const toggleCheckbox = () => {
    checkboxEnmarcado.value = !checkboxEnmarcado.value;
};

const addProduct = (item) => {
    if (count.value > 0) {
        let product = {
            id: item.id,
            title: item.title,
            image: item.image,
            count: count.value,
            withMarco: checkboxEnmarcado.value,
            price: checkboxEnmarcado.value ? item.priceMarco : item.price
        }
        cartStore.addProductCart(product);
        count.value = 0;
        Swal.fire({
            title: "Producto agregado con exito",
            //text:"",
            icon: 'success',
            iconColor: 'greenlight',
            confirmButtonColor: 'green',
            confirmButtonText: 'Entendido',
            timer: 2000,
            timerProgressBar: true,
            //toast: true
        })
    }
}

const rutas = [
    {
        title: 'Inicio',
        disabled: false,
        href: '/'
    },
    {
        title: 'Ilustraciones',
        disabled: false,
        href: '/ilustration'
    },
    {
        title: 'Detalles',
        disabled: true
    }
]

//Count Cart
const incrementProduct = () => count.value++
const decrementProduct = () => (count.value > 0 ? count.value-- : null)

onMounted(() => {
    ilustration.value = cartStore.getIlustrationById(ilustrationId.value)

    // src_image.value = require(`@/assets/img/casa${ilustrationId.value}.jpg`)
    // src_canva.value = require(`@/assets/img/casa${ilustrationId.value}.jpg`)
})
</script>

<style scoped></style>
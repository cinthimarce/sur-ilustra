<template>
    <h1 class="text-center pb-6 ">Contáctanos</h1>
    <v-card
    class="mx-auto pb-2 mb-4 font-contact"
    max-width="600"
    variant="text"
    >
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.4700149870378!2d-72.06317142401875!3d-45.58109541652009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdf2c49320a60dd7%3A0xc12e48cef5516c3b!2sLos%20Coig%C3%BCes%201237%2C%20Coyhaique%2C%20Ays%C3%A9n!5e0!3m2!1ses!2scl!4v1708561423694!5m2!1ses!2scl" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        <v-card
        class=" pt-4 pb-6 text-justify"
        text="Somos una empresa dedicada a la Enmacarción de cuadros, libros y pinturas en acuarela, estamos ubicados en la Región de Aysén, ciudad de Coyhaique y ofrecemos enví a todas las regiones incluido el extranjero. Nuestros marcos y pinturas son de 21x29cm, trabajamos con un papel de alta calidad que no se deteriora con el paso del tiempo y tiene un perfecto acabado; Hahnemuhle Photo Matt Fribe Duo 210 gsm. este material lo utilizamos en todos los originales, también se pueden solicitar tamaños personalizados previa coordinación con el vendedor."
        variant="text"
        ></v-card>
    </v-card>

    <CardContact/>
</template> 



<script setup>
import CardContact from './CardContact.vue';


</script>

<style scoped>
h1 {
    font-family: 'Hepta Slab', serif !important;
    color: #8AA49B !important;
}
.font-contact{
    font-family: 'Hepta Slab', serif !important;
    color: #315467 !important;
}
</style>
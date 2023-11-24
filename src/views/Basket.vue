<template>
    <v-container>
        <h1>Prueba Carrito</h1>
    </v-container>
</template>

<script>
export default {
    name: 'component-name',
    // props: {},
    data: () => ({
        products: [{
            product_id: 'casa-1',
            photo: 'src/assets/banner/casa1.jpg',
            title: 'El Blanco 30x40 ',
            sub_title: 'Casa histórica de coyhaique, desde 1820',
            price: 25.000,
            papel: 
            qty: 0
        }]
    })
    // computed: {},
    // methods: {},
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    
</style>
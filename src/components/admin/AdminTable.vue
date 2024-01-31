<script setup>
import { db, storage } from '@/firebase/firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { uploadBytes, ref as storageRef } from 'firebase/storage';
import { ref } from 'vue'
// Reactive Values
const nombre = ref('')
const subtitulo = ref('')
const precio = ref('')
const categoria = ref('')
const itemscategoria = ['ilustraciones', 'avecillas', 'esculturas']
const imagen1 = ref([])
const imagen2 = ref([])


// Computed Properties

// Methods
const uploadImages = async (imageRef,files) =>{
    for(const file of files){
        await uploadBytes(imageRef,file)
    }
}
const enviar = async () => {
    // Validar que todos los campos estén completos antes de enviar
    if (!nombre.value || !subtitulo.value || !precio.value || !categoria.value || !imagen1.value || !imagen2.value) {
        console.error('Por favor, completa todos los campos');
        return;
    }
    try {
        // Enviar datos a Firestore
        const galeriaRef = collection(db, 'galeria');
        const categoriaRef = collection(galeriaRef, categoria.value);
        const docRef = await addDoc(categoriaRef,{
            nombre: nombre.value,
            subtitulo: subtitulo.value,
            precio: precio.value,
            categoria: categoria.value
        });

        // Obtener el ID del producto recién creado
        const docId = docRef.id

        // Subir imágenes a Storage
        const image1Ref = storageRef(storage,`images/${docId}/${imagen1.value[0].name}`);
        const image2Ref = storageRef(storage,`images/${docId}/${imagen2.value[0].name}`);

       await uploadImages(image1Ref,imagen1.value);
       await uploadImages(image2Ref,imagen2.value);

        alert('datos enviados con exito a firestore y Storage')
    }catch (error) {
        console.error('Error al enviar los datos:', error)
    }
}
// Watchers

// Lifecycle hooks

</script>

<template>
    <v-container class="container">
        <h1 class="titulo-productos">Agregar Productos</h1>
        <v-sheet width="600" class="mx-auto">

            <v-form @submit.prevent>
                <v-text-field v-model="nombre" label="Nombre"></v-text-field>
                <v-text-field v-model="subtitulo" label="Subtitulo"></v-text-field>
                <v-text-field v-model="precio" label="Precio"></v-text-field>
                <v-categoria label="Categoria" v-model="categoria" :items="itemscategoria" item-title="Categoria"></v-categoria>
                <v-file-input label="Primera Imagen" variant="filled" v-model="imagen1"
                    prepend-icon="mdi-camera"></v-file-input>
                <v-file-input label="Segunda Imagen" variant="filled" v-model="imagen2"
                    prepend-icon="mdi-camera"></v-file-input>
                <v-btn type="submit" block class="mt-2" @click="enviar">enviar</v-btn>
            </v-form>
        </v-sheet>
    </v-container>
</template>

<style scoped>
.container {
    width: 600px;
    text-align: center;

    & .titulo-productos {
        color: aliceblue;
        padding: 20px;
    }
}
</style>
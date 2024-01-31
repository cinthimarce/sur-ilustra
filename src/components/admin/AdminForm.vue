
<script setup>

import { ref, computed, onMounted} from 'vue'
import { useGaleriaStore } from '@/stores/galeria.js'
import { getAuth } from 'firebase/auth';
// Reactive Values
const auth = getAuth()
const currentUser = auth.currentUser
const galeriaStore = useGaleriaStore()
const dialog = ref(false)
const dialogDelete = ref(false)
const headers = [
    {
        title: 'ID',
        align: 'start',
        sortable: false,
        key: 'id',
    },
    { title: 'Imagen', key: 'imagen' },
    { title: 'Nombre', key: 'nombre' },
    { title: 'Subtitulo', key: 'subtitulo' },
    { title: 'Tamaño', key: 'tamanio' },
    { title: 'Precio', key: 'precio' },
    { title: 'Precio Marco', key: 'precioMarco' },
    { title: 'descripción', key: 'descripcion' },
    { title: 'Acciones', key: 'actions', sortable: false },
]
const desserts = ref([])
const editedIndex = ref(-1)
const editedItem = ref({
    imagen1: '',
    imagen2: '',
    nombre: '',
    subtitulo: '',
    precio: '',
    precioMarco: '',
    descripcion: '',
    tamanio: '',
    categoria: ''
})
const mostrarFormulario = () =>{
    dialog.value = true
    editedItem.value = {
        imagen1: '',
        imagen2: '',
        nombre: '',
        subtitulo: '',
        precio: '',
        precioMarco: '',
        descripcion: '',
        tamanio: '',
        categoria: ''
    }
    editedIndex.value = -1
}
const close = () =>{ 
    dialog.value = false
}
const save = async () =>{
   try {
    const imagenes = [
      { name: 'nombre_imagen1.jpg', file: editedItem.value.imagen1[0] },
      { name: 'nombre_imagen2.jpg', file: editedItem.value.imagen2[0] },
    ];

    // Llamar a la función agregarProducto del store
    await galeriaStore.agregarProducto({
      ...editedItem.value,
      // Asegúrate de ajustar las propiedades según tu modelo de datos
      imagenes,
    });

    // Otras acciones después de guardar, si es necesario
    close();
    alert('producto enviado')
   } catch (error) {
    console.error('Error al guardar el producto:', error);
   }
}

// Computed Properties
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nuevo Item' : 'Editar Item'
})
// Watchers

// Lifecycle hooks
onMounted(() => {
    initialize();
})
// Methods
const initialize = () =>{

}
</script>
<!-- eslint-disable vue/valid-v-slot -->
<template>
    <div class="contenedor">
        <h1 class="titulo">Bienvenido usuario: <span class="user">{{ currentUser.email }}</span></h1>
    </div>
    <v-container>
        <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Mis Productos</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ props }">
                            <v-btn color="black" dark prepend-icon="mdi-plus" class="mb-2" v-bind="props" @click="mostrarFormulario">
                                Nuevo Producto
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.nombre" label="nombre"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.subtitulo" label="subtitulo"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.precio" label="precio"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.precioMarco" label="precio Marco"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-file-input v-model="editedItem.imagen1" 
                                            prepend-icon="mdi-camera" label="Primera Imagen"></v-file-input>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-file-input v-model="editedItem.imagen2" 
                                            prepend-icon="mdi-camera" label="Segunda Imagen"></v-file-input>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="editedItem.tamanio" label="tamaño"></v-text-field>
                                        </v-col>
                                        <v-select
                                        label="Categoria"
                                        v-model="editedItem.categoria"
                                        :items="['Ilustraciones','Avecillas','Esculturas']"></v-select>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-textarea v-model="editedItem.descripcion" label="descripcion"></v-textarea>
                                        </v-col>
                                        
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="close">
                                    Cancelar
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="save">
                                    Guardar
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Esta Seguro que desea eliminar el Producto</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon size="small" color="blue" class="me-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" color="red" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<style scoped>
.titulo{
    color: aliceblue;
    text-align: center;
    margin-top: 30px;
    padding: 20px;
}
.user{
        color: aqua;
    }
</style>
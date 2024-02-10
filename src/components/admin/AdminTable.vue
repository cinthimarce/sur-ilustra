<script setup>
import { getDocs,collection } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import {ref,reactive,onMounted,computed} from 'vue'

    // props
    const productos = ref([])
    const dialog = ref(false)
    const dialogDelete = ref(false)
    const search = ref('')
    const editedIndex = ref(-1)
    const categoriaItems = ['Ilustración', 'Avecillas', 'Esculturas']
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
        { title: 'Dimensiones', key: 'dimensiones' },
        { title: 'Precio', key: 'precio' },
        { title: 'Precio Marco', key: 'precioMarco' },
        { title: 'Categoria', key: 'categoria' },
        { title: 'Acciones', key: 'actions', sortable: false },
    ]
    const editedItem = {
        nombre: '',
        subtitulo: '',
        precio: '',
        precioMarco: '',
        descripcion: '',
        dimensiones: '',
        categoria: '',
        imagen1: null,
        imagen2: null,
    }
    const state = reactive({...editedItem})
    // Reactive Values

    // Computed Properties
    const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nuevo Item' : 'Editar Item'
})

    // Watchers

    // Methods
    const cargarProductos = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        productos.value = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log("productos cargados con éxito")
    } catch (error) {
        console.error("Error al obtener los productos:", error)
    }
};
const mostrarFormulario = () => {
    dialog.value = true
    editedItem.value = {

        nombre: '',
        subtitulo: '',
        precio: '',
        precioMarco: '',
        descripcion: '',
        dimensiones: '',
        categoria: '',
        imagen1: null,
        imagen2: null,
    }
    //state.value = {...editedItem}
    editedIndex.value = -1
    console.log(productos.value)
    
}
const editarFormulario = (producto) => {
    state.nombre = producto.nombre
    state.subtitulo = producto.subtitulo
    state.precio = producto.precio
    state.precioMarco = producto.precioMarco
    state.descripcion = producto.descripcion
    state.dimensiones = producto.dimensiones
    state.categoria = producto.categoria
    state.imagen1 = null;
    state.imagen2 = null;
    dialog.value = true
    editedIndex.value = producto.id
    console.log(state.value)
}
const close = () =>{
    editedIndex.value = -1
    dialog.value = false
}

const enviarFormulario = () =>{
    console.log('Hola mundo')
}

    // Lifecycle hooks
onMounted(() => {
    cargarProductos();
})
</script>

<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items = "productos"
            select-all
            pagination.sync="pagination"
            item-key="id"
            
        >
        <template v-slot:top>
                <v-toolbar flat color="blue">
                    <v-toolbar-title>Mis Productos</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" density="compact" label="Search"
                        single-line flat hide-details variant="solo-filled"></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ props }">
                            <v-btn color="black" dark prepend-icon="mdi-plus" class="mb-2" v-bind="props"
                                @click="mostrarFormulario">
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
                                            <v-text-field v-model="state.nombre" label="nombre"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="state.subtitulo" label="subtitulo"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="state.precio" label="precio"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="state.precioMarco" label="precio Marco"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-file-input v-model="state.imagen1" prepend-icon="mdi-camera"
                                                label="Primera Imagen"></v-file-input>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-file-input v-model="state.imagen2" prepend-icon="mdi-camera"
                                                label="Segunda Imagen"></v-file-input>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="state.dimensiones" label="tamaño"></v-text-field>
                                        </v-col>
                                        <v-select name="categoria" label="Categoria" v-model="state.categoria"
                                            :items="categoriaItems"></v-select>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-textarea v-model="state.descripcion" label="descripcion"></v-textarea>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="close">
                                    Cancelar
                                </v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="enviarFormulario">
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
            <template #[`item.actions`]="{item}">
                <v-icon size="small" color="blue" class="me-2" @click="editarFormulario(item)">
                    mdi-pencil
                </v-icon>
            </template>
        </v-data-table>
    </v-container>
</template>

<style scoped>
    
</style>
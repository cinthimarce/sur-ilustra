
<script setup>
import CardLoader from './CardLoader.vue';
import SnackbarMessage from './SnackbarMessage.vue';
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useGaleriaStore } from '@/stores/galeria.js';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';



// Reactive Values

const auth = getAuth()
const currentUser = ref(auth.currentUser ? auth.currentUser.email : null);

//Actualizar el valor de CurrentUser cuando cambia la autenticación 
const unSubscribe = auth.onAuthStateChanged((user) => {
    currentUser.value = user ? user.email : null;
})

const galeriaStore = useGaleriaStore();
const productos = ref([]);
const dialog = ref(false);
const dialogDelete = ref(false);
const search = ref('');
const snackbarColor = ref('');
const snackbarText = ref('');
const snackbaricon = ref(''); 
const snackbar = ref(false)
const loading = ref(false);
const editedIndex = ref(-1);
const categoriaItems = ['Ilustración', 'Avecillas', 'Esculturas'];
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
];

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
};
const state = reactive({ ...editedItem })
// Obtener los productos para mostrarlos en el data table
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

    state.nombre = '';
    state.subtitulo = '';
    state.precio = '';
    state.precioMarco = '';
    state.descripcion = '';
    state.dimensiones = '';
    state.categoria = '';
    state.imagen1 = null;
    state.imagen2 = null;
    //state.value = {...editedItem}
    editedIndex.value = -1
    // console.log(productos.value)
    // console.log(state.value)
    mostrarSnackbar('Producto Agregado con Éxito','green','mdi-check-circle');
    console.log(snackbarText.value);
    console.log(snackbarColor.value);
    console.log(snackbar.value);
    console.log(snackbaricon.value)
}

// Computed Properties
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nuevo Item' : 'Editar Item'
})
// Watchers
// Methods

const editarFormulario = (producto) => {
    // llenar el formulario con los datos del producto que se está editando
    state.nombre = producto.nombre;
    state.subtitulo = producto.subtitulo;
    state.precio = producto.precio;
    state.precioMarco = producto.precioMarco;
    state.descripcion = producto.descripcion;
    state.dimensiones = producto.dimensiones;
    state.categoria = producto.categoria;

    // Verificar si el producto tienen imágenes antes de asignar valores
    state.imagen1 = null;
    state.imagen2 = null;
    dialog.value = true;
    editedIndex.value = producto.id;
    mostrarSnackbar('Error al agregar el producto', 'red','mdi-alert-circle')
}

const close = () => {
    dialog.value = false
    state.value = { ...editedItem }
    editedIndex.value = -1
}
//snackbar
const mostrarSnackbar = (texto,color,icon) =>{
    snackbarText.value = texto;
    snackbarColor.value = color;
    snackbaricon.value = icon;
    snackbar.value = true;
}
const crearProducto = async () => {
    try {
        loading.value = true;
        await galeriaStore.createProducto(state)
        
    } catch (error) {
        console.error('Error al crear el Producto:', error)
        mostrarSnackbar('Error al agregar el producto', 'red')
        
    } finally {
        loading.value = false;
        cargarProductos();
        mostrarSnackbar('Producto Agregado con Éxito','green');
        
    }
}
const enviarFormulario = async () => {
    if (editedIndex.value === -1) {
        crearProducto()

        //console.log('Producto enviado con exito');
    } else {
        galeriaStore.editarProducto({ id: editedIndex.value, nuevoProducto: { ...state } })
        state.value = { ...editedItem }
    }

    close()
};

// Funciones para eliminar Productos

const deleteItem = (item) => {
    editedIndex.value = item.id;
    dialogDelete.value = true;
}
const closeDelete = () => {
    dialogDelete.value = false;
}
const deleteItemConfirm = () => {
    try {
        galeriaStore.eliminarProducto(editedIndex.value);
        dialogDelete.value = false;
        console.log("Elemento eliminado con éxito")
        cargarProductos();

    } catch (error) {
        console.log("Error al eliminar el producto:", error);
    }
}

// Lifecycle hooks
onMounted(() => {
    cargarProductos();
})
onUnmounted(() => {
    unSubscribe();
})


</script>
<!-- eslint-disable vue/valid-v-slot -->
<template>
    <div class="contenedor">
        <h1 class="titulo">Bienvenido usuario: <span class="user">{{ currentUser }}</span></h1>
    </div>
    <v-container>
        <v-data-table :headers="headers" :items="productos" :sort-by="[{ key: 'categoria', order: 'asc' }]">
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
            <template v-slot:item.actions="{ item }">
                <v-icon size="small" color="blue" class="me-2" @click="editarFormulario(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" color="red" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <div>
            <card-loader :loading="loading"/>
            <snackbar-message :color="snackbarColor" :icon="snackbaricon" :message="snackbarText" :snackbar="snackbar"/>
        </div>
    </v-container>
</template>

<style scoped>
.titulo {
    color: aliceblue;
    text-align: center;
    margin-top: 30px;
    padding: 20px;
}

.user {
    color: aqua;
}


</style>
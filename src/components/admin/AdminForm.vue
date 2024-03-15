
<script setup>
import CardLoader from './CardLoader.vue';
import SnackbarMessage from './SnackbarMessage.vue';
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import { useGaleriaStore } from '@/stores/galeria.js';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { formatCurrency } from '../gallery/base/FormatCurrent';



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
const loadingActions = ref('');
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
    precio: null,
    precioMarco: null,
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

}

// Computed Properties
const formTitle = computed(() => {
    return editedIndex.value === -1 ? 'Nuevo Item' : 'Editar Item'
})

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
}

const close = () => {
    dialog.value = false
    state.value = { ...editedItem }
    editedIndex.value = -1
}
//snackbar
const mostrarSnackbar = (texto, tipoAccion) => {
    let color = '';
    let icon = '';

    switch (tipoAccion) {
        case 'creacion':
            color = 'green';
            icon = 'mdi:mdi-check-circle';
            break;
        case 'edicion':
            color = 'blue';
            icon = 'mdi:mdi-refresh-circle';
            break;
        case 'eliminacion':
            color = 'yellow';
            icon = 'mdi:mdi-delete-circle';
            break
        default:
            color = 'red';
            icon = 'mdi:mdi-alert-circle';
    }
    snackbarText.value = texto;
    snackbarColor.value = color;
    snackbaricon.value = icon;
    snackbar.value = true;

    setTimeout(() => {
        snackbar.value = false;
    }, 3000);
}
const crearProducto = async () => {
    try {
        loading.value = true;
        loadingActions.value = 'agregar'
        await galeriaStore.createProducto(state)
        mostrarSnackbar('Producto Agregado con Éxito', 'creacion');
    } catch (error) {
        console.error('Error al crear el Producto:', error)
        mostrarSnackbar('Error al agregar el producto', 'error')

    } finally {
        loading.value = false;
        cargarProductos();
    }
}
const editarProducto = async () => {
    try {
        loading.value = true;
        loadingActions.value = 'editar'
        await galeriaStore.editarProducto({ id: editedIndex.value, nuevoProducto: { ...state } });
    } catch (error) {
        console.error('Error al editar el Producto:', error);
        mostrarSnackbar('Error al editar el producto', 'error');
    } finally {
        loading.value = false;
        cargarProductos();
        mostrarSnackbar('Producto editado con éxito', 'edicion')
    }
}
const enviarFormulario = async () => {
    try {
        // Validar que todos los campos estén completos
        if (!state.nombre || !state.subtitulo || !state.precio || !state.precioMarco || !state.imagen1 || !state.imagen2 || !state.dimensiones || !state.categoria || !state.descripcion) {
            mostrarSnackbar('Por favor complete todos los campos', 'red');
            return;
        }
        if (editedIndex.value === -1) {
            crearProducto()
            //console.log('Producto enviado con exito');
        } else {
            editarProducto()
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        mostrarSnackbar('Error al enviar el formulario', 'error');
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
const deleteItemConfirm = async () => {
    try {
        await galeriaStore.eliminarProducto(editedIndex.value);
        dialogDelete.value = false;
        loading.value = true;
        loadingActions.value = 'eliminar'
        console.log("Elemento eliminado con éxito")
        cargarProductos();

    } catch (error) {
        console.log("Error al eliminar el producto:", error);
    } finally {
        loading.value = false;
        mostrarSnackbar('Producto eliminado con éxito', 'eliminacion')
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
                    <v-text-field v-model="search" prepend-inner-icon="mdi:mdi-magnify" density="compact" label="Search"
                        single-line flat hide-details variant="solo-filled"></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ props }">
                            <v-btn color="black" dark prepend-icon="mdi:mdi-plus" class="mb-2" v-bind="props"
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
                                            <v-text-field v-model="state.nombre" label="nombre"
                                                :rules="[v => !!v || 'El nombre es obligatorio']"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="state.subtitulo" label="subtitulo"
                                                :rules="[v => !!v || 'El subtitulo es obligatorio']"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field label="precio" v-model="state.precio" 
                                                :rules="[v => !!v || 'El precio es obligatorio', v => /^\d+(\.\d{1,2})?$/.test(v) || 'El precio debe ser un número válido']">
                                            </v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="state.precioMarco" label="precio Marco"
                                                :rules="[v => !!v || 'El precio del marco es obligatorio', v => /^\d+(\.\d{1,2})?$/.test(v) || 'El precio del marco debe ser un número válido']"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-file-input v-model="state.imagen1" prepend-icon="mdi:mdi-camera"
                                                label="Primera Imagen"
                                                :rules="[v => !!v || 'La primera imagen es obligatoria']"></v-file-input>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-file-input v-model="state.imagen2" prepend-icon="mdi:mdi-camera"
                                                label="Segunda Imagen"
                                                :rules="[v => !!v || 'La segunda imagen es obligatoria']"></v-file-input>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="6">
                                            <v-text-field v-model="state.dimensiones" label="tamaño"
                                                :rules="[v => !!v || 'Las dimensiones son obligatoria']"></v-text-field>
                                        </v-col>
                                        <v-select name="categoria" label="Categoria" v-model="state.categoria"
                                            :items="categoriaItems"
                                            :rules="[v => !!v || 'La categoría es obligatoria']"></v-select>
                                        <v-col cols="12" sm="6" md="12">
                                            <v-textarea v-model="state.descripcion" label="descripcion"
                                                :rules="[v => !!v || 'La descripción es obligatoria']"></v-textarea>
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
            <template v-slot:item.precio="{item}">
                {{ formatCurrency(item.precio) }}
            </template>
            <template v-slot:item.precioMarco="{item}">
                {{ formatCurrency(item.precioMarco) }}
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon size="small" color="blue" class="me-2" @click="editarFormulario(item)">
                    mdi:mdi-pencil
                </v-icon>
                <v-icon size="small" color="red" @click="deleteItem(item)">
                    mdi:mdi-delete
                </v-icon>
            </template>
        </v-data-table>
        <div>
            <card-loader :loading="loading" :actions="loadingActions" />
            <snackbar-message :color="snackbarColor" :icon="snackbaricon" :message="snackbarText" :snackbar="snackbar" />
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
}</style>
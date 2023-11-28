<template>
    <v-container class="cart">
        <v-row justify="center">
            <v-col align-self="center">
                <h1 class="titulo">Productos Agregados</h1>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-center" v-for="header in headers" :key="header.text">
                                {{ header.text }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in listStore" :key="item.name" class="text-center">
                            <td>{{ item.title }}</td>
                            <td>{{ item.count }}</td>
                            <td>{{ item.price.toLocaleString('es-CL') }}</td>
                            <td>${{ item.total.toLocaleString('es-CL') }}</td>
                            <div class="d-flex justify-space-around align-center mt-4">
                                <td><v-icon @click="cartStore.addStockCart(item.id)">mdi-plus-circle</v-icon></td>
                                <td><v-icon @click="removeStock(item.id)">mdi-minus-circle</v-icon></td>
                                <td><v-icon @click="deleteItem(item)">mdi-delete</v-icon></td>
                            </div>
                        </tr>
                        <div class="text-center">
                            <v-toolbar-title class="ml-4 mt-4 mb-4">Total Compras: <span class="text-success">${{ cartStore.cartTotalPrice.toLocaleString('es-CL')}}</span></v-toolbar-title>
                        </div>
                    </tbody>
                </v-table>
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card color="orange">
                        <v-card-title class="text-h5 text-center">¿desea eliminar el producto?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text"  @click="closeDelete">Cancel <v-icon color="red" size="25">mdi-close</v-icon></v-btn>
                            <v-btn color="blue-darken-1" variant="text"  @click="deleteItemConfirm">OK <v-icon color="success" size="25">mdi-check-bold</v-icon></v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-col>
        </v-row>
    </v-container>
   
</template>
 
<script setup>
import { useCartStore } from '@/stores/cart'
// const {cartProduct,cartTotal} = storeToRefs(store)
import { computed,ref } from 'vue'
 
const dialogDelete = ref(false)
const deleteId = ref(null)
 
const cartStore = useCartStore()
const listStore = computed(() => cartStore.getCartList)
 
const headers= [
    { text: 'Producto', value: 'name' },
    { text: 'Cantidad', value: 'count' },
    { text: 'Precio', value: 'price' },
    { text: 'Subtotal', value: 'total' },
    { text: 'Acciones', value: 'actions' }
 
]
 
 
function removeStock(item){
            cartStore.removeStockCart(item)
        }
 
const deleteItem = (item) => {
    deleteId.value = item.id
    dialogDelete.value = true
}
const closeDelete = () => {
    dialogDelete.value = false
   
}
const deleteItemConfirm =() => {
    cartStore.removeProductCart(deleteId.value)
    closeDelete()
}
 
 
</script>
 
<style scoped>
</style>
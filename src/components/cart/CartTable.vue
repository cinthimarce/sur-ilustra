<template>
    <v-table class="my-4">
        <thead>
            <tr>
                <th class="text-center text-table-head pr-16 " v-for="header in headers" :key="header.text">
                    {{ header.text }}
                </th>
            </tr>
        </thead>
        <tbody class="text-table">
            <tr v-for="(item,index) in listStore" :key="index" class="my-8">
                <td class="py-3"><v-img :src="item.imagen" width="120"></v-img></td>
                <td class="py-3">{{ item.title }}</td>
                <td class="text-center pr-12">{{ item.quantity }}</td>
                <td>{{ formatCurrency(item.price) }}</td>
                <td class="text-center pr-16">{{ displayWithMarco(item.withFrame) }}</td>
                <td class="">${{ item.total.toLocaleString("es-CL") }}</td>
                <td transition="scale-transition">
                    <v-icon class="mr-1" @click="subtractProduct(item.id, item.withFrame)">mdi:mdi-minus-circle</v-icon>
                    <v-icon class="mr-1" @click="addProduct(item.id,item.withFrame)">mdi:mdi-plus-circle</v-icon>
                    <v-icon @click="deleteItem(item)">mdi:mdi-delete</v-icon>
                </td>
            </tr>
        </tbody>
    </v-table>

    <div class="d-flex justify-end subtext-caudex">
        <v-sheet>
            <v-toolbar-title v-for="n in 1" :key="n" class="pt-1 ml-4 mt-2 mb-4 pr-16 subtext-caudex">Total
                Compras:
                <span class="text-success">{{ formatCurrency(cartStore.cartTotalPrice)
                }}</span></v-toolbar-title>
        </v-sheet>
    </div>
    <v-dialog class="delete-dialog" v-model="dialogDelete" max-width="500px">
        <v-card class="pt-2 pb-1 " color="nonary">
            <v-card-title class="text-h6 text-center pt-2 delete-dialog">¿Desea eliminar el
                producto?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="senary" variant="flat" @click="deleteItemConfirm">Aceptar
                    <v-icon color="primary" size="25">mdi:mdi-check</v-icon></v-btn>
                <v-btn color="senary" variant="flat" @click="closeDelete">Cancelar <v-icon color="primary"
                        size="25">mdi:mdi-close</v-icon></v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-card-actions class="justify-center">
        <v-btn class="color-bg-cart px-6 mb-4 ml-1" variant="text" color="septenary"> Pagar </v-btn>
        </v-card-actions>
</template>

<script setup>
import { useCartStore } from "@/stores/cart";
import { ref, computed } from 'vue'
import { formatCurrency } from "../gallery/base/FormatCurrent";

const dialogDelete = ref(false);
const deleteId = ref(null);
const deleteWithFrame = ref(null)
const cartStore = useCartStore()
const listStore = computed(() => cartStore.getCartList
)

// si tiene enmarcado
const displayWithMarco = (withFrame) => {
    return withFrame ? "Si" : "No";
};
const headers = [
    { text: "Producto", value: "image" },
    { text: "", value: "name" },
    { text: "Cantidad", value: "count" },
    { text: "Precio", value: "price" },
    { text: "Enmarcado", value: "withMarco" },
    { text: "Subtotal", value: "total" },
    { text: "Acciones", value: "actions" },
];


//agregando,sacando y eliminando productos del carrito
const addProduct = (id, withFrame) => {
    cartStore.addStockCart({ id, withFrame })
}

const subtractProduct = (id, withFrame) => {
    cartStore.subtractStockCart({ id, withFrame })
}

const deleteItem = (item) => {
    deleteId.value = item.id;
    deleteWithFrame.value = item.withFrame;
    dialogDelete.value = true;
};
const closeDelete = () => {
    dialogDelete.value = false;
};
const deleteItemConfirm = () => {
    cartStore.removeProductCart({ id: deleteId.value, withFrame: deleteWithFrame.value });
    dialogDelete.value = false
};

</script>

<style scoped>
.color-bg-cart{
    background-color: #e3f26d;
}

.delete-dialog {
    color: #8AA49B !important;
    font-family: 'Hepta Slab', serif !important;
    font-size: 0.1rem;
}

.subtext-caudex {
    color: #315467 !important;
    font-family: 'Caudex', serif !important;
}

.text-table {
    color: #8AA49B !important;
    font-family: 'Hepta Slab', serif !important;
    font-size: 1rem;
}

.text-table-head {
    color: #315467 !important;
    font-family: 'Hepta Slab', serif !important;
    font-size: 1rem;
}
.fade-item-enter-active, .fade-item-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-item-enter, .fade-item-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.custom-transition {
    transition: transform 5s ease-in-out;
}
.custom-transition-leave-active {
    transform: translateY((-100%));
}
</style>
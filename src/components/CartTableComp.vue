<template>
  <v-container class="cart">
    <v-row justify="center">
      <v-col align-self="center">
        <v-card color="basil" elevation="0">
          <v-card-title class="text-center justify-center pb-2">
            <h1 class="font-weight-bold text-h4 text-basil">
              Finalizar Compra
            </h1>
          </v-card-title>


          <v-window v-model="tab">
            <v-window-item >
              <v-card color="basil" flat>
                <v-card-text class="d-flex justify-center text-send"> Envíos a todo Chile </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>

        <!-- <h1 class="pb-8 text-center">Finalizar Compra</h1> -->
        <v-table>
          <thead>
            <tr>
              <th
                class="text-center"
                v-for="header in headers"
                :key="header.text"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in listStore" :key="item.name" class="text-center">
              <td><v-img :src="item.image" max-width="80"></v-img></td>
              <td>{{ item.title }}</td>
              <td>{{ item.count }}</td>
              <td>{{ item.price.toLocaleString("es-CL") }}</td>
              <td>{{ displayWithMarco(item.withMarco) }}</td>
              <td>${{ item.total.toLocaleString("es-CL") }}</td>
              <td class="">
                <v-icon @click="cartStore.addStockCart(item.id)"
                  >mdi-plus-circle</v-icon
                >
                <v-icon @click="removeStock(item.id)"
                  >mdi-minus-circle</v-icon
                >
                <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
              </td>            
            </tr>
            <div class="text-center">
              <v-toolbar-title class="ml-4 mt-4 mb-4"
                >Total Compras:
                <span class="text-success"
                  >${{ cartStore.cartTotalPrice.toLocaleString("es-CL") }}</span
                ></v-toolbar-title
              >
            </div>
          </tbody>
        </v-table>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card color="primary">
            <v-card-title class="text-h5 text-center"
              >¿desea eliminar el producto?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel <v-icon color="red" size="25">mdi-close</v-icon></v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK
                <v-icon color="success" size="25">mdi-check-bold</v-icon></v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script setup>
import { useCartStore } from "@/stores/cart";
// const {cartProduct,cartTotal} = storeToRefs(store)
import { computed, ref } from "vue";

const dialogDelete = ref(false);
const deleteId = ref(null);

const cartStore = useCartStore();
const listStore = computed(() => cartStore.getCartList);
// si tiene enmarcado
const displayWithMarco = (withMarco) => {
  return withMarco ? "Si" : "No";
};

const headers = [
  { text: "", value: "image"},
  { text: "Producto", value: "name" },
  { text: "Cantidad", value: "count" },
  { text: "Precio", value: "price" },
  { text: "Enmarcado", value: "withMarco" },
  { text: "Subtotal", value: "total" },
  { text: "Acciones", value: "actions" },
];
function removeStock(item) {
  cartStore.removeStockCart(item);
}

const deleteItem = (item) => {
  deleteId.value = item.id;
  dialogDelete.value = true;
};
const closeDelete = () => {
  dialogDelete.value = false;
};
const deleteItemConfirm = () => {
  cartStore.removeProductCart(deleteId.value);
  closeDelete();
};
</script>
 
<style scoped>
.style-font-title {
  font-family: "";
}
.bg-basil {
    background-color: #F7F7F7 !important;
  }
  .text-basil {
    color: #8AA49B !important;
    font-family: 'Caudex', serif !important; 
  }
  .text-send{
    font-family: 'Quattrocento Sans', sans-serif !important; 
  }
</style>
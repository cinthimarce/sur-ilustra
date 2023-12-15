<template>
  <v-container class="cart" >
    <v-row justify="center">
      <v-col align-self="center">
        <v-card color="caudex" elevation="0">
          <v-card-title class="text-center justify-center pb-0 mb-0 mt-2">
            <h1 class="font-weight-bold text-h4 text-caudex ">
              Finalizar Compra
            </h1>
          </v-card-title>

          <v-window v-model="tab">
            <v-window-item >
              <v-card color="caudex" flat>
                <v-card-text class="d-flex justify-center text-send"><v-icon class="mr-2" >mdi-truck-fast</v-icon> Envíos a todo Chile <v-icon class="ml-2" >mdi-truck-fast</v-icon> </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-card>
        
        <v-divider class="pb-2"></v-divider>
        <v-card class="subtext-caudex mb-2" title="Carrito (3 Productos)" text="" variant="tonal" color="caudex" ></v-card>

        
        <v-table class="my-4">
          <thead>
            <tr>
              <th
                class="text-center text-table-head pr-16 "
                v-for="header in headers"
                :key="header.text"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody class=" text-table ">
            <tr v-for="item in listStore" :key="item.name" class="my-8">
              <td class=" py-3  "><v-img :src="item.image" width="120"></v-img></td>
              <td class=" py-3">{{ item.title }}</td>
              <td class=" text-center pr-12">{{ item.count }}</td>
              <td >{{ item.price.toLocaleString("es-CL") }}</td>
              <td class=" text-center pr-16">{{ displayWithMarco(item.withMarco) }}</td>
              <td  class="">${{ item.total.toLocaleString("es-CL") }}</td>
              <td>
                <v-icon class="mr-1" @click="removeStock(item.id)"
                  >mdi-minus-circle</v-icon
                >
                <v-icon class="mr-1" @click="cartStore.addStockCart(item.id)"
                  >mdi-plus-circle</v-icon
                >
                <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
              </td>            
            </tr>
          </tbody>
        </v-table>
        
        <div class="d-flex justify-end subtext-caudex" >
          <v-sheet> 
              <v-toolbar-title v-for="n in 1" :key="n"  class="pt-1 ml-4 mt-2 mb-4 pr-16 subtext-caudex"
                >Total Compras:
                <span class="text-success"
                  >${{ cartStore.cartTotalPrice.toLocaleString("es-CL") }}</span
                ></v-toolbar-title
              >
            </v-sheet>
            </div>
        <v-dialog class="delete-dialog" v-model="dialogDelete" max-width="500px">
          <v-card class="pt-2 pb-1 " color="nonary">
            <v-card-title class="text-h6 text-center pt-2 delete-dialog"
              >¿Desea eliminar el producto?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn
                color="senary"
                variant="flat"
                @click="deleteItemConfirm"
                >Aceptar
                <v-icon color="primary" size="25">mdi-check</v-icon></v-btn
              >
              <v-btn color="senary" variant="flat" @click="closeDelete"
                >Cancelar <v-icon color="primary" size="25">mdi-close</v-icon></v-btn
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
  { text: "Producto", value: "image"},
  { text: "", value: "name" },
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

.delete-dialog{
    color: #8AA49B  !important;
    font-family: 'Hepta Slab', serif !important; 
    font-size: 0.1rem;
}
.text-caudex {
    color: #8AA49B !important;
    font-family: 'Caudex', serif !important; 
}
.subtext-caudex {
    color: #315467 !important;
    font-family: 'Caudex', serif !important; 
}
.text-send{
    color: #8AA49B !important;
    font-family: 'Hepta Slab', serif !important; 
    font-size: 1rem;
}
.text-table{
    color: #8AA49B !important;
    font-family: 'Hepta Slab', serif !important; 
    font-size: 1rem;
}
.text-table-head{
    color: #315467 !important;
    font-family: 'Hepta Slab', serif !important; 
    font-size: 1rem;
}
</style>

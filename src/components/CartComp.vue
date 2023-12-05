<template>
  <!-- 1 -->
  <v-container class="cart">
    <v-row justify="center">
      <v-col align-self="center">
        <h1 class="titulo">Finalizar Compra</h1>
        <v-table>
          <thead>
            <tr>
              <th class="text-center">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-center">
              <td>Nombre</td>
              <td>Cantidad</td>
              <td>Precio</td>
              <td>Total</td>
              <div class="d-flex justify-content-around align-center mt-4">
                <td><v-icon>mdi-plus-circle</v-icon></td>
                <td><v-icon>mdi-minus-circle</v-icon></td>
                <td><v-icon>mdi-delete</v-icon></td>
              </div>
            </tr>
            <div class="text-center">
              <v-toolbar-title class="ml-4 mt-4 mb-4">Total Compras: <span class="text-success">$10.000</span></v-toolbar-title>
            </div>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
  <!-- 2 -->


  <!-- Iconos Wts / eMail -->
  <div>
      <v-card-actions>
    <v-row d-flex justify="center">
      <v-btn prepend-icon="mdi-whatsapp" variant="tonal" color="success" @click="openWhatsApp">
        WhatsApp
      </v-btn>
      <v-btn
        prepend-icon="mdi-email-outline"
        variant="tonal"
        color="red-darken-1"
        @click="openMail"
        >Correo</v-btn
      >
    </v-row>
  </v-card-actions>
  </div>
  <!-- Iconos Wts / eMail -->



</template> 



<script setup>
import {} from "vue";

const openWhatsApp = () => {
// Reemplaza  con el número de WhatsApp al que quieres enviar el mensaje
const phoneNumber = '934259767';
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}`;
  window.open(url, '_blank');
};

const openMail = () => {
// Reemplaza  con la dirección de correo a la que quieres enviar el mensaje
const emailAddress = 'humberto.coyhaique@gmail.com';
  const url = `mailto:${emailAddress}`;
  window.location.href = url;
};
</script>

<style scoped>
h1{
font-family: Helvetica;
}

</style>

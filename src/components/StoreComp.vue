<template>
    <h1 class="text-center">¿Cómo puedo comprar?</h1>
    <div>
      <v-banner
        lines="one"
        icon="mdi-lock"
        color="deep-purple-accent-4"
        class="my-4"
      >
        <v-banner-text>
          1.- Selecciona la imagen que vas a comprar
        </v-banner-text>
  
        <template v-slot:actions>
          <!-- <v-btn>Action</v-btn> -->
        </template>
      </v-banner>
  
      <v-banner
        lines="two"
        icon="mdi-weather-hurricane"
        color="error"
        class="my-4"
      >
        <v-banner-text>
          2.- Decide si la imagen la vas a querer en formto digital o impreso
        </v-banner-text>
  
        <template v-slot:actions>
          <!-- <v-btn>Action</v-btn> -->
        </template>
      </v-banner>
  
      <v-banner
        lines="three"
        icon="$warning"
        color="warning"
        class="my-4"
      >
        <v-banner-text>
          3.- Si es impresa, tenemos 3 tipos de formatos: 20x20 - 40x40 - 60x60 centímetros
        </v-banner-text>
  
        
        <template v-slot:actions>
          <!-- <v-btn>Action</v-btn> -->
        </template>
      </v-banner>

      <v-banner
        lines="three"
        icon="$warning"
        color="warning"
        class="my-4"
      >
        <v-banner-text>
          4.- Si es digital, contáctanos a nuestro correo o WhatsApp para el proceso de pago y te enviaremos a tu correo el link para descargarla.
        </v-banner-text>
  
        
        <template v-slot:actions>
          <!-- <v-btn>Action</v-btn> -->
        </template>
      </v-banner>

      <v-banner
        lines="three"
        icon="$warning"
        color="warning"
        class="my-4"
      >
        <v-banner-text>
          5.- Y Si es impresa, también, contáctanos a nuestro correo o WhatsApp para el proceso de pago, y la coordinación del envío.
        </v-banner-text>
  
        
        <template v-slot:actions>
          <!-- <v-btn>Action</v-btn> -->
        </template>
      </v-banner>

    </div>
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
  </template> 

<!-- DOS -->
<!-- <template>
    <v-banner
  avatar="img/casa.jpg"
  
  lines="two"
  :text="description"
  :stacked="false"
>
  <template v-slot:actions>
    <v-btn>Click me</v-btn>
  </template>
</v-banner>
</template> -->



<!-- UNO 
<template>
  <v-avatar rounded="0" image="img/logo2.png" size="80"></v-avatar>
  <v-card
    image=""
    title="Enmarca Aysén"
    subtitle="Humberto Vera"
    :text="description"
    variant="tonal"
  >
    <v-card-actions>
      <v-row d-flex justify="center">
        <v-btn prepend-icon="mdi-whatsapp" variant="tonal" color="success">
          WhatsApp
        </v-btn>
        <v-btn
          prepend-icon="mdi-email-outline"
          variant="tonal"
          color="red-darken-1"
          >Correo</v-btn
        >
      </v-row>
    </v-card-actions>
  </v-card>
</template> -->

<script setup>
import {} from "vue";
//const description =
//  "1.- Hola, puedes seleccionar la ilustración que más te guste y comprarla por este medio";

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
.text-center{

}
</style>
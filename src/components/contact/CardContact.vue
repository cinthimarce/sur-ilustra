<template>
    <div>
        <v-card-actions>
            <v-row d-flex justify="center">
                <v-btn prepend-icon="mdi-whatsapp" variant="tonal" color="success" @click="openWhatsApp">
                    WhatsApp
                </v-btn>
                <v-btn prepend-icon="mdi-email-outline" variant="tonal" color="red-darken-1"
                    @click="openMail">Correo</v-btn>
            </v-row>
        </v-card-actions>
    </div>
</template>

<script setup>
    
import {} from 'vue'
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
    
</style>
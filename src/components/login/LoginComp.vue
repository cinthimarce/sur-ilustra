<script setup>
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

import { ref } from 'vue'
import { useRouter } from "vue-router"

const router  = useRouter()
const visible = ref(false);
const email = ref('');
const emailRules = [
    v => !!v || 'Email es requerido',
    v => /.+@.+\..+/.test(v) || 'Email no valido'
]
const pass = ref('');
const passRules = [
    v=> !! v || 'Contraseña es requerida',
    v=>(v&& v.length >= 3) || 'Contraseña debe tener mas de 5 caracteres'
]
const isFormValid = ref(false);

function validate(){
    isFormValid.value = true;

    if(!emailRules.every(rule => rule(email.value))){
        isFormValid.value = false;
    }
    if (!passRules.every(rule => rule(pass.value))){
        isFormValid.value = false;
    }
}

async function login(){
    validate();
    if(isFormValid.value){
        // Lógica de inicio de sesión con Firebase
        const auth = getAuth();
        try {
            const userCredentials = await signInWithEmailAndPassword(auth,email.value,pass.value)
            console.log('Usuario auntenticado:',userCredentials.user)
            router.push({name: 'admin'})
        } catch (error) {
            console.error("Error al iniciar sesión:",error.message);
            alert('Error al iniciar sesión. verifique sus credenciales.')
        }
    } else{
        alert('Formulario invalido')
    }
}


</script>

<template>
    <v-container>
        <div>
            <div class="d-flex justify-center">
                <v-row>
                    <v-col md="12" class="text-center">
                        <v-img class="mx-auto my-6" max-width="150" src="img/logohv.jpeg"></v-img>
                        <h1>Sur Ilustra</h1>
                    </v-col>
                </v-row>
            </div>

            <v-form ref="form">
                <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
                <div class="text-subtitle-1 text-medium-emphasis">Correo</div>

                <v-text-field density="compact" placeholder="Ingrese su correo" prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                required
                :rules="emailRules"
                v-model="email"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Contraseña

                    <!-- <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer"
                        target="_blank">
                        Forgot login password?</a> -->
                </div>

                <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" 
                    :type="visible ? 'text' : 'password'"
                    density="compact" 
                    v-model="pass"
                    :rules="passRules"
                    placeholder="Ingrese su contraseña" prepend-inner-icon="mdi-lock-outline"
                    variant="outlined" @click:append-inner="visible = !visible"></v-text-field>

                <v-btn block class="mb-8" color="blue" size="large" variant="tonal" @click="login">
                    Iniciar Sesión
                </v-btn>
            </v-card>
            </v-form>
        </div>
    </v-container>
</template>

<style scoped></style>
<template>
    <MainLayout>
        <template #main>
            <v-row>
                <v-col>
                    <v-card class="mx-auto" max-width="344">
                        <v-img :src="src_image" height="200px" cover></v-img>

                        <v-card-title>
                            {{ilustration.title}}
                        </v-card-title>

                        <v-card-subtitle>
                            {{ilustration.price}}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </MainLayout>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import MainLayout from '@/layouts/MainLayout.vue';
import { useCartStore } from '@/stores/cart';
import { useRoute } from 'vue-router';

const route = useRoute()
const cartStore = useCartStore()

const ilustrationId = ref(route.params.id)
const ilustration = ref([])
const src_image = ref(null)

onMounted(() => {
    ilustration.value = cartStore.getIlustrationById(ilustrationId.value);

    src_image.value = `/img/casa${ilustrationId.value}.jpg`



    // console.log(ilustration.value)
    // console.log(src_image.value)
})
</script>

<style scoped></style>
<template>
    <v-row>
        <v-col v-for="item in props.galleryData" :key="item.id" class="d-flex child-flex" cols="12" lg="4">
            <v-img :src="item.image"
                :lazy-src="item.image" aspect-ratio="1" cover
                class="bg-grey-lighten-2" :title="item.name">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                    </v-row>
                </template>
                <v-text>{{ item.name }}</v-text>
            </v-img>
        </v-col>
    </v-row>
</template>
 
<script setup>
import { defineProps} from 'vue'
 
const  props  = defineProps(['galleryData'])
 
</script>
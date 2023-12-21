import { defineStore } from "pinia";
import { galeria } from "@/lib/data";

export const useGalleryStore = defineStore('gallery',{
    state: () =>({
        gallery: { ilustrations: [], scultures: [], avecillas: []}
    }),
    getters: {
        galleryProducts(state) {
            return state.gallery
        },
    },
    actions: {
        initializeGallery(){
            this.gallery = galeria
        },
        getIlustrationByTitle(title){
            return this.gallery.ilustrations.find(ilustration => ilustration.title === title)
        }
    }
})
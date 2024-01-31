import { defineStore } from "pinia";
import { db,storage } from "@/firebase/firebase";
import { collection,getDocs } from "firebase/firestore";
import { ref as storageRef, getDownloadURL  } from "firebase/storage";


export const useProductosStore = defineStore('productos',{
    state: () =>({
        productos:{
            ilustraciones: [],
            avecillas: [],
            scultures: [],
        }
    }),
    getters: {
        ilustrationsProducts(state){
            return state.productos.ilustraciones
        },
        avecillasProducts(state){
            return state.productos.avecillas
        },
        sculturesProducts(state){
            return state.productos.scultures
        },
    },
    actions: {
        
        async initializeProducts(){
            try {
                const galeriaRef = collection(db,'galeria');
                const querySnapshot = await getDocs(galeriaRef)

                querySnapshot.forEach( async doc =>{
                    //console.log(doc.data())
                    const productId = doc.id;
                    const productosCategoria = doc.data()
                    console.log(productId)
                    console.log(productosCategoria);

                    const imagesProductos = productosCategoria.map(async(producto)=>{
                        const imagen1URL = await this.obtenerURLImage(productId,producto.imagenId1);
                        const imagen2URL = await this.obtenerURLImage(productId,producto.imagenId2);
                        return {...producto, productId,imagen1URL, imagen2URL}
                    });
                    console.log(imagesProductos)

                })
                
                
            } catch (error) {
                console.error('Error  al cargar los productos:', error);
            }
        },
        async obtenerURLImage(nameImagen, imagenId){
            try {
                const imagenRef = storageRef(storage,`imagen/${imagenId}/${nameImagen}`)
                const url = await getDownloadURL(imagenRef)
                return url
            } catch (error) {
                console.error('Error al obtener las URL de las imagenes:', error);
            }
        }
    }
})
import { defineStore } from "pinia";
import { collection, addDoc} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { db,storage } from "@/firebase/firebase.js";


export const useGaleriaStore = defineStore("galeria", {
  state: () => ({
    productos: {
      ilustraciones: [],
      avecillas: [],
      scultures: [],
    },
  }),
  getters: {
    ilustrationsGalery(state) {
      return state.productos.ilustraciones;
    },
    avecillasGalery(state) {
      return state.productos.avecillas;
    },
    sculturesGalery(state) {
      return state.productos.scultures;
    },
  },
  actions: {
    
    async cargarImagenes(imagenes) {
      try {
        const urls = await Promise.all(
          imagenes.map(async (imagen) => {
            const imagenRef = storageRef(
              storage,
              `imagenes/${imagen.name}`
            );
            await uploadBytes(imagenRef, imagen.file);
            return getDownloadURL(imagenRef);
          })
        );
        return urls;
      } catch (error) {
        console.error('Error al cargar las imágenes:', error);
        throw error;
      }
    },
    async agregarProducto(producto) {
      try {
        // Cargar las imágenes primero
        const imagenesURL = await this.cargarImagenes(producto.imagenes);

        // Actualizar las rutas en el producto
        producto.imagen1 = imagenesURL[0] || '';
        producto.imagen2 = imagenesURL[1] || '';

        delete producto.imagenes;

        // Agregar el producto a Firestore
        const docRef = await addDoc(collection(db, 'productos'), producto);

        // Opcional: Actualizar el array de productos en el estado local
        this.productos.push({ ...producto, id: docRef.id });
      } catch (error) {
        console.error('Error al agregar el producto:', error);
        throw error;
      }
    },
  },
});

import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
  deleteObject,
  listAll,
} from "firebase/storage";
import { db, storage } from "@/firebase/firebase.js";

export const useGaleriaStore = defineStore("galeria", {
  state: () => ({
    productos: {
      ilustraciones: [],
      avecillas: [],
      scultures: [],
    },
    //productos: [],
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
    // Obtener los Productos desde la base de datos
    async getProductos() {
      try {
        // Limpiar los datos antiguos
        //this.productos = [];
        // Limpiar los datos antiguos
        this.productos = {
          ilustraciones: [],
          avecillas: [],
          esculturas: [],
        };
        const querySnapshot = await getDocs(collection(db, "productos"));
        querySnapshot.forEach((doc) => {
          const producto = { id: doc.id, ...doc.data() };
          //this.productos.push(producto);
          // Clasificar productos según su categoría
          if (producto.categoria === 'Ilustración') {
            this.productos.ilustraciones.push(producto);
          } else if (producto.categoria === 'Avecillas') {
            this.productos.avecillas.push(producto);
          } else if (producto.categoria === 'Esculturas') {
            this.productos.scultures.push(producto);
          }
        });
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    },

    // Agregar los productos a la base de datos
    async createProducto(producto) {
      const {
        nombre,
        categoria,
        precio,
        precioMarco,
        dimensiones,
        descripcion,
        subtitulo,
        imagen1,
        imagen2,
      } = producto;

      try {
        // Agregar el nuevo Producto a Firebase
        const docRef = await addDoc(collection(db, "productos"), {
          nombre,
          categoria,
          precio,
          precioMarco,
          dimensiones,
          descripcion,
          subtitulo,
        });
        // Capturar el ID del nuevo Producto
        const idProducto = docRef.id;
        // Manejar la carga de la imagen1 con el ID del producto
        const urlImagen1 = await this.cargarImagen(imagen1, idProducto);
        // Manejar la carga de la imagen2 con el ID del producto
        const urlImagen2 = await this.cargarImagen(imagen2, idProducto);

        // Actualizar el documento del producto con las URLs de las imágenes
        await updateDoc(docRef, {
          id: idProducto,
          imagen1: urlImagen1,
          imagen2: urlImagen2,
        });

        console.log("Producto agregado con éxito");
      } catch (error) {
        console.error("Error al agregar el producto:", error);
      }
    },
    async cargarImagen(imagenes, idProducto) {
      for (const imagen of imagenes) {
        const imageRef = storageRef(
          storage,
          `imagenes/${idProducto}/${imagen.name}`
        );

        try {
          const snapshot = await uploadBytes(imageRef, imagen);
          const downloadURL = await getDownloadURL(snapshot.ref);
          console.log("URL de descarga:", downloadURL);
          return downloadURL;
        } catch (error) {
          console.error("Error al cargar la imagen:", error);
          throw error;
        }
      }
    },

    //Editando los datos
    async editarImagenes(id, nuevoProducto) {
      try {
        const urlRef = `imagenes/${id}`;
        const carpetaRef = storageRef(storage, urlRef);

        let nuevaUrlImagen1 = null;
        let nuevaUrlImagen2 = null;

        // Eliminar la primera imagen y subir nueva imagen
        if (nuevoProducto.imagen1) {
          const elementos = await listAll(carpetaRef);
          const primerElemento = elementos.items[0];

          //Eliminar el primer Elemento
          await deleteObject(primerElemento);
          // subir la nueva imagen1[0]
          const nuevaImagen1Ref = storageRef(
            carpetaRef,
            nuevoProducto.imagen1[0].name
          );
          await uploadBytes(nuevaImagen1Ref, nuevoProducto.imagen1[0]);

          //Obtener la nueva URL de la imagen1
          nuevaUrlImagen1 = await getDownloadURL(nuevaImagen1Ref);
        }
        // Eliminar segunda imagen y subir la nueva imagen
        if (nuevoProducto.imagen2) {
          const elementos = await listAll(carpetaRef);
          const segundoElemento = elementos.items[1];
          console.log(segundoElemento);
          //Eliminar el segundo Elemento
          await deleteObject(segundoElemento);
          // subir la nueva imagen2[0]
          const nuevaImagen2Ref = storageRef(
            carpetaRef,
            nuevoProducto.imagen2[0].name
          );
          await uploadBytes(nuevaImagen2Ref, nuevoProducto.imagen2[0]);

          //Obtener la nueva URL de la imagen2
          nuevaUrlImagen2 = await getDownloadURL(nuevaImagen2Ref);
        }
        // Eliminar ambas imagenes y subir ambas imagenes nuevas
        if (nuevoProducto.imagen1 && nuevoProducto.imagen2) {
          const elementos = await listAll(carpetaRef);
          const primerElemento = elementos.items[0];
          const segundoElemento = elementos.items[1];
          console.log(primerElemento, segundoElemento);
          //Eliminar ambos elementos
          await Promise.all([
            deleteObject(primerElemento),
            deleteObject(segundoElemento),
          ]);
          // subir ambas imagenes solo si existe imágenes nuevas
          if (nuevoProducto.imagen1[0] && nuevoProducto.imagen2[0]) {
            const nuevaImagen1Ref = storageRef(
              carpetaRef,
              nuevoProducto.imagen1[0].name
            );
            await uploadBytes(nuevaImagen1Ref, nuevoProducto.imagen1[0]);
            const nuevaImagen2Ref = storageRef(
              carpetaRef,
              nuevoProducto.imagen2[0].name
            );
            await uploadBytes(nuevaImagen2Ref, nuevoProducto.imagen2[0]);
          } if (!nuevoProducto.imagen1 && !nuevoProducto.imagen2) {
            const elementos = await listAll(carpetaRef);
            nuevaUrlImagen1 = await getDownloadURL(elementos.items[0]);
            nuevaUrlImagen2 = await getDownloadURL(elementos.items[1]);
          }
        }

        //Retornar las nuevas urls de las imágenes
        return { nuevaUrlImagen1, nuevaUrlImagen2 };
      } catch (error) {
        console.log("Error al tratar de editar las imagenes:", error);
        throw error;
      }
    },

    // async editarProducto({ id, nuevoProducto }) {
    //   try {
    //     // const { nuevaUrlImagen1, nuevaUrlImagen2 } = await this.editarImagenes(
    //     //   id,
    //     //   nuevoProducto
    //     // );
    //     const nuevasImagenesCargadas = nuevoProducto.imagen1 ||nuevoProducto.imagen2;
    //     let nuevasUrlsImagenes = {};
    //     if(nuevasImagenesCargadas){
    //       nuevasUrlsImagenes = await this.editarImagenes(id,nuevoProducto)
    //     }

        

    //     // Contruir objeto con los datos actualizados del producto
    //     const datosActualizados = {
    //       nombre: nuevoProducto.nombre,
    //       categoria: nuevoProducto.categoria,
    //       precio: nuevoProducto.precio,
    //       precioMarco: nuevoProducto.precioMarco,
    //       dimensiones: nuevoProducto.dimensiones,
    //       subtitulo: nuevoProducto.subtitulo,
    //       descripcion: nuevoProducto.descripcion,
    //       imagen1:nuevasUrlsImagenes.nuevaUrlImagen1 ||  nuevoProducto.imagen1, // Utilizar la nueva URL si está disponible, de lo contrario, usar la URL existente
    //       imagen2: nuevasUrlsImagenes.nuevaUrlImagen2 ||  nuevoProducto.imagen2,
    //     };
    //     //obtener la referencia al documento del producto
    //     const productoRef = doc(db, "productos", id);
    //     // Actualizar el documneto del producto en Firestore
    //     await updateDoc(productoRef, datosActualizados);

    //     const productoStore = useGaleriaStore();
    //     await productoStore.getProductos();
    //     console.log("Producto editado con éxito");
    //   } catch (error) {
    //     console.error("Error al tratar de editar el producto:", error);
    //     throw error;
    //   }
    // },
    async editarProducto({ id, nuevoProducto }) {
      try {
        const productoRef = doc(db, "productos", id);
        const productoSnapshot = await getDoc(productoRef);
        const productoData = productoSnapshot.data();
    
        let nuevasUrlsImagenes = {};
    
        // Verificar si se han cargado nuevas imágenes
        if (nuevoProducto.imagen1) {
          nuevasUrlsImagenes.nuevaUrlImagen1 = await this.cargarImagen(
            nuevoProducto.imagen1,
            id
          );
        }
        if (nuevoProducto.imagen2) {
          nuevasUrlsImagenes.nuevaUrlImagen2 = await this.cargarImagen(
            nuevoProducto.imagen2,
            id
          );
        }
    
        // Construir objeto con los datos actualizados del producto
        const datosActualizados = {
          nombre: nuevoProducto.nombre,
          categoria: nuevoProducto.categoria,
          precio: nuevoProducto.precio,
          precioMarco: nuevoProducto.precioMarco,
          dimensiones: nuevoProducto.dimensiones,
          subtitulo: nuevoProducto.subtitulo,
          descripcion: nuevoProducto.descripcion,
          // Utilizar las nuevas URLs de las imágenes si están disponibles,
          // de lo contrario, mantener las URLs existentes
          imagen1: nuevasUrlsImagenes.nuevaUrlImagen1 || productoData.imagen1,
          imagen2: nuevasUrlsImagenes.nuevaUrlImagen2 || productoData.imagen2,
        };
    
        // Actualizar el documento del producto en Firestore
        await updateDoc(productoRef, datosActualizados);
    
        const productoStore = useGaleriaStore();
        await productoStore.getProductos();
        console.log("Producto editado con éxito");
      } catch (error) {
        console.error("Error al tratar de editar el producto:", error);
        throw error;
      }
    },

    //Eliminar Producto
    async eliminarProducto(id) {
      try {
        const productoRef = doc(db, "productos", id);
        const urlRef = `imagenes/${id}`;
        const carpetaRef = storageRef(storage, urlRef);
        const elementos = await listAll(carpetaRef);
        await Promise.all(
          elementos.items.map(async (elemento) => {
            deleteObject(elemento);
          })
        );
        await deleteDoc(productoRef);
      } catch (error) {
        console.error("Error eliminar producto:", error);
      }
    },
  },
});

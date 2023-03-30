// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signOut} from 'firebase/auth';

import { getFirestore, doc, setDoc, collection, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';

import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5gOjDlYXYxoMhXXHYvKJckOP62LHDz8Q",
  authDomain: "para-practicar-27253.firebaseapp.com",
  projectId: "para-practicar-27253",
  storageBucket: "para-practicar-27253.appspot.com",
  messagingSenderId: "205252703958",
  appId: "1:205252703958:web:e0e20964d431113f353b77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app);

const store = getStorage();

const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();

// Crear Usuario
export const crearUsuario = async (email, password) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        return userCredentials.user.email; 
    } catch (error) {
        return error.code
    }
}

// Iniciar Sesion
export const iniciarSesion = async (email, password) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        return userCredentials.user.email;
    } catch (error) {
        return error.code;
    }
}

// Google Privider
export const signGoogle = async () => {
    // try {
        const res = signInWithPopup(auth, googleProvider);
        return res;  
    // } catch (error) {
    //     return error.code;
    // }
}

// Facebook Provider
export const signFacebook = async () => {
    const res = await signInWithPopup(auth, facebookProvider);
    return res;
}

// Cerrar sesion
export const cerrarSesion = async () => {
    try {
        await signOut(auth);
        return 'sesion cerrada';
    } catch (error) {
        return error.code;
    }
}

// Agregar Categoria
export const agregarCategoria = async (colecion, documento, info) => {
    try {
        await setDoc(doc( db, colecion, documento),{
            id: documento,
            categoria: info.categoria,
            color: info.color,
        });
        return 'Categoria creada'
    } catch (error) {
        return error.code   
    }
}

// Obtener Categorias
export const obtenerCategoria = async (colecion) => {
    try {
        const querySnapshot = await getDocs(collection(db, colecion));
        const data = [];
        querySnapshot.forEach(item => {
            data.push(item.data())
        })
        return data; 
    } catch (error) {
        return error.code;
    }
}

export const actualizarCategoria = async (colecion, documento, newNombre, newColor) => {
    try {
        const categoriaRef = doc(db, `categorias-${colecion}`, documento);
        await updateDoc(categoriaRef, {
            categoria: newNombre,
            color: newColor,
        });
        return 'categoria actualizada';
    } catch (error) {
        return error.code;
    }
}

export const borrarCategoria = async (colecion, documento) => {
    await deleteDoc(doc(db, `categorias-${colecion}`, documento));
}

// Agregar Articulo
export const agregarArticulo = async (colecion, documento, info) => {
    try {
        await setDoc(doc(db, colecion, documento), {
            id: info.id,
            nombre: info.nombre,
            categoria: info.categoria,
            type: info.type,
            img: info.img,
            adicionales: info.adicionales,
            precios: info.precios,
        });
        return 'info subida'
    } catch (error) {
        return error.code;
    }
}

// Subir Img
export const subirImagen = async (imgPath, file) => {
    try {
        const storeRef = ref(store, imgPath);
        await uploadBytes(storeRef, file);
        return 'info subida';
    } catch (error) {
        console.log(error)
        return error.code;
    }
    
}


// Guardar Cliente
export const guardarCliente = async (colecion, documento, info) => {
    try {
        const user = await setDoc(doc(db, colecion, documento), {
            id:info.id,
            nombre: info.nombre,
            correo: info.correo,
            telefono: info.telefono,
            dirrecion: info.dirrecion,
            nota: info.nota,
        });
        return 'cliente creado';
    } catch (error) {
        return 'no se a guardado el cliente';
    }
}
// obtener clientes
export const obtenerClientes = async (colecion) => {
    const querySnapshot = await getDocs(collection(db, `clientes-${colecion}`));
    const data = [];
    querySnapshot.forEach((cliente)=>{
        data.push(cliente.data());
    });
    return data;
}

// Obtener todos los articulos sin importar su categoria
export const obtenerTodosArticulos = async(colecion) => {
    const querySnapshot = await getDocs(collection(db, `articulos-${colecion}`))
    let data = [];
    querySnapshot.forEach((articulo)=>{
        data.push(articulo.data());
    })
    return data;
}

export const obtenerArticulos = async (colecion, categoria) => {
    const q = query(collection(db, `articulos-${colecion}`),where('categoria','==', categoria));
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((element) => {
        data.push(element.data());
        // console.log(element.data())
    });
    // console.log(data)
    return data;
}

// Actualizar articulos
export const actualizarArticulo = async (colecion, documento, articuloActualizado) => {
    try {
        const articuloRef = doc(db, `articulos-${colecion}`, documento);
        await setDoc(articuloRef, {
            id: documento,
            categoria: articuloActualizado.categoria,
            img: articuloActualizado.img,
            nombre: articuloActualizado.nombre,
            adicionales: articuloActualizado.adicionales,
            precios: articuloActualizado.precios,
        });
        return 'articulo actualizado';
    } catch (error) {
        return error.code;
    }
}

export const borrarArticulo = async (colecion, documento) => {
    await deleteDoc(doc(db, `articulos-${colecion}`, documento));
}


export const obtenerCategoriaYArticulos = async (colecion, colecion2) => {

    const categorias = await obtenerCategoria(colecion);
    const data = [];
    categorias.map( async (cat) => {
        const res = await obtenerArticulos(colecion2, 'bebidas');
        // console.log(res);
    });
    return data;
}

export const ontenerImagen = async (carpeta, id) => {
    const res = await getDownloadURL(ref(store, `productos-${carpeta}/${id}`));
    // console.log(res)
    return res;
}

// Crear Recibo
export const crearRecibo = async (email, fecha, id, hora, recibo) => {
    const reciboRef = doc(db, `recibos-${email}`, `${fecha}:${id}`);
    const reciboff = setDoc(reciboRef,{
        id: id,
        hora: hora,
        fecha: fecha,
        cliente: recibo.cliente,
        lugar: recibo.lugar,
        orden: recibo.orden,
        total: recibo.totaldefinitivo,
    });
}

export const obtenerRecibo = async (email) => {
    const querySnapshop = await getDocs(collection(db, `recibos-${email}`));
    const data = [];
    querySnapshop.forEach((item)=>{
        data.push( item.data() );
    });
    return data;
}
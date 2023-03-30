// React Toastify
import { ToastContainer, toast } from 'react-toastify';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { crearUsuario, iniciarSesion, auth, obtenerCategoria } from '../firebase/firebase';

// React
import React, {createContext, useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';

//React Router
// import { useNavigate } from 'react-router-dom';

// Context
export const AppContext = createContext();


export const AppContextProvider = ({children}) => {

  const [emailUser, setEmailUser] = useState(null);
  const [viewMenu, setviewMenu] = useState(false);
  const [viewUser, setViewUser] = useState(0);
  const [viewArticulos, setViewArticulos] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [articuloSelect, setArticuloSelect] = useState(null);
  const [categoriaSelected, setCategoriaSelected] = useState(null);
  const [ordenCurrent, setOrdenCurrent] = useState([]);
  const [orderCurrentView, setOrderCurrentView] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const [totalPedido, setTotalPedido] = useState(0);
  const [pedido, setPedido] = useState({
      cliente: {},
      fecha: '',
      lugar: 'Comer dentro',
      orden: {},
      totaldefinitivo: 0,
  });
  const [design, setDesign] = useState('computer');

  useEffect(()=>{
    setPedido(state => ({...state, orden:  ordenCurrent}));
    setPedido(state => ({...state, cliente: userSelected}));
  }, [ordenCurrent, userSelected] );

  // const navigate = useNavigate();
  useEffect( () => {
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setEmailUser(user.email);
      }
    });

    // const getCategorias = () => {
    //   obtenerCategoria()
    // }

  }, [] );

  useEffect(()=>{
    const getDocs = async () => {
      // console.log( await obtenerCategoria(`categorias-${emailUser}`) )
      setCategorias( await obtenerCategoria(`categorias-${emailUser}`) );
  }
  getDocs();
  }, [] )

  
  return (
    <AppContext.Provider value={{
      emailUser, setEmailUser,
      viewMenu, setviewMenu,
      viewUser, setViewUser,
      viewArticulos, setViewArticulos,
      categorias, setCategorias,
      articulos, setArticulos,
      articuloSelect, setArticuloSelect,
      categoriaSelected, setCategoriaSelected,
      ordenCurrent, setOrdenCurrent,
      userSelected, setUserSelected,
      totalPedido, setTotalPedido,
      pedido, setPedido,
      design, setDesign,
    }}>
      <ToastContainer />
      {children}
    </AppContext.Provider>
  )
}
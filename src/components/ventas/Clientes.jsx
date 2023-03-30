// React
import React, { useContext, useEffect, useState } from 'react'

// React Icons
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { IoMdArrowBack, IoMdMail } from 'react-icons/io';
import { HiUser, HiUserCircle } from 'react-icons/hi';
import { MdLocalPhone, MdLocationOn, MdSpeakerNotes } from 'react-icons/md';

// Context
import { AppContext } from '../../context/AppContext';

// Componente
import CrearCliente from './CrearCliente';
import PerfilCliente from './PerfilCliente';
import PerfilCliente2 from './PerfilCliente2';
import Perfiles from './Perfiles';

// Firebase
import { obtenerClientes } from '../../firebase/firebase';

const Clientes = () => {

  const [clientes, setClientes] = useState(null);
  
  const { userSelected, setUserSelected, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, } = useContext(AppContext);

  const [clienteActivo, setClienteActivo] = useState(null);

  useEffect(()=>{
    
  }, [] );

  useEffect( () => {
    const getClientes = async () => {
      setClientes( await obtenerClientes(emailUser) );
    }
    getClientes();
    // console.log(viewUser);
    // if(viewUser == 1 && userSelected != null){
    //   console.log('si');
    // }else {
    //   console.log('no');
    // }
  }, [viewUser] );

  const handleClickOut = () => setViewUser(0);

  const handleClickAppUser = () => {
    setViewUser(2);
  }

	const handleClickBack = () => setViewUser(1);

  const handleClickCliente = (cliente) => {
    console.log(cliente)
    setClienteActivo(cliente);
    // setViewUser(3);
    setViewUser(3)
  }

  // if( userSelected != null &&){
  //   return <PerfilCliente2 />
  // }else 

  const handleClickAtras = (e) => {
    const target = e.target.classList[0];
    if(target == 'position-absolute'){
      handleClickOut();
      console.log('first')
    }
  }

  if(viewUser == 1){
    return (
      <div className='position-absolute min-vh-100 z-1 bg-black bg-opacity-25 p-0' onClick={handleClickAtras}>
            
        <div className='col-12 col-sm-8 min-vh-100 border shadow-lg bg-light top-0 start-0 mx-auto' style={{}}>
          <div className='d-flex border-0 border-bottom'>
            <AiOutlineClose className='fs-4 mt-4 m-3' onClick={handleClickOut}/>
            <p className='fs-4 fw-medium ms-2 m-3'>Añadir cliente al ticket</p>
          </div>
          <div className='d-flex border-0 border-bottom'>
            <AiOutlineSearch className='fs-4 m-3' />
            <input type="text" className='btn bg-transparent form-control text-start' placeholder='Buscar' />
          </div>
        	<div className='d-flex border-0 border-bottom'>
    	      <button className='btn bg-transparent form-control p-3 text-success fw-medium' onClick={handleClickAppUser}>AÑADIR CLIENTE NUEVO</button>
          </div>
          <div className='m-3'>
            <p>Clientes recientes</p>
            <ul className='ps-0'>
              { clientes.length > 0 ? 
                clientes.map((cliente)=>(
                  <li key={cliente.id} className='d-flex border-0 border-bottom py-1' onClick={()=>handleClickCliente(cliente)}>
                    <HiUserCircle className='text-secondary display-5 me-3 align-self-center'/>
                    <div className='d-flex flex-column align-self-center my-2'>
                      <p className='m-0'>{cliente.nombre}</p>
                      { (cliente.telefono != '') ? 
                        <p className='m-0'>{cliente.telefono}</p> 
                      :null}
                    </div>
                  </li>
                  ))
              : null}
            </ul>
        	</div>
        </div>
      </div>
      )
  }else if( viewUser == 2){
    return (
      <CrearCliente handleClickBack={handleClickBack} />
    )
  }else if(viewUser == 3){
    return(
      <PerfilCliente handleClickBack={handleClickBack} clienteActivo={clienteActivo} />
    )
  }else if(viewUser == 4){
    return(
      <PerfilCliente2 handleClickBack={handleClickBack} />
    )
  }else {
    return <></>
  }
  
  // else if( viewUser == 3) {
  //   return(
  //     <PerfilCliente handleClickBack={handleClickBack} clienteActivo={clienteActivo}/>
  //   )
  // }else if(viewUser == 4) {
  //   return(
  //     <></>
  //   )
  // }else if(viewUser == 1 && userSelected != null) {
  //     return(
  //       <PerfilCliente2 handleClickBack={handleClickBack} />
  //     )
  //   }else {
  //     return <></>
  //   }// <Perfiles handleClickBack={handleClickBack} clienteActivo={clienteActivo} />
}

export default Clientes

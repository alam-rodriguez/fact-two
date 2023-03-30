import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ID
import { v4 as uuidv4 } from 'uuid';

import { MdOutlineArrowBack } from 'react-icons/md';

// Firebase 
import { agregarCategoria } from '../../firebase/firebase'

// Context
import { AppContext } from '../../context/AppContext';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';


const AgregarCategoria = () => {

  const navigate = useNavigate();

  const { view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

  useEffect( () => {
    if(emailUser == null){
      navigate('/articulos');
    }
  }, [] );

  const [newCategory, setNewCategory] = useState({
    categoria: '',
    color: 'bg-secondary',
  })


  const handleClick = (e) => {
    borrarSeleccionado();
    e.target.classList.add('border', 'border-5', 'border-dark');
    setNewCategory(state => ({...state, color: e.target.classList[1]}));
  } 
  const borrarSeleccionado = () => {
    const i = document.querySelectorAll('.color');
    i.forEach(i=>{
      i.classList.remove('border', 'border-5', 'border-dark')
    });
  }
  
  const handleChange = (e) => setNewCategory(state => ({...state, categoria: e.target.value}));

  const handleClickGuardar = async () => {
    
    const res = await agregarCategoria(`categorias-${emailUser}`, uuidv4(), newCategory);
    
    if(res == 'Categoria creada'){
      toast.success('Categoria agregada', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate('/articulos');
    }else {
      toast.error('ha ocurrido un error al intentar agregar la categoria', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    console.log(newCategory);
  }

  return (
    <main className='row m-0'>
      
      <header className='d-flex justify-content-between align-content-center bg-success p-4 shadow-lg'>
        <div className='d-flex'>
          <MdOutlineArrowBack className='fs-3 text-white mt-2' onClick={()=> navigate('/articulos')} />
          <p className='fs-3 text-white m-0'>Crear categoria</p>
        </div>
        <button className='btn bg-transparent text-white fw-medium' onClick={handleClickGuardar}>GUARDAR</button>
      </header>
      
      <section className='row col-12 d-flex justify-content-center p-0 mx-auto'>
        <div className='bg-light shadow-lg col-12 col-sm-8 mt-0 mt-sm-2 m-auto p-3'>
          {/* <p>El nombre de la categoria</p>
          <input type="text" className='btn text-start form-control rounded-0 border-0 border-bottom' /> */}
          <div className="form-floating mb-3">
            <input type="email" className="btn text-start form-control rounded-0 border-0 border-bottom fs-3" id="floatingInput" placeholder="name@example.com" onChange={handleChange} />
            <label htmlFor="floatingInput">Email address</label>
          </div>

          <p className='text-success fs-6'>Color de categoria</p>
          <div className='d-flex flex-wrap'>
            <div className='color bg-secondary m-3' style={{width: 50, height:50}} onClick={handleClick}></div>
            <div className='color bg-danger m-3' style={{width: 50, height:50}} onClick={handleClick}></div>
            <div className='color bg-danger-subtle m-3' style={{width: 50, height:50}} onClick={handleClick}></div>
            <div className='color bg-warning m-3' style={{width: 50, height:50}} onClick={handleClick}></div>
            <div className='color bg-success-subtle m-3' style={{width: 50, height:50}} onClick={handleClick}></div>
            <div className='color bg-success m-3' style={{width: 50, height:50}} onClick={handleClick}></div>
            <div className='color bg-primary m-3' style={{width: 50, height:50}} onClick={handleClick}></div>
            <div className='color bg-info m-3' style={{width: 50, height:50}} onClick={handleClick}></div>
          </div>
          <hr className='w-100' />

          <div className='row p-3 d-flex justify-content-evenly'>
            <button type="button" className="btn btn-outline-success col-5 rounded-0 py-3 fw-medium">ASIGNAR ARTICULOS</button>
            <button type="button" className="btn btn-outline-success col-5 rounded-0 py-3 fw-medium">CREAR ARTICULO</button>
          </div>
        
        </div>
        
      </section>
    </main>
  )
}

export default AgregarCategoria;
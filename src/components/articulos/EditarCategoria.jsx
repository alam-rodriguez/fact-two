import React, { useContext, useEffect, useState } from 'react';

// React router dom
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../context/AppContext';

// ID
import { v4 as uuidv4 } from 'uuid';

// React icons
import { MdOutlineArrowBack } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';

// Firebase 
import { actualizarCategoria, borrarCategoria } from '../../firebase/firebase';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';

const EditarCategoria = () => {

    const navigate = useNavigate();

    const {categoriaSelected, setCategoriaSelected, emailUser} = useContext(AppContext);

    const [editCategoria, setEditCategoria] = useState({});

    const [categoriaActualizada, setCategoriaActualizada] = useState('');
    const [colorActualizado, setColorActualizado] = useState('');
    
    useEffect( () => {
        // setEditCategoria(categoriaSelected);
        // console.log(categoriaSelected.color)
        if(categoriaSelected == null){
            navigate('/articulos');
        }else {
            document.querySelector(`.color.${categoriaSelected.color}`).click();
            setCategoriaActualizada(categoriaSelected.categoria);
            setColorActualizado(categoriaSelected.color);
        }
        const getCategoria = async () => {
        }
        getCategoria();
    }, [] );




    const [newCategory, setNewCategory] = useState({
        categoria: '',
        color: 'bg-secondary',
      })
    
      const handleClick = (e) => {
        borrarSeleccionado();
        e.target.classList.add('border', 'border-5', 'border-dark');
        setColorActualizado(e.target.classList[1]);
      } 
      const borrarSeleccionado = () => {
        const i = document.querySelectorAll('.color');
        i.forEach(i=>{
          i.classList.remove('border', 'border-5', 'border-dark')
        });
      }
      
      const handleChange = (e) => setCategoriaActualizada(e.target.value)
      
    //   setNewCategory(state => ({...state, categoria: e.target.value}));
    
      const handleClickGuardar = async () => {
        // const res = await agregarCategoria(`categorias-${emailUser}`, uuidv4(), newCategory);
        // if(res == 'Categoria creada'){
        //   navigate('/articulos')
        // }
        const res = await actualizarCategoria(emailUser, categoriaSelected.id, categoriaActualizada, colorActualizado);
        if(res == 'categoria actualizada'){
          navigate('/articulos');
          toast.success('Categoria actualizada', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        }else {
          navigate('/articulos');
          toast.error('ha ocurrido un error, no se a poddo actualizar la categoria', {
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
        // console.log(categoriaActualizada, colorActualizado);
        

        
      }

      const handleClickBorrar = async () => {
        await borrarCategoria(emailUser, categoriaSelected.id);
        toast('Categoria borrada', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate('/articulos')
        // console.log(categoriaSelected.id);
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
      
      <section className='row d-flex justify-content-center p-0 mx-auto'>
        <div className='bg-light shadow-lg col-12 col-sm-8 mt-0 mt-sm-3 p-3 border'>
          {/* <p>El nombre de la categoria</p>
          <input type="text" className='btn text-start form-control rounded-0 border-0 border-bottom' /> */}
          <div className="form-floating mb-3">
            <input type="email" className="btn text-start form-control rounded-0 border-0 border-bottom fs-3" id="floatingInput" placeholder="name@example.com" onChange={handleChange} value={categoriaActualizada} />
            <label htmlFor="floatingInput">Categoria</label>
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

        <button className='d-flex justify-content-center align-items-center bg-light shadow-lg col-12 col-sm-8 mt-3 p-3 border gap-2' onClick={handleClickBorrar}>
          <IoMdTrash className='fs-4 text-secondary' />
          <p className='m-0'>ELIMINAR CATEGORIA</p>
        </button>
        
      </section>
    </main>
  )
}

export default EditarCategoria;

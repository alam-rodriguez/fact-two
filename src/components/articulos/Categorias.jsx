import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

// React Icons
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch, AiOutlineUnorderedList } from 'react-icons/ai';
import { TbLayersSubtract } from 'react-icons/tb';
import { IoIosAddCircle } from 'react-icons/io';
import { MdOutlineArrowBack } from 'react-icons/md';

// Firebase
import { obtenerCategoria } from '../../firebase/firebase';

// Context
import { AppContext } from '../../context/AppContext';

const Categorias = ({setViewArticulos}) => {

    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([]);

  const { design, categoriaSelected, setCategoriaSelected, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos } = useContext(AppContext);


  useEffect( () => {
    const getDocs = async () => {
      // console.log( await obtenerCategoria(`categorias-${emailUser}`) )
      setCategorias( await obtenerCategoria(`categorias-${emailUser}`) );
    }
    getDocs();
  }, [] );

  const handleClickCategoria = (categoria) => {
    setCategoriaSelected(categoria);
    navigate('/articulos/editar-categoria');
  }

  if(design == 'computer'){
    return (
      <div>
          <header className='d-flex justify-content-between bg-success p-4 shadow-lg'>
            <p className='fs-3 m-0 ms-4 text-white'>Categorias</p>
            <AiOutlineSearch className='text-white fs-2' />
          </header>
          <section>
            <ul className='p-4'>
              { categorias.length > 0 ?
                  categorias.map((categoria)=>(
                    <li key={categoria.id} className='d-flex my-3' onClick={()=>handleClickCategoria(categoria)}>
                      <div className={`${categoria.color} rounded-circle mt-1 col-2`} style={{height: 30, width:30}}></div>
                      <div className='ms-3 border-0 border-bottom col-10'>
                        <p className='m-0 fw-medium'>{categoria.categoria}</p>
                        <p className='m-0'>x articulos</p>
                      </div>
                    </li>  
                ))
              : 
                <>
                  <p>No hay categorias</p>  
                </>
              }
            </ul>
            <IoIosAddCircle className='text-success position-absolute bottom-0 end-0 m-4' style={{fontSize: 50}} onClick={()=>navigate('/categorias/agregar-categoria')}/>
  
          </section>
          <div>
          </div>
          
      </div>
    )
  }else if(design == 'mobile'){
    return (
      <div>
          <header className='d-flex justify-content-between bg-success p-4 shadow-lg'>
            <div className='d-flex align-items-center'>
              <MdOutlineArrowBack className='fs-3 text-white' onClick={()=>setViewArticulos(0)} />
              <p className='fs-3 m-0 ms-4 text-white'>Categorias</p>
            </div>
            <AiOutlineSearch className='text-white fs-2' />
          </header>
          <section>
            <ul className='p-4'>
              { categorias.length > 0 ?
                  categorias.map((categoria)=>(
                    <li key={categoria.id} className='d-flex my-3' onClick={()=>handleClickCategoria(categoria)}>
                      <div className={`${categoria.color} rounded-circle mt-1 col-2`} style={{height: 30, width:30}}></div>
                      <div className='ms-3 border-0 border-bottom col-10'>
                        <p className='m-0 fw-medium'>{categoria.categoria}</p>
                        <p className='m-0'>x articulos</p>
                      </div>
                    </li>  
                ))
              :null
              }
            </ul>
            <IoIosAddCircle className='text-success position-absolute bottom-0 end-0 m-4' style={{fontSize: 50}} onClick={()=>navigate('/categorias/agregar-categoria')}/>
  
          </section>
          <div>
          </div>
          
      </div>
    )
  }
}

export default Categorias

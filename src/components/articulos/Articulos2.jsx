import React, { useContext, useEffect, useState } from 'react';

// React Icons
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch, AiOutlineUnorderedList } from 'react-icons/ai';
import { TbLayersSubtract } from 'react-icons/tb';
import { IoIosAddCircle } from 'react-icons/io';
import { MdOutlineArrowBack } from 'react-icons/md';

// React Router Dom
import { useNavigate } from 'react-router-dom'

// Context
import { AppContext } from '../../context/AppContext';

// Firebase
import { obtenerTodosArticulos } from '.././../firebase/firebase';

// Componentes
import ArticulosView from './ArticulosView';

const Articulos2 = ({setViewArticulos}) => {
  const navigate = useNavigate();

  const { design, categorias, setCategorias, emailUser } = useContext(AppContext);

  const [articulos, setArticulos] = useState(null);

  useEffect(()=>{
    const getInfo = async () => {
      setArticulos( await obtenerTodosArticulos(emailUser) );
      console.log(await obtenerTodosArticulos(emailUser))
      // console.log(await obtenerTodosArticulos(emailUser))
      // console.log( await obtenerCategoria(`categorias-${emailUser}`) )
    }
    getInfo();
    // console.log(categorias);
    console.log(design)
  }, [] );

  // useEffect(()=>{
  //   console.log(articulos)
  // }, [articulos] );

  if(design == 'computer'){
    return (
      <div>
        <header className='d-flex justify-content-between align-items-center bg-success p-4 shadow-lg' style={{height:67}}>
            <select name="" id="" className='bg-transparent border-0 text-white fs-3 p-0'>
              <option value="todos los articulos">Todos los articulos</option>
            </select>
            <AiOutlineSearch className='text-white fs-2' />
          </header>
  
          <IoIosAddCircle className='text-success position-absolute bottom-0 end-0 m-4' style={{fontSize: 50}} onClick={()=>navigate('/categorias/agregar-articulo')}/>
  
          <section className='p-3'>
            { articulos != null ?
              articulos.map((articulo, i)=>(
                <ArticulosView key={articulo.id} articulo={articulo} />
              ))
            : 
              <>
                <p>No hay articulos</p>  
              </>
            }
  
          </section>
      </div>
    )
  }else if(design == 'mobile'){
    return (
      <div>
        <header className='d-flex justify-content-between align-items-center bg-success p-4 shadow-lg' style={{height:67}}>
          <div className='d-flex align-items-center'>
            <MdOutlineArrowBack className='fs-3 text-white' onClick={()=>setViewArticulos(0)} />
            <select name="" id="" className='bg-transparent border-0 text-white fs-3 p-0 d-flex ms-4'>
              <option value="todos los articulos">Todos los articulos</option>
            </select>
          </div>
          <AiOutlineSearch className='text-white fs-2' />
        </header>
  
        <IoIosAddCircle className='text-success position-absolute bottom-0 end-0 m-4' style={{fontSize: 50}} onClick={()=>navigate('/categorias/agregar-articulo')}/>
  
        <section className='p-3'>
          { articulos != null ?
            articulos.map((articulo, i)=>(
              <ArticulosView key={articulo.id} articulo={articulo} />
            ))
          : 
            <p>No hay articulos</p>    
            }
  
        </section>
      </div>
    )
  }
}

export default Articulos2;

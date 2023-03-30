import React, { useContext, useEffect } from 'react';

// React Icons
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch, AiOutlineUnorderedList } from 'react-icons/ai';
import { TbLayersSubtract } from 'react-icons/tb';

// Context
import { AppContext } from '../context/AppContext';

// Menu
import Menu from './Menu';

// Coponentes
import Articulos2 from './articulos/Articulos2';
import Categorias from './articulos/Categorias';

// React Router Dom
import { useNavigate } from 'react-router-dom';

// Hooks
import useScreenSize from './hooks/useScreenSize';

const Articulos = () => {
  const navigate = useNavigate();
  const { design, setDesign, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

  useEffect( () => {
    if( emailUser == null){
        navigate('/registrar');
    }
    setviewMenu(false);
  }, [emailUser] );

  const { width, height} = useScreenSize();
	useEffect(()=>{
		// Establecer design
		if(width < 576) setDesign('mobile');
		else setDesign('computer');
	}, [width] );

  // useEffect( () => {
  //   console.log(emailUser);
  //   setviewMenu(false);
  // }, [] );



  const handleClickMenu = () => {
    setviewMenu(true);
  }

  if(design == 'computer'){
    return (
      <main className='row m-0'>
        <Menu />
        <section className='col-sm-4 p-0 min-vh-100 border-0 border-end'>
          <header className='d-flex bg-success p-4 shadow-lg'>
            <FaBars className='fs-3 mt-2 ms-3 text-white' onClick={handleClickMenu} />
            <p className='fs-3 m-0 ms-4 text-white'>Articulos</p>
          </header>
          <ul className='py-3'>
            <li className='d-flex' onClick={()=>setViewArticulos(0)}>
              <AiOutlineUnorderedList className='fs-3 m-2' />
              <p className='border-0 border-bottom ms-3 fs-5 p-2 w-100'>Articulos</p>
            </li>
            <li className='d-flex' onClick={()=>setViewArticulos(1)}>
              <TbLayersSubtract className='fs-3 m-2' />
              <p className='border-0 border-bottom ms-3 fs-5 p-2 w-100'>Categorias</p>
            </li>
          </ul>
  
        </section>
        <section className='col-sm-8 p-0'>
          { viewArticulos == 0 ?
            <Articulos2 />
          :
            <Categorias />  
          }
        </section>
      </main>
    )
  }else if(design == 'mobile'){
    return (
      <main className='row m-0'>
        { (viewArticulos != 1 && viewArticulos != 2) ? 
          <>
          <Menu />
          <section className='col-sm-4 p-0 min-vh-100 border-0 border-end'>
            <header className='d-flex bg-success p-4 shadow-lg'>
              <FaBars className='fs-3 mt-2 ms-3 text-white' onClick={handleClickMenu} />
              <p className='fs-3 m-0 ms-4 text-white'>Articulos</p>
            </header>
            <ul className='py-3'>
              <li className='d-flex' onClick={()=>setViewArticulos(1)}>
                <AiOutlineUnorderedList className='fs-3 m-2' />
                <p className='border-0 border-bottom ms-3 fs-5 p-2 w-100'>Articulos</p>
              </li>
              <li className='d-flex' onClick={()=>setViewArticulos(2)}>
                <TbLayersSubtract className='fs-3 m-2' />
                <p className='border-0 border-bottom ms-3 fs-5 p-2 w-100'>Categorias</p>
              </li>
            </ul>
          </section>
        </>
        : <></>
        }
        
        <section className='col-sm-8 p-0'>
          { (viewArticulos == 1) ?
            <Articulos2 setViewArticulos={setViewArticulos} />
          : (viewArticulos == 2) ?
            <Categorias setViewArticulos={setViewArticulos} />  
          : <></>
          }
        </section>
      </main>
    )
  }
}

export default Articulos;

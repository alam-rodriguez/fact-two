// React
import React, { useContext } from 'react';

// React Router Dom
import { Link, useNavigate } from 'react-router-dom';

// React Icon 
import { MdShoppingBasket, MdReceipt } from 'react-icons/md';
import { AiOutlineUnorderedList, AiOutlineInfoCircle } from 'react-icons/ai';
import { IoMdSettings } from 'react-icons/io';
import { TbApps } from 'react-icons/tb';

// Context
import { AppContext } from '../context/AppContext';

const Menu = () => {

  const navigate = useNavigate();

  const { view, setView, emailUser, setEmailUser, viewMenu, setviewMenu } = useContext(AppContext);

  if( viewMenu ){
    return (
      <div className='d-flex position-absolute vw-100 vh-100 z-3 p-0'>
        <nav className='position-absolute bg-white p-0 min-vh-100 shadow-lg z-3' style={{width:250}}>
          <header className='bg-success p-4'>
            <p className='text-white m-0 mb-2 fw-bold'>Alam Rodriguez</p>
            <p className='text-white m-0'>Pizzeria</p>
            <p className='text-white m-0'>Pizza mia suc.guerra</p>
          </header>
          <ul className='p-4 pt-0 pb-0'>
            <li className='d-flex my-4'>
              <MdShoppingBasket className='fs-4' />
              <Link className='fs-6 ms-4 fw-medium text-decoration-none text-black' to='/ventas'>ventas</Link>
            </li>
            <li className='d-flex my-4'>
              <MdReceipt className='fs-4' />
              <Link className='fs-6 ms-4 fw-medium text-decoration-none text-black' to='/recibos'>Recibos</Link>
            </li>
            <li className='d-flex my-4'>
              <AiOutlineUnorderedList className='fs-4' />
              <Link className='fs-6 ms-4 fw-medium text-decoration-none text-black' to='/articulos'>Articulos</Link>
            </li>
            <li className='d-flex my-4'>
              <IoMdSettings className='fs-4' />
              <Link className='fs-6 ms-4 fw-medium text-decoration-none text-black' to='/configuracion'>Configuracion</Link>
            </li>
          </ul>
          <hr />
          <ul className='p-4 pt-1 pb-0'>
            <li className='d-flex my-3'>
              <Link className='d-flex text-decoration-none text-black' to='https://curriculum-alam-rodriguez.netlify.app/'>
                <MdShoppingBasket className='fs-4' />
                <p className='fs-6 ms-4 fw-medium'>Back office</p>
              </Link>
            </li>
            <li className='d-flex my-3'>
              <Link className='d-flex text-decoration-none text-black' to='https://curriculum-alam-rodriguez.netlify.app/'>
                <TbApps className='fs-4' />
                <p className='fs-6 ms-4 fw-medium'>Apps</p>
              </Link>
            </li>
            <li className='d-flex my-3'>
              <Link className='d-flex text-decoration-none text-black' to='https://curriculum-alam-rodriguez.netlify.app/'>
                <AiOutlineInfoCircle className='fs-4' />
                <p className='fs-6 ms-4 fw-medium'>Soporte</p>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className='w-100 bg-black opacity-25' onClick={()=>setviewMenu(false)}>

        </div>
      </div>
      )
  }else {
    <></>
  }
}

export default Menu;

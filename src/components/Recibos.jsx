import React, { useContext, useEffect, useState } from 'react';

// React router dom
import { useNavigate } from 'react-router-dom'

// React Icons
import { AiOutlineSearch } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi'
import { MdOutlineArrowBack } from 'react-icons/md';

// Context
import { AppContext } from '../context/AppContext';

// Menu
import Menu from './Menu';

// Componente
import ReciboItem from './Recibos/ReciboItem';
import FacturaRecibo from './Recibos/FacturaRecibo';

// Firebase
import { obtenerRecibo } from '../firebase/firebase';

// Hooks
import useScreenSize from './hooks/useScreenSize';

const Recibos = () => {

  const { design, setDesign,view, setView, emailUser, setEmailUser, viewMenu, setviewMenu } = useContext(AppContext);

  const [recibos, setRecibos] = useState([]);

  const navigate = useNavigate();

  const [fecha, setFecha] = useState('');

  const [reciboSelected, setReciboSelected] = useState(null);
  const [i, setI] = useState(0);

  const { width, height} = useScreenSize();
	useEffect(()=>{
		// Establecer design
		if(width < 576) setDesign('mobile');
		else setDesign('computer');
	}, [width] );

  useEffect( () => {
    if( emailUser == null){
        navigate('/registrar');
    }
    const getInfo = async () => {
      setRecibos( await obtenerRecibo(emailUser) );
    }
    getInfo();

    setviewMenu(false);

    setFecha(new Date().toLocaleDateString())
}, [emailUser] );

    useEffect( () => {
        setviewMenu(false);
    }, [] );

    const handleClickMenu = () => {
        setviewMenu(true);
    }

    useEffect( () => {
      // console.log(reciboSelected);
    }, [reciboSelected])

  if(design == 'computer'){
    return (
      <main className='row'>
        <section className='col-12 col-sm-4 p-0'>
        <Menu />
          <header className='d-flex bg-success p-4 shadow-lg'>
            <FaBars className='fs-3 mt-2 ms-3 text-white' onClick={handleClickMenu} />
            <p className='fs-3 m-0 ms-4 text-white'>Recibos</p>      
          </header>
  
          <div>
            <div className='d-flex p-2 border-0 border-bottom align-items-center'>
              <AiOutlineSearch className='fs-4 ms-3' />
              <input type="text" className='btn bg-transparent border-0 rounded-0 text-start' placeholder='Buscar' />
            </div>
            <p className='text-success border-0 border-bottom ms-3 m-0 p-2'>{fecha}</p>
            <ul>
              { recibos.length > 0 ? 
                recibos.map((recibo, i)=>(
                  <ReciboItem key={recibo.id} recibo={recibo} i={i} setReciboSelected={setReciboSelected} setI={setI} />
                ))
              : <></>
              }
            </ul>
          </div>
          
        </section>
  
        <section className='col-12 col-sm-8 p-0 min-vh-100 border-0 border-start border-dark-subtle bg-secondary-subtle'>
          <header className='d-flex justify-content-between bg-success p-4 shadow-lg'>        
            <p className='fs-3 m-0 ms-4 text-white'>#</p>
            <div>
              <button className='btn bg-transparent border-0 text-white fw-medium'>REEMBOLSO</button>
              <FiMoreVertical className='fs-3 text-white' />
            </div>
          </header>
  
          { reciboSelected != null ? 
            <FacturaRecibo i={i} reciboSelected={reciboSelected} />
          :<></>}
  
        </section>
      </main>
    )
  }else if(design == 'mobile'){
    return (
      <main className='row'>
        { reciboSelected == null ?
          <section className='col-12 col-sm-4 p-0'>
          <Menu />
            <header className='d-flex bg-success p-4 shadow-lg'>
              <FaBars className='fs-3 mt-2 ms-3 text-white' onClick={handleClickMenu} />
              <p className='fs-3 m-0 ms-4 text-white'>Recibos</p>      
            </header>
    
            <div>
              <div className='d-flex p-2 border-0 border-bottom align-items-center'>
                <AiOutlineSearch className='fs-4 ms-3' />
                <input type="text" className='btn bg-transparent border-0 rounded-0 text-start' placeholder='Buscar' />
              </div>
              <p className='text-success border-0 border-bottom ms-3 m-0 p-2'>{fecha}</p>
              <ul className='p-0'>
                { recibos.length > 0 ? 
                  recibos.map((recibo, i)=>(
                    <ReciboItem design={design} key={recibo.id} recibo={recibo} i={i} setReciboSelected={setReciboSelected} setI={setI} />
                  ))
                : <></>
                }
            </ul>
            </div>
            
          </section>
        : <></> 
        }

        { reciboSelected != null ?
          <section className='col-12 col-sm-8 p-0 min-vh-100 border-0 border-start border-dark-subtle bg-secondary-subtle'>
            <header className='d-flex justify-content-between align-items-center bg-success p-4 shadow-lg'>        
              {/* <p className='fs-3 m-0 ms-4 text-white'>#</p> */}
              <MdOutlineArrowBack className='fs-3 text-white' onClick={()=>setReciboSelected(null)} />
              <div>
                <button className='btn bg-transparent border-0 text-white fw-medium'>REEMBOLSO</button>
                <FiMoreVertical className='fs-3 text-white' />
              </div>
            </header>

            {/* { reciboSelected != null ?  */}
              <FacturaRecibo i={i} reciboSelected={reciboSelected} />
            {/* // :<></>} */}

          </section>
        : <></>
        }
  
      </main>
    )
  }
}

export default Recibos

// React
import React, { useContext, useEffect, useState } from 'react';

// React Icons
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdPersonAdd, IoIosCash, IoMdMore, IoLogoNpm } from 'react-icons/io';
import { MdOutlineArrowBack } from 'react-icons/md';
import { BsCardHeading } from 'react-icons/bs'

// Cotext
import { AppContext } from '../context/AppContext';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { crearUsuario, iniciarSesion, auth } from '../firebase/firebase';

// Firebase
import { obtenerCategoria, obtenerArticulos, obtenerCategoriaYArticulos } from '../firebase/firebase'

// Componentes
import Menu from './Menu';
import Clientes from './ventas/Clientes';
import Articulos from './ventas/Articulos';
import ArticuloInfo from './ventas/ArticuloInfo';
import Pedido from './ventas/Pedido';

// React Router
import { useNavigate } from 'react-router-dom';
import { BsCardText, BsCashStack } from 'react-icons/bs';

// Hooks
import useScreenSize from './hooks/useScreenSize';

const Ventas2 = () => {

    const navigate = useNavigate();

    const { design, setDesign, pedido, setPedido, userSelected, setUserSelected, articulos, setArticulos,categorias, setCategorias, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

    const [CatidadAPagar, setCatidadAPagar] = useState(0);

    const [data, setData] = useState(null);

    const [set, setSet] = useState(false);

    const [viewAriculo, setViewAriculo] = useState(false);

	const { width, height} = useScreenSize();

	useEffect(()=>{
		// Establecer design
		if(width < 576) setDesign('mobile');
		else setDesign('computer');
	}, [width] );

    useEffect( () => {
        if( emailUser == null){
            navigate('/registrar');
        }else {
            const getDocs = async () => {
                setCategorias( await obtenerCategoria(`categorias-${emailUser}`) );
            }
            getDocs();
        }
        setviewMenu(false);

        
    }, [emailUser] );

    // useEffect(()=>{
    //     const data = [];
    //     // console.log(categorias)
    //     categorias.map( async (element) => {
    //         const res = await obtenerArticulos(emailUser, element.categoria);
    //         // console.log(res);
    //         if( res.length > 0){
    //             res.map((item) => (
    //                 // console.log(item)
    //                 // data.push(item)
    //                 setArticulos(state => ([...state, item]))
    //             ))
                
    //             // data.push( res );
    //             // console.log(res)
    //         }
    //         // console.log(res)
    //         // const res = await obtenerArticulos(emailUser, element.categoria);
    //         // data.push( res );
    //         // console.log(element.categoria);
    //         // console.log(articulos)
    //     });
    //     // setArticulos(data);
    //     setViewAriculo(true)

    // }, [categorias] );

    if(articulos){
        // console.log(articulos[0])
    }

    // useEffect( () => { 
    //         console.log(articulos)
    // }, [articulos] );

    const handleClickMenu = () => {
        setviewMenu(true);
    }

	const handleClickUser = () => {
        if( userSelected == null){
            setViewUser(true);
        }else {
            setViewUser(3)
        }
	}

    const handleClickBack = () => {
        navigate('/ventas');
    }

    useEffect(()=>{
        // setCatidadAPagar(pedido.total);
        console.log(pedido);
    }, [] );

    // Para modificar cantidad a pagar
    const handleChangeCantidadAPagar = e => setCatidadAPagar(e.target.value);

    const handleClickCobrar = () => {
        navigate('/ventas/ventas3');
    }


  if(design == 'computer'){
    return (
        <main className='row m-0'>
            {/* <Menu /> */}
            <Clientes />
            {/* <ArticuloInfo /> */}
            
            <section className='col-12 col-sm-4 p-0 bg-white order-last order-sm-first border-0 border-top'>
                <header className='d-flex justify-content-between bg-white p-4 shadow'>
                    <p className='fs-3 m-0 text-black fw-bold'>Ticket</p>
                    <IoMdPersonAdd className='fs-3 mt-2 me-0' onClick={handleClickUser} />  
                </header>
                <p className='py-2 px-3 fw-medium border-0 border-bottom'>{pedido.lugar}</p>
                <div className='este'>
                    <Pedido />
                    {/* <Articulos articulos={articulos} /> */}
                            
                </div>
                
            </section>
            <section className='col-12 col-sm-8 p-0 shadow-lg  min-vh-100 d-flex flex-column'>
                <header className='d-flex justify-content-between align-items-center bg-success p-4 shadow-sm' style={{height: 65}}>    
                    <MdOutlineArrowBack className='fs-3 text-white' onClick={handleClickBack} />
                    <p className='fs-4 fw-medium ms-2 m-0 text-white'>DIVIDIR</p>
                </header>
                <div>
                    <div className='d-flex flex-column align-items-center my-4'>
                        <p className='fw-medium fs-2 m-0'>{pedido.totaldefinitivo}.00</p>
                        <p className='text-secondary m-0'>Catidad total a pagar</p>
                    </div>
                </div>
                
                <div className='p-3'>
                    <p className='text-success'>Efectivo recibido</p>
                    <div>
                        <div className='row gap-3'>
                            <IoIosCash className='fs-4 col-1 mt-2' />
                            <input type="number" className='btn bg-transparent border-0 border-bottom rounded-0 col-7 text-start ps-0' value={CatidadAPagar} onChange={handleChangeCantidadAPagar}/>
                            <button className='border p-2 col-3' onClick={handleClickCobrar}>COBRAR</button>
                        </div>
                        <div className='row gap-4 p-3 mt-3'>
                            <button className='border p-2 col '>500</button>
                            <button className='border p-2 col '>1000</button>
                            <button className='border p-2 col '>1500</button>
                            <button className='border p-2 col '>2000</button>
                        </div>
                    </div>
    
                    <button className='w-100 d-flex border align-items-center justify-content-center p-3 mt-5 gap-2' onClick={handleClickCobrar}>
                        <BsCardHeading className='fs-4' />
                        <p className='m-0'>TRANSFERENCIA</p>
                    </button>
    
                </div>
    
            </section>
        </main>
      )
  }else if(design == 'mobile'){
		return (
			<main className='row m-0'>
			<Clientes />				
			{/* <section className='col-12 col-sm-4 p-0 bg-white order-last order-sm-first border-0 border-top'>
				<header className='d-flex justify-content-between bg-white p-4 shadow'>
					<p className='fs-3 m-0 text-black fw-bold'>Ticket</p>
					<IoMdPersonAdd className='fs-3 mt-2 me-0' onClick={handleClickUser} />  
				</header>
				<p className='py-2 px-3 fw-medium border-0 border-bottom'>{pedido.lugar}</p>
				<div className='este'>
					<Pedido />						
				</div>
			</section> */}

			<section className='col-12 col-sm-8 p-0 shadow-lg  min-vh-100 d-flex flex-column'>
				<header className='d-flex justify-content-between align-items-center bg-success p-4 shadow-sm' style={{height: 65}}>    
					<MdOutlineArrowBack className='fs-3 text-white' onClick={handleClickBack} />
									<p className='fs-4 fw-medium ms-2 m-0 text-white'>DIVIDIR</p>
							</header>
							<div>
									<div className='d-flex flex-column align-items-center my-4'>
											<p className='fw-medium fs-2 m-0'>{pedido.totaldefinitivo}.00</p>
											<p className='text-secondary m-0'>Catidad total a pagar</p>
									</div>
							</div>
							
							<div className='p-3'>
									<p className='text-success'>Efectivo recibido</p>
									<div>
											{/* <div className='row gap-3'> */}
													{/* <IoIosCash className='fs-4 col-1 mt-2' /> */}
													<input type="number" className='btn bg-transparent border-0 border-bottom rounded-0 col-12 mx-auto text-start ps-0' value={CatidadAPagar} onChange={handleChangeCantidadAPagar}/>
											{/* </div> */}
											<button className='border p-3 col-12 mt-4 mx-auto d-flex justify-content-center align-items-center gap-2' onClick={handleClickCobrar}>
												<IoIosCash className='fs-4' />
												<p className='m-0'>COBRAR</p>
											</button>
											{/* <div className='row gap-4 p-3 mt-3'>
													<button className='border p-2 col '>500</button>
													<button className='border p-2 col '>1000</button>
													<button className='border p-2 col '>1500</button>
													<button className='border p-2 col '>2000</button>
											</div> */}
									</div>
	
									<button className='col-12 d-flex border align-items-center justify-content-center p-3 mt-5 gap-2' onClick={handleClickCobrar}>
											<BsCardHeading className='fs-4' />
											<p className='m-0'>TRANSFERENCIA</p>
									</button>
	
							</div>
	
					</section>
			</main>
		)
	}
}

export default Ventas2;

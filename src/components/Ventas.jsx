// React
import React, { useContext, useEffect, useState } from 'react';

// React Icons
import { FaBars } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdPersonAdd, IoMdMore, IoLogoNpm } from 'react-icons/io'

// Cotext
import { AppContext } from '../context/AppContext';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { crearUsuario, iniciarSesion, auth, obtenerTodosArticulos } from '../firebase/firebase';
import { BiNotification } from 'react-icons/bi';

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

// Hooks
import useScreenSize from './hooks/useScreenSize';

const Ventas = () => {

    const navigate = useNavigate();

    const { design, setDesign, pedido, setPedido, userSelected, setUserSelected,ordenCurrent, categorias, setCategorias, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

    const [data, setData] = useState(null);

    const [set, setSet] = useState(false);

    const [viewAriculo, setViewAriculo] = useState(false);

    const [articulos, setArticulos] = useState([]);

    const { width, height} = useScreenSize();

    useEffect( () => {
        if( emailUser == null){
            navigate('/registrar');
        }else {
            const getDocs = async () => {
                // console.log(await obtenerCategoria(`categorias-${emailUser}`));
                setCategorias( await obtenerCategoria(`categorias-${emailUser}`) );
                // await obtenerCategoriaYArticulos(`categorias-${emailUser}`,`articulos-${emailUser}`)
            }
            getDocs();
        }
        setviewMenu(false);
    }, [emailUser] );

    // useEffect(()=>{
    //     let data = [];
    //     // console.log(categorias);
    //     // let articulos = [];
    //     categorias.map( async (element) => {

    //         // console.log(element);
            
    //         const res = await obtenerArticulos(emailUser, element.id);
    //         // console.log(res)
    //         // console.log(res);
    //         setArticulos([]);
    //         // if( res.length > 0){
    //             res.map((item) => {
    //                 console.log(item)
    //                 // data.push(item)
    //                 // setArticulos(state => ([...state, item]))
    //             })
                
    //             // data.push( res );
    //             // console.log(res)
    //         // }
    //         // console.log(res)
    //         // const res = await obtenerArticulos(emailUser, element.categoria);
    //         // data.push( res );
    //         // console.log(element.categoria);
    //         // console.log(articulos)
    //     });
    //     // console.log(data)
    //     setArticulos(data)
    //     // setArticulos(data);
    //     setViewAriculo(true);

    // }, [categorias] );

		useEffect(()=>{
			// Establecer design
			if(width < 576) setDesign('mobile');
			else setDesign('computer');
		}, [width] );

    useState( () => {
        const getArticulos = async () => {
            console.log(await obtenerTodosArticulos(emailUser))
            setArticulos( await obtenerTodosArticulos(emailUser) );
        }
        getArticulos();
    }, [] );

    useEffect( () => {
        if( articulos.length > 0){
            console.log(articulos)
        }
    }, [articulos] );

    if(articulos){
        // console.log(articulos[0])
    }

    // useEffect( () => { 
    //         console.log(articulos)
    // }, [articulos] );

    useEffect(()=>{
        // console.log(window.innerWidth);
    }, [window.innerWidth] )

    const handleClickMenu = () => {
        setviewMenu(true);
    }

	const handleClickUser = () => {
        if( userSelected == null){
            setViewUser(1);
        }else {
            setViewUser(4);
        }
	}

        // if( categorias.length > 0){
        //     const getInfo = async () => {
        //          categorias.forEach(async (element) => {
        //              // console.log(element.categoria)
        //              setData(await obtenerArticulos(emailUser, element.categoria));
        //              // console.log(element);
        //          });
        //          // console.log('hola');
        //          // console.log(await obtenerArticulos(emailUser, 'Pizzas'));
        //          console.log(data)
                
        //     }
        //     getInfo(); 
        //  }

    // const hola = async (categoria) => {
    //     const res = 
    //     console.log(res);
    // }

    const handleChangeLugar = (e) => setPedido(state => ({...state, lugar: e.target.value}));

    const handleClickCobrar = () => {
        // console.log(categorias);
        console.log(pedido);
        navigate('/ventas/ventas2');
        // console.log( articulos.length )
    }

    // useEffect(() => {
    //     window.addEventListener('resize',handleResize);
    // }, []);

    // const handleResize = () => {
    //     setWidth(window.innerWidth);
    //     setHeigth(window.innerHeight);
    // }

		const [viewticket, setViewticket] = useState(false);

		const handleClickViewTicket = () => {
			setViewticket(true)
		}


  if(design == 'computer'){
		return (
			<main className='row m-0'>
			<Menu />
			<Clientes />
			<ArticuloInfo />
					
				<section className='col-12 col-sm-8 p-0'>
					<header className='d-flex justify-content-between bg-success p-4 shadow-lg'>
						<div className='d-flex'>
							<FaBars className='fs-3 mt-2 ms-3 text-white' onClick={handleClickMenu} />
							<p className='fs-3 m-0 ms-4 text-white'>Pagina 1</p>
						</div>
						<AiOutlineSearch className='fs-2 mt-2 text-white' />
					</header>
							<div className='este'>
									{/* { categorias.length > 0 ?
											categorias.map((categoria)=>(
													<div key={categoria.id}>
															<p>{categoria.categoria}</p>
															
													</div>
											))
									: null 
									} */}
									{/* { data != null ?
											// data.map((categoria)=>(
											//     <div key={categoria.id}>
											//         {categoria}
											//     </div>
											// ))
											// console.log(data)
									: null
									} */}
									
									<Articulos articulos={articulos} />
													
							</div>
							
					</section>
					<section className='position-relative col-12 col-sm-4 p-0 shadow-lg bg-white min-vh-100 d-flex flex-column'>
							<header className='d-flex justify-content-between bg-white p-4 shadow-sm'>
									<p className='fs-3 m-0 fw-bold'>Ticket</p>
									<div>
										<IoMdPersonAdd className='fs-3 mt-2 mx-3' onClick={handleClickUser} />
										<IoMdMore className='fs-3 mt-2' />
									</div>
							</header>
							<select className='btn w-100 text-start border-bottom' onChange={handleChangeLugar}>
									<option value="Comer dentro">Comer dentro</option>
									<option value="Para llevar">Para llevar</option>
									<option value="A domicilio">A domicilio</option>
							</select>
	
							<div>
									<Pedido />
							</div>
	
							<div className='d-flex position-absolute bg-black bottom-0 align-self-center mb-3 z-0 col-6 col-sm-8' style={{}}>
									<button type="button" className="btn btn-success form-control  rounded-0 fs-4 border-dark border-0 border-end py-2 z-0"><span>Tickets</span> <span>Abiertos</span></button>
									<button type="button" className="btn btn-success form-control  rounded-0 fs-4 z-0" onClick={handleClickCobrar}>Cobrar</button>
							</div>
							
					</section>
			</main>
		)
	}else if(viewticket){
		return(
			<>
				<Pedido viewticket={viewticket} setViewticket={setViewticket} />
			</>
		)
	}else if(design == 'mobile'){
		return (
			<main className='row m-0'>
			<Menu />
			<Clientes />
			<ArticuloInfo />
			<Pedido viewticket={viewticket} setViewticket={setViewticket} />
					
				<section className='col-12 col-sm-8 p-0'>
					<header className='d-flex justify-content-between bg-success p-4 shadow-lg'>
						<div className='d-flex'>
							<FaBars className='fs-3 mt-2 ms-3 text-white' onClick={handleClickMenu} />
							<p className='fs-3 m-0 ms-4 text-white' onClick={handleClickViewTicket}>Tickets</p>
							<div className='position-relative d-flex justify-content-center align-items-center ms-4' onClick={handleClickViewTicket}>
								<BiNotification className='display-5 text-white position-absolute' />
								<p className='position-absolute m-0 text-white'>{ordenCurrent.length}</p>
							</div>
						</div>
						<div>
							<IoMdPersonAdd className='fs-3 mt-2 mx-3 text-white' onClick={handleClickUser} />
							<IoMdMore className='fs-3 mt-2 text-white' />
						</div>
					</header>
					<div className='d-flex position-relative bg-black bottom-0 align-self-center mb-3 z-0 col-10 col-sm-10 mt-3 mx-auto' style={{}}>
						<button type="button" className="btn btn-success form-control  rounded-0 fs-4 border-dark border-0 border-end py-3 z-0"><span>Tickets</span> <span>Abiertos</span></button>
						<button type="button" className="btn btn-success form-control  rounded-0 fs-4 z-0" onClick={handleClickCobrar}>Cobrar</button>
					</div>
					<div className=''>
						<Articulos articulos={articulos} />
					</div>
							
					</section>
					{/* <section className='position-relative col-12 col-sm-4 p-0 shadow-lg bg-white min-vh-100 d-flex flex-column'> */}
							{/* <header className='d-flex justify-content-between bg-white p-4 shadow-sm'>
									<p className='fs-3 m-0 fw-bold'>Ticket</p>
									<div>
											<IoMdPersonAdd className='fs-3 mt-2 mx-3' onClick={handleClickUser} />
											<IoMdMore className='fs-3 mt-2' />
									</div>
							</header>
							<select className='btn w-100 text-start border-bottom' onChange={handleChangeLugar}>
									<option value="Comer dentro">Comer dentro</option>
									<option value="Para llevar">Para llevar</option>
									<option value="A domicilio">A domicilio</option>
							</select> */}
	
							
	
							
							
					{/* </section> */}
			</main>
		)
	}else {
		return <></>
	}
}

export default Ventas;

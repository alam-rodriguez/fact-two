// React
import React, { useContext, useEffect, useState } from 'react';

// ID
import { v4 as uuid} from 'uuid'

// React Icons
import { FaBars } from 'react-icons/fa';
import { AiFillPrinter, AiOutlineSearch } from 'react-icons/ai'
import { IoMdPersonAdd, IoIosCash, IoMdMore, IoLogoNpm, IoMdMail, IoMdSend } from 'react-icons/io';
import { MdOutlineArrowBack } from 'react-icons/md';
import { BsCardHeading, BsCheck2 } from 'react-icons/bs'

// Cotext
import { AppContext } from '../context/AppContext';

// Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { crearUsuario, iniciarSesion, auth } from '../firebase/firebase';

// Firebase
import { obtenerCategoria, obtenerArticulos, obtenerCategoriaYArticulos, crearRecibo } from '../firebase/firebase'

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

const Ventas3 = () => {

    const navigate = useNavigate();

    const { design, setDesign, pedido, setPedido, ordenCurrent, setOrdenCurrent, userSelected, setUserSelected, articulos, setArticulos,categorias, setCategorias, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

    const [CatidadAPagar, setCatidadAPagar] = useState(0);

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

    useEffect(()=>{
        const data = [];
        // console.log(categorias)
        categorias.map( async (element) => {
            const res = await obtenerArticulos(emailUser, element.categoria);
            // console.log(res);
            if( res.length > 0){
                res.map((item) => (
                    // console.log(item)
                    // data.push(item)
                    setArticulos(state => ([...state, item]))
                ))
                
                // data.push( res );
                // console.log(res)
            }
            // console.log(res)
            // const res = await obtenerArticulos(emailUser, element.categoria);
            // data.push( res );
            // console.log(element.categoria);
            // console.log(articulos)
        });
        // setArticulos(data);
        setViewAriculo(true)

    }, [categorias] );

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
        setCatidadAPagar(pedido.total);
    }, [] );

    // Para modificar cantidad a pagar
    const handleChangeCantidadAPagar = e => setCatidadAPagar(e.target.value);

    const handleClickGuardarPedido = async () => {

        const fecha = new Date();

        function formatoFecha(fecha, formato) {
            const map = {
                dd: fecha.getDate(),
                mm: fecha.getMonth() + 1,
                yy: fecha.getFullYear().toString().slice(-2),
                yyyy: fecha.getFullYear()
            }
        
            return formato.replace(/dd|mm|yy|yyy/gi, matched => map[matched])
        } 
        const dia = formatoFecha(fecha, 'dd-mm-yyyy');
       
        const horaf = () => {
            const hora = fecha.getHours();
            const minutos = fecha.getMinutes();
            let pm = 'p. m.';
            if(hora <= 13){
                pm = 'a. m.'
            }
            return(`${hora}:${minutos} ${pm}`);
        }
        const hora = horaf();

        
        const id = uuid();
        
        await crearRecibo( emailUser, dia, id, hora, pedido );

        setArticulos([]);
        setOrdenCurrent([]);
        setUserSelected(null);
        setPedido({
            cliente: {},
            fecha: '',
            lugar: 'Comer dentro',
            orden: {},
        });
        navigate('/ventas')
        
        console.log(pedido);

    }


  if(design == 'computer'){
		return (
			<main className='row m-0'>
					{/* <Menu /> */}
			<Clientes />
					{/* <ArticuloInfo /> */}
					
					<section className='col-12 col-sm-4 p-0 bg-white border-0 border-end border-top order-last order-sm-first'>
							<header className='d-flex justify-content-between bg-white p-4 shadow'>
									<p className='fs-3 m-0 text-black fw-bold'>Ticket</p>
									<IoMdPersonAdd className='fs-3 mt-2 me-0' onClick={handleClickUser} />  
							</header>
							<p className='py-2 px-3 fw-medium border-0 border-top border-bottom'>{pedido.lugar}</p>
							<div className='este'>
									<Pedido />        
							</div>
							
					</section>
					<section className='col-12 col-sm-8 p-0 shadow-lg min-vh-100 d-flex flex-column'>
							<header className='d-flex justify-content-between align-items-center bg-success p-4 shadow-sm' style={{height: 65}}>    
									
							</header>
	
							<div className='p-2'>
	
									<div className='d-flex gap-5 justify-content-center w-100 p-0'>
											<div className='d-flex flex-column align-items-center my-4'>
													<p className='fw-medium fs-1 m-0'>{pedido.totaldefinitivo}.00</p>
													<p className='text-secondary m-0'>Total pagado</p>
											</div>
											<hr className='border border-secondary' />
											<div className='d-flex flex-column align-items-center my-4'>
													<p className='fw-medium fs-1 m-0'>0.00</p>
													<p className='text-secondary m-0'>Cambio</p>
											</div>
									</div>
									
									<div className='p-3 mt-5 w-100'>
											<div className='border-0 border-bottom row'>
													<IoMdMail className='fs-4 col-1 p-0' />
													<input type="text" placeholder='Introducir email' className='col border-0 col'/>
													<button className='col-3 bg-transparent border-0 text-secondary'>ENVIAR RECIBO</button>
											</div>
									</div>
									<button className='d-flex mt-4 mb-5 col-11 border p-3 justify-content-center m-auto' onClick={handleClickGuardarPedido}>
											<AiFillPrinter className='fs-4' />
											<p className='m-0'>IMPRIMIR RECIBO</p>
									</button>
	
									<button className='d-flex align-items-center justify-content-center bg-success border-0 p-3 mt-5 m-3 col-11 m-auto' style={{}} onClick={handleClickGuardarPedido}>
											<BsCheck2 className='fs-3 text-white' />
											<p className='m-0 text-white'>NUEVA VENTA</p>
									</button>
									
							</div>
	
					</section>
			</main>
		)
	}else if(design == 'mobile'){
		return (
			<main className='row m-0'>
			<Clientes />
					
			<section className='col-12 col-sm-4 p-0 bg-white border-0 border-end border-top order-last order-sm-first'>
				{/* <header className='d-flex justify-content-between bg-white p-4 shadow'> */}
					{/* <p className='fs-3 m-0 text-black fw-bold'>Ticket</p> */}
					{/* <IoMdPersonAdd className='fs-3 mt-2 me-0' onClick={handleClickUser} />   */}
				{/* </header> */}
				{/* <p className='py-2 px-3 fw-medium border-0 border-top border-bottom'>{pedido.lugar}</p>
				<div className='este'>
					<Pedido />        
				</div> */}
							
			</section>
			<section className='col-12 col-sm-8 p-0 shadow-lg min-vh-100 d-flex flex-column'>
				<header className='d-flex justify-content-between align-items-center bg-success p-4 shadow-sm' style={{height: 65}}>    
									
				</header>
	
				<div className='p-2'>
	
					<div className='d-flex gap-5 justify-content-center w-100 p-0'>
						<div className='d-flex flex-column align-items-center my-4'>
							<p className='fw-medium fs-1 m-0'>{pedido.totaldefinitivo}.00</p>
							<p className='text-secondary m-0'>Total pagado</p>
						</div>
						<hr className='border border-secondary' />
						<div className='d-flex flex-column align-items-center my-4'>
							<p className='fw-medium fs-1 m-0'>0.00</p>
							<p className='text-secondary m-0'>Cambio</p>
						</div>
					</div>
									
					<div className='d-flex justify-content-between p-0 mt-5 col-11 mx-auto row'>
						<div className='border-0 border-bottom row col-11 p-0'>
							<IoMdMail className='fs-4 col-1 p-0' />
							<input type="text" placeholder='Introducir email' className='col border-0 col'/>
							{/* <button className='col-3 bg-transparent border-0 text-secondary'>ENVIAR RECIBO</button> */}
						</div>
						<IoMdSend className='text-secondary col-1 fs-3' />
					</div>
									{/* <button className='d-flex mt-4 mb-5 col-11 border p-3 justify-content-center m-auto' onClick={handleClickGuardarPedido}>
											<AiFillPrinter className='fs-4' />
											<p className='m-0'>IMPRIMIR RECIBO</p>
									</button>
	 */}
									<button className='d-flex align-items-center justify-content-center bg-success border-0 p-3 mt-5 m-3 col-11 m-auto' style={{}} onClick={handleClickGuardarPedido}>
											<BsCheck2 className='fs-3 text-white' />
											<p className='m-0 text-white'>NUEVA VENTA</p>
									</button>
									
							</div>
	
					</section>
			</main>
		)
	}
}

export default Ventas3;

import React, { useContext, useEffect, useState } from 'react'

// React Icons
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { IoMdArrowBack, IoMdMail } from 'react-icons/io';
import { HiUser } from 'react-icons/hi';
import { MdLocalPhone, MdLocationOn, MdSpeakerNotes } from 'react-icons/md';
import { BsPlusSquareFill } from 'react-icons/bs'


import { AppContext } from '../../context/AppContext';
import CrearCliente from './CrearCliente';

const ArticuloInfo = () => {
    const { ordenCurrent, setOrdenCurrent,articuloSelect, setArticuloSelect,emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, } = useContext(AppContext);

    const [orden, setOrden] = useState({
			nombre: '',
			cantidad: 1,
			nota: '',
		});
    const [orderAdicional, setOrderAdicional] = useState({});

    useEffect(()=>{
        setOrden(state => ({...state, adicicionales: orderAdicional}));
				// console.log(articuloSelect.nombre)
    }, [orderAdicional] );

		useEffect( () => {
			
		}, [orden] );

    useEffect(()=>{
      setOrden(state => ({...state, cantidad: 1}));
    }, [] );


    const handleClickOut = () => {
        setOrden({});
        setOrderAdicional({});
        setArticuloSelect(null);
        setCantidad();
    }
    
    const handleClickGuardar = () => {
      Object.keys(orden).map((i)=>{
        // if(i != 'nombre' && i != 'adicicionales' && i != 'precios' && i != 'cantidad' && i != 'nota'){
          // console.log([i]);
        // }
        // console.log(i);
      })

      // console.log(orden.cantidad);
      // console.log(orden.precio);

			setOrdenCurrent(state => ([...state, orden]));
			setArticuloSelect(null);

      setOrden({});
      setOrderAdicional({});
      setArticuloSelect(null);
      setCantidad();
        // console.log('guardar');
        // console.log(orden)
        // console.log(orderAdicional)
    }
    const setCantidad = () => {
      setOrden({
        nombre: '',
        cantidad: 1,
        nota: '',
      });
    }

    const handleClickButton = (e,ingrediente, precio) => {
        // console.log(ingrediente, precio);
        // console.log(orden[ingrediente]);

        if( orden[ingrediente] == undefined){
            e.target.classList.remove('bg-transparent');
            e.target.classList.add('bg-success');
            setOrden(state => ({...state,[ingrediente]: precio}))
        }else {
            e.target.classList.remove('bg-success');
            e.target.classList.add('bg-transparent');
            delete orden[ingrediente];
        }
				setOrden(state => ({...state, nombre: articuloSelect.nombre}));
    }
    const handleClickButton2 = (e,ingrediente, precio) => {

        console.log(orderAdicional[ingrediente]);
        if( orderAdicional[ingrediente] == undefined){
            e.target.classList.remove('bg-transparent');
            e.target.classList.add('bg-success');
            setOrderAdicional(state => ({...state,[ingrediente]: precio}))
        }else {
            e.target.classList.remove('bg-success');
            e.target.classList.add('bg-transparent');
            delete orderAdicional[ingrediente];
        }
    }

		const handleChangeCatindad = (e) => {
			setOrden(state => ({...state, cantidad: e.target.value}))
		};
		const handleChangeNota = (e) => {
			setOrden(state => ({...state, nota: e.target.value}))
		}

    const handleClickAppUser = () => setViewUser(2);

	const handleClickBack = () => setViewUser(1);

  const handleClickAtras = (e) => {
    const target = e.target.classList[0];
    if(target == 'position-absolute'){
      handleClickOut();
    }
  }

  const handleClickCantidadRestar = () => setOrden(state => ({...state, cantidad: orden.cantidad - 1}));

  const handleClickCantidadSumar = () => setOrden(state => ({...state, cantidad: orden.cantidad + 1}));

  useEffect(()=>{
    // Object.keys(articuloSelect).map((i)=>{
    //   console.log(i);
    // })
  }, [articuloSelect] );

    if(articuloSelect != null){
      return(
        <div className='position-absolute min-vh-100 z-1 bg-black bg-opacity-25 p-0' onClick={handleClickAtras}>
            
          <div className='col-12 col-sm-12 min-vh-100 border shadow-lg bg-light top-0 start-0 mx-auto z-3' style={{}}>
          	<div className='d-flex border-0 border-bottom justify-content-between'>
              <div className='d-flex'>
                <AiOutlineClose className='fs-4 mt-4 m-3' onClick={handleClickOut}/>
                <p className='fs-4 fw-medium ms-2 m-3'>{articuloSelect.nombre}</p>
              </div>
              <button className='btn bg-transparent text-success fw-medium fs-4' onClick={handleClickGuardar}>Guardar</button>
            </div>
            <p className='m-5 text-success mb-0 mt-3'>Ingredientes</p>
            <div className='d-flex flex-wrap justify-content-evenly'>
              { articuloSelect.adicionales != null ? 
                Object.keys(articuloSelect.adicionales).map((adicional)=>(
                  <button key={adicional} onClick={(e)=>handleClickButton(e,adicional,articuloSelect.adicionales[adicional])} className='btn bg-transparent border d-flex justify-content-between col-11 col-sm-5 p-3 rounded-1 m-2'>
                    <p className='m-0'>{adicional}</p>
                    <p className='m-0'>{articuloSelect.adicionales[adicional]}</p>
                  </button>
              	))
              : null }
            </div>
            { articuloSelect.precios != null ? 
              <p className='m-5 text-success mb-0 mt-4'>Ingredientes adicionales</p>
            : <></>
            }
              
            <div className='d-flex flex-wrap justify-content-evenly'>
              { articuloSelect.precios ?
                Object.keys(articuloSelect.precios).map((precio)=>(
                	<button key={precio} onClick={(e)=>handleClickButton2(e,precio,articuloSelect.precios[precio])} className='btn bg-transparent border d-flex justify-content-between col-11 col-sm-5 p-3 rounded-1 m-2'>
                    <p className='m-0'>{precio}</p>
                    <p className='m-0'>{articuloSelect.precios[precio]}</p>
                  </button>
                ))
              : null }
            </div>
            <p className='m-5 text-success mb-0 mt-3'>Cantidad</p>
						<div className='m-4 row'>
						  <BsPlusSquareFill className='display-5 col-1' onClick={handleClickCantidadRestar} />
							<input type="text" className='col-10 btn border-0 bg-transparent border-bottom rounded-0' onChange={handleChangeCatindad} value={orden.cantidad} />
							<BsPlusSquareFill className='display-5 col-1' onClick={handleClickCantidadSumar} />
						</div>  
            <p className='m-5 text-success mb-0 mt-3'>Comentario</p>
						<input type="text" className='btn bg-transparent col-11 border-0 border-bottom rounded-0 m-4 text-start' placeholder='Introducir comentario' onChange={handleChangeNota} />
          </div>
        </div>
        )
    }else {
        <></>
    }
}

export default ArticuloInfo;
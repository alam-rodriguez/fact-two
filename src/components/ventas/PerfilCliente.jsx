// React
import React, { useContext, useEffect, useState } from 'react';

// ID
import { v4 as uuid} from 'uuid'

// React Icons
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { IoMdArrowBack, IoMdMail, IoMdStar } from 'react-icons/io';
import { HiUser, HiUserCircle } from 'react-icons/hi';
import { MdLocalPhone, MdLocationOn, MdShoppingBasket, MdSpeakerNotes } from 'react-icons/md';
import { FaRegCalendarAlt } from 'react-icons/fa';

// Firebase
import { guardarCliente } from '../../firebase/firebase';

// Context
import { AppContext } from '../../context/AppContext';

const PerfilCliente = ({handleClickBack, clienteActivo}) => {

	const { pedido, setPedido, userSelected, setUserSelected, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

	useEffect( () => {
		console.log(clienteActivo)
	}, [] );

	const handleClickAdd = async () => {
		setPedido(state => ({...state, cliente: clienteActivo}));
		setUserSelected(clienteActivo);
		setViewUser(0);
		// console.log(userSelected)
	}

	if(clienteActivo != null){

	}

	const handleClickAtras = (e) => {
		const target = e.target.classList[0];
		if(target == 'position-absolute'){
		  // handleClickBack();
			setViewUser(0);
		}
	}

	const handleClickEditar = () => {
		setViewUser(5);
	}

  return (
    <div className='position-absolute min-vh-100 z-1 bg-black bg-opacity-50 p-0' onClick={handleClickAtras}>
            
      <div className='col-12 col-sm-8 min-vh-100 border shadow-lg bg-light top-0 start-0 mx-auto' style={{}}>
				<div className='d-flex justify-content-between border-0 border-bottom'>
          <div className='d-flex'>
						<IoMdArrowBack className='fs-3 mt-4 m-2' onClick={handleClickBack}/>
						<p className='fs-4 fw-medium ms-2 m-3'>Perfil de cliente</p>
					</div>
					<button className='btn bg-transparent text-success fw-medium fs-4' onClick={handleClickAdd}>AÑADIR AL TICKET</button>
        </div>
				<div>
					<div className='d-flex flex-column justify-content-center mt-4'>
						<HiUserCircle className='text-secondary display-3 align-self-center m-0'/>
						<p className='h3 fw-medium text-center'>{clienteActivo.nombre}</p>
					</div>
					<div className='m-3'>
						{ (clienteActivo.telefono != '') ? 
							<div className='d-flex align-items-center'>
								<MdLocalPhone className='fs-4 mt-1 me-4' />
								<p className='m-0'>{clienteActivo.telefono}</p>
							</div>
						: <></>
						}
						{ (clienteActivo.dirrecion != '') ? 
							<div className='d-flex align-items-center mt-4'>
								<MdLocationOn className='fs-4 mt-1 me-4' />
								<p className='m-0'>{clienteActivo.dirrecion}</p>
							</div>
						: null }
						<hr />
					</div>
					<div className='m-3'>

						<div className='d-flex align-items-center mb-4'>
							<IoMdStar className='fs-3' />
							<div className='ms-4'>
								<p className='m-0'>0.00</p>
								<p className='text-secondary m-0'>Puntos</p>
							</div>
						</div>

						<div className='d-flex align-items-center mb-4'>
							<MdShoppingBasket className='fs-3' />
							<div className='ms-4'>
								<p className='m-0'>1</p>
								<p className='text-secondary m-0'>Visita</p>
							</div>
						</div>

						<div className='d-flex align-items-center mb-4'>
							<FaRegCalendarAlt className='fs-3' />
							<div className='ms-4'>
								<p className='m-0'>30/3/23, 9:15 P. m.</p>
								<p className='text-secondary m-0'>Ultima visita</p>
							</div>
						</div>

					</div>

					<div>
						<button className='btn bg-transparent border-0 text-success fw-medium' onClick={handleClickEditar}>EDITAR PERFIL</button>
						<button className='btn bg-transparent border-0 text-secondary fw-medium disabled'>CANJEAR PUNTOS</button>
						<button className='btn bg-transparent border-0 text-success fw-medium'>VER COMPRAS</button>
					</div>
					
				</div>
      </div>

    </div>
  )
}

export default PerfilCliente;

// React
import React, { useContext, useEffect, useState } from 'react';

// ID
import { v4 as uuid} from 'uuid'

// React Icons
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { IoMdArrowBack, IoMdMail } from 'react-icons/io';
import { HiUser, HiUserCircle } from 'react-icons/hi';
import { MdLocalPhone, MdLocationOn, MdSpeakerNotes } from 'react-icons/md';

// Firebase
import { guardarCliente } from '../../firebase/firebase';

// Context
import { AppContext } from '../../context/AppContext';

const PerfilCliente2 = () => {

	const { pedido, setPedido, userSelected, setUserSelected, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

	useEffect( () => {
		console.log(userSelected.telefono)
	}, [] );

	const handleClickRetirar = async () => {
		setPedido(state => ({...state, cliente: ''}));
		setUserSelected(null);
		setViewUser(1);
	}

	if(userSelected != null){

	}

	const handleClickAtras = (e) => {
		const target = e.target.classList[0];
		if(target == 'position-absolute'){
		  // handleClickBack();
			setViewUser(0)
		}
	}

	const handleClickBack = () => {
		setViewUser(0);
	}

  return (
    <div className='position-absolute min-vh-100 z-1 bg-black bg-opacity-25 p-0' onClick={handleClickAtras}>
            
      <div className='col-12 col-sm-8 min-vh-100 border shadow-lg bg-light top-0 start-0 mx-auto' style={{}}>
				<div className='d-flex justify-content-between border-0 border-bottom'>
          <div className='d-flex'>
						<IoMdArrowBack className='fs-3 mt-4 m-2' onClick={handleClickBack}/>
						<p className='fs-4 fw-medium ms-2 m-3'>Perfil de cliente</p>
					</div>
					<button className='btn bg-transparent text-success fw-medium fs-4' onClick={handleClickRetirar}>Retirar del ticket</button>
        </div>
				<div>
					<div className='d-flex flex-column justify-content-center mt-4'>
						<HiUserCircle className='text-secondary display-3 align-self-center m-0'/>
						<p className='h3 fw-medium text-center'>{userSelected.nombre}</p>
					</div>
					<div className='m-3'>
						{ (userSelected.telefono != '') ? 
							<div className='d-flex align-items-center'>
								<MdLocalPhone className='fs-4 mt-1 me-4' />
								<p className='m-0'>{userSelected.telefono}</p>
							</div>
						: null 
					}
					{ (userSelected.dirrecion != '') ? 
						<div className='d-flex align-items-center mt-3'>
							<MdLocationOn className='fs-4 mt-1 me-4' />
							<p className='m-0'>{userSelected.dirrecion}</p>
						</div>
					: null }
					<hr />

					</div>
					{/* <div className='d-flex m-4 mt-5 my-5'>
						<HiUser className='fs-3 mt-1' />
						<input type="text" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' placeholder='Nombre' onChange={handleChangeNombre}/>
					</div>
					<div className='d-flex m-4 mt-5 my-5'>
						<IoMdMail className='fs-3 mt-1' />
						<input type="email" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' placeholder='Dirrecion de correo electronico' onChange={handleChangeEmail}/>
					</div>
					<div className='d-flex m-4 mt-5 my-5'>
						<MdLocalPhone className='fs-3 mt-1' />
						<input type="number" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' placeholder='Numero de telefono' onChange={handleChangeTelefono}/>
					</div>
					<div className='d-flex m-4 mt-5 my-5'>
						<MdLocationOn className='fs-3 mt-1' />
						<input type="text" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' placeholder='Dirrecion' onChange={handleChangeDirrecion}/>
					</div>
					<div className='d-flex m-4 mt-5 my-5'>
						<MdSpeakerNotes className='fs-3 mt-1' />
						<input type="text" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' placeholder='Nota' onChange={handleChangeNota}/>
					</div> */}
				</div>
      </div>

    </div>
  )
}

export default PerfilCliente2;

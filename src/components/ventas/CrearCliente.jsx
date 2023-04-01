// React
import React, { useContext, useEffect, useState } from 'react';

// ID
import { v4 as uuid} from 'uuid'

// React Icons
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';
import { IoMdArrowBack, IoMdMail } from 'react-icons/io';
import { HiUser } from 'react-icons/hi';
import { MdLocalPhone, MdLocationOn, MdSpeakerNotes } from 'react-icons/md';

// Firebase
import { guardarCliente } from '../../firebase/firebase';

// Context
import { AppContext } from '../../context/AppContext';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';

const CrearCliente = ({handleClickBack}) => {

	const { pedido, setPedido, view, setView,userSelected, setUserSelected, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

	useEffect( () => {
		setNewUser(state => ({...state, id: uuid()}));
	}, [] );

	const [newUser, setNewUser] = useState({
		id: '',
		nombre: '',
		correo: '',
		telefono: '',
		dirrecion: '',
		nota: '',
	});

	const handleChangeNombre = (e) =>  setNewUser(state => ({...state, nombre: e.target.value}));
	const handleChangeEmail = (e) =>  setNewUser(state => ({...state, correo: e.target.value}));
	const handleChangeTelefono = (e) =>  setNewUser(state => ({...state, telefono: e.target.value}));
	const handleChangeDirrecion = (e) =>  setNewUser(state => ({...state, dirrecion: e.target.value}));
	const handleChangeNota = (e) =>  setNewUser(state => ({...state, nota: e.target.value}));

	const handleClickGuardar = async () => {

		if(newUser.nombre.length < 3 || newUser.nombre == null){
			toast.warn('El nombre debe contener por lo menos 3 caracteres, pero solo contiene ' +newUser.nombre.length, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});	
		}else {
			// console.log(newUser)
			const res = await guardarCliente(`clientes-${emailUser}`, newUser.id, newUser)
			if(res =='cliente creado'){	
				setPedido(state => ({...state, cliente: newUser}));
				setViewUser(0);
				setUserSelected( newUser );
			}
		}
	}

	const handleClickAtras = (e) => {
    const target = e.target.classList[0];
    if(target == 'position-absolute'){
			setViewUser(0)
    }
  }

  return (
    <div className='position-absolute min-vh-100 z-1 bg-black bg-opacity-50 p-0' onClick={handleClickAtras}>
            
      <div className='col-12 col-sm-8 min-vh-100 border shadow-lg bg-light top-0 start-0 mx-auto' style={{}}>
				<div className='d-flex justify-content-between border-0 border-bottom'>
          <div className='d-flex'>
						<IoMdArrowBack className='fs-3 mt-4 m-2' onClick={handleClickBack}/>
						<p className='fs-4 fw-medium ms-2 m-3'>Añadir cliente</p>
					</div>
					<button className='btn bg-transparent text-success fw-medium fs-4' onClick={handleClickGuardar}>Guardar</button>
        </div>
				<div>
					<div className='d-flex m-4 mt-5 my-5'>
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
					</div>
				</div>
      </div>

    </div>
  )
}

export default CrearCliente;

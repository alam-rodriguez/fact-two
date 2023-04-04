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
import { guardarCliente, actualizarCliente, borrarCliente } from '../../firebase/firebase';

// Context
import { AppContext } from '../../context/AppContext';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';

const EditarCliente = ({handleClickBacksa, clienteActivo}) => {

	const { pedido, setPedido, view, setView,userSelected, setUserSelected, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

	const [editUser, setEditUser] = useState({});

	const [nombre, setNombre] = useState('');
	const [correo, setCorreo] = useState('');
	const [telefono, setTelefono] = useState(0);
	const [direccion, setDireccion] = useState('');
	const [nota, setNota] = useState('');

	useEffect( () => {
		setNombre(clienteActivo.nombre);
		setCorreo(clienteActivo.correo);
		setTelefono(clienteActivo.telefono);
		setDireccion(clienteActivo.dirrecion);
		setNota(clienteActivo.nota);
		// setEditUser(clienteActivo);
		console.log(clienteActivo)
	}, [] );

	// const [newUser, setNewUser] = useState({
	// 	id: '',
	// 	nombre: '',
	// 	correo: '',
	// 	telefono: '',
	// 	dirrecion: '',
	// 	nota: '',
	// });

	const handleChangeNombre = (e) => setNombre(e.target.value);
	const handleChangeEmail = (e) => setCorreo(e.target.value);
	const handleChangeTelefono = (e) => setTelefono(e.target.value);
	const handleChangeDirrecion = (e) => setDireccion(e.target.value);
	const handleChangeNota = (e) => setNota(e.target.value);

	const handleClickGuardar = async () => {

		if(nombre.length < 3 || nombre == ''){
			toast.warn('El nombre debe contener por lo menos 3 caracteres, pero solo contiene ' +nombre.length, {
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
			const editUser = {
				id: clienteActivo.id,
				nombre,
				correo,
				telefono,
				direccion,
				nota, 
			}
			console.log(editUser)
			// console.log(newUser);
			const res = await actualizarCliente(`clientes-${emailUser}`, editUser.id, editUser);
			if(res =='cliente actualizado'){	
				setPedido(state => ({...state, cliente: editUser}));
				setViewUser(4);
				setUserSelected( editUser );
			}
		}
	}

	const handleClickAtras = (e) => {
    const target = e.target.classList[0];
    if(target == 'position-absolute'){
		setViewUser(0);
    }
  }

	const handleClickBack = () => setViewUser(3);

	const handleClickBorrarCliente = async () => {
		const res = await borrarCliente(`clientes-${emailUser}`, clienteActivo.id);
		if(res == 'cliente borrado'){
			setViewUser(1);
			setPedido(state => ({...state, cliente: null}));
			setUserSelected( null );
		}
	}

  return (
    <div className='position-absolute min-vh-100 z-1 bg-black bg-opacity-50 p-0' onClick={handleClickAtras}>
            
      <div className='col-12 col-sm-8 min-vh-100 border shadow-lg bg-light top-0 start-0 mx-auto' style={{}}>

				<div className='d-flex justify-content-between border-0 border-bottom'>
          <div className='d-flex'>
						<IoMdArrowBack className='fs-3 mt-4 m-2' onClick={handleClickBack} />
						<p className='fs-4 fw-medium ms-2 m-3'>Editar cliente</p>
					</div>
					<button className='btn bg-transparent text-success fw-medium fs-4' onClick={handleClickGuardar}>Guardar</button>
        </div>
				<div>
					<div className='d-flex m-4 mt-5 my-5'>
						<HiUser className='fs-3 mt-1' />
						<input type="text" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' value={nombre} placeholder='Nombre' onChange={handleChangeNombre}/>
					</div>
					<div className='d-flex m-4 mt-5 my-5'>
						<IoMdMail className='fs-3 mt-1' />
						<input type="email" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' placeholder='Dirrecion de correo electronico' value={correo} onChange={handleChangeEmail}/>
					</div>
					<div className='d-flex m-4 mt-5 my-5'>
						<MdLocalPhone className='fs-3 mt-1' />
						<input type="number" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' placeholder='Numero de telefono' value={telefono} onChange={handleChangeTelefono}/>
					</div>
					<div className='d-flex m-4 mt-5 my-5'>
						<MdLocationOn className='fs-3 mt-1' />
						<input type="text" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' placeholder='Dirrecion' value={direccion} onChange={handleChangeDirrecion}/>
					</div>
					<div className='d-flex m-4 mt-5 my-5'>
						<MdSpeakerNotes className='fs-3 mt-1' />
						<input type="text" className='btn bg-transparent form-control text-start border-0 border-bottom rounded-0 ms-3' placeholder='Nota' value={nota} onChange={handleChangeNota}/>
					</div>
				</div>

				<div className='d-flex justify-content-center col-12'>
					<button className='btn btn-outline-danger col-auto' onClick={handleClickBorrarCliente}>Borrar cliente</button>
				</div>

      </div>


    </div>
  )
}

export default EditarCliente;

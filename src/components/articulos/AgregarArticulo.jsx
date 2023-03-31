// React
import React, { useContext, useEffect, useState } from 'react';

// React Router Dom
import { useNavigate } from 'react-router-dom';

// ID
import { v4 as uuidv4 } from 'uuid';

// Firebase 
import { agregarCategoria, obtenerCategoria, agregarArticulo as agregarArticuloff, subirImagen } from '../../firebase/firebase'

// Context
import { AppContext } from '../../context/AppContext';

// Iconos
import { MdOutlineArrowBack } from 'react-icons/md';
import { FaCloudUploadAlt } from 'react-icons/fa';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';

const AgregarArticulo = () => {
	const navigate = useNavigate();

	const [categorias, setCategorias] = useState(null);

	const { design, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);
	
	useEffect(()=>{
		if(emailUser == null){
			navigate('/articulos');
		}
		const getCategorias = async () => {
			setCategorias( await obtenerCategoria(`categorias-${emailUser}`) );
		}
		getCategorias();
	}, [] );

	const [sendInfo, setSendInfo] = useState(false);

  const [inputIngredientes, setInputIngredientes] = useState(['input']);
	const [inpuIngredientesAdicionales, setInpuIngredientesAdicionales] = useState(['input']);

	const [newArticulo, setNewArticulo] = useState({
		id: '',
		nombre: '',
		categoria: 'sin categoria',
		adicionales: {},
		precios: {},
		img: '',
		type: '',
	});

	const [imgFile, setImgFile] = useState(null);

	// Para especificar si queremos los input de los adicionales
	const [inputAdicionales, setInputAdicionales] = useState(false);


  const handleClickGuardar = async () => {

		const data = [];
		const res = [];
		document.querySelectorAll('.input-ingrediente').forEach((input)=>{data.push(input.value);})
		for( let i = 0; i < data.length; i = i + 2){ res.push( [data[i], data[i+1]] );}
		const obj = Object.fromEntries(res);
		setNewArticulo(state => ({...state, adicionales: obj }))	
		if(obj[''] == ''){
			setNewArticulo(state => ({...state, adicionales: null }))	
		}

		const data2 = [];
		const res2 = [];
		document.querySelectorAll('.input-adicionales').forEach((input)=>{data2.push(input.value);})
		for( let i = 0; i < data2.length; i = i + 2){ res2.push( [data2[i], data2[i+1]] );}
		const obj2 = Object.fromEntries(res2);
		setNewArticulo(state => ({...state, precios: obj2 }));
		setNewArticulo(state => ({...state, type: inputAdicionales ? 'basico' : 'complejo'}))	;
		if(res2.length == 0){
			setNewArticulo(state => ({...state, precios: null }));
			setNewArticulo(state => ({...state, type: 'basico'}));
		}
		if(obj2[''] == ''){
			setNewArticulo(state => ({...state, precios: null }));
			setNewArticulo(state => ({...state, type: 'basico'}));
		}
		

		const id = uuidv4();
		if( imgFile != null){
			setNewArticulo(state => ({...state, img: `productos-${emailUser}/${id}`}));
		}else {
			setNewArticulo(state => ({...state, img: ''}));
		}
		setNewArticulo(state => ({...state, id: id}));
		setSendInfo(true);
  }

  
  const handleClickAgregarIngrediente = () => setInputIngredientes(state => ([...state, 'input']));
	const handleClickEliminarIngrediente = () => {
		// console.log(ingredientes[inputIngredientes.length - 1]);
		inputIngredientes.pop();
		inputIngredientes.pop();
		handleClickAgregarIngrediente();
	}

	const handleClickAgregarIngredienteAdicional = () => setInpuIngredientesAdicionales(state => ([...state, 'input']));
	const handleClickEliminarIngredienteAdicional = () => {	
		inpuIngredientesAdicionales.pop();
		inpuIngredientesAdicionales.pop();
		handleClickAgregarIngredienteAdicional();
	}

	const handleChangeNombre = (e) => setNewArticulo(state => ({...state, nombre: e.target.value}));

	const handleChangeImg = (e) => setImgFile(e.target.files[0]);

	const handleChangeCategoria = (e) => setNewArticulo(state => ({...state, categoria: e.target.value}));

	useEffect( () => {
		const setNuevoArticulo = async () => {
			console.log(newArticulo);
			
			if(sendInfo){
				if(newArticulo.nombre.length < 3){
					toast.warn('El nombre del articulo debe contener minimo 3 caracteres, y solo contiene '+newArticulo.nombre.length, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
					setSendInfo(false);
				}else if(newArticulo.adicionales == null){
					toast.warn('Debe agregar el precio', {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					});
					setSendInfo(false);
				}else {
					const res = await agregarArticuloff(`articulos-${emailUser}`, newArticulo.id, newArticulo);
					if(imgFile != null){
					const resImg = await subirImagen(newArticulo.img, imgFile)
					console.log(resImg);

					if( res == 'info subida' && resImg == 'info subida'){
						toast.success('Articulo agregado', {
							position: "top-center",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light",
						});
						navigate('/articulos');
					}	else {
						toast.error('Ha ocurrido un error, no se a podido agregar el articulo', {
							position: "top-right",
							autoClose: 5000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							theme: "light",
						});
						navigate('/articulos');
					}
				}
				}
			}
		}
		setNuevoArticulo();
	}, [newArticulo]);
  

  if(design == 'computer'){
		return (
			<main className='row m-0'>
				
				<header className='d-flex justify-content-between align-content-center bg-success p-4 shadow-lg'>
					<div className='d-flex'>
						<MdOutlineArrowBack className='fs-3 text-white mt-2' onClick={()=> navigate('/articulos')} />
						<p className='fs-3 text-white m-0'>Crear articulo</p>
					</div>
					<button className='btn bg-transparent text-white fw-medium' onClick={handleClickGuardar}>GUARDAR</button>
				</header>
				
				<section className='row d-flex justify-content-center p-0'>
					<div className='bg-light shadow-lg col-8 mt-3 p-3'>
	
						<div className="form-floating mb-3">
							<input type="text" minLength='3' className="btn text-start form-control rounded-0 border-0 border-bottom fs-3" id="floatingInput" placeholder="name@example.com" onChange={handleChangeNombre}/>
							<label htmlFor="floatingInput">Nombre</label>
						</div>
	
						<div className="form-floating">
							<select onClick={handleChangeCategoria} className="form-select bg-transparent border-0 border-bottom rounded-0" id="floatingSelect" aria-label="Floating label select example">
								<option defaultValue >Sin categoria</option>
								{ categorias != null ?
									categorias.map((categoria, i)=>(
										<option key={i} value={categoria.id}>{categoria.categoria}</option>
									))
								: null
								}
							</select>
							<label htmlFor="floatingSelect">Categoria</label>
						</div>
	
						<div className='row mt-5 d-flex justify-content-center row'>
		
							{/* GRUOP INPUTS 1 */}
							<div className='col-12 col-md-6 d-flex flex-column'>
								<div className='d-flex row'>
									<p className='col-6 text-center text-success fs-6 fw-medium'>Ingredientes</p>
									<p className='col-6 text-center text-success fs-6 fw-medium'>Precios</p>
								</div>
								<div className='input-ingredientes'>
									{ inputIngredientes.map((input, i)=>(
										<div className='d-flex' key={i}>
											<input type="text" className='input-ingrediente input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Ingrediente' />
											<input type="number" className='input-ingrediente input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Precio' />
										</div>
									))}
								</div>
								<button type="button" className="btn btn-success align-self-center my-3" onClick={handleClickAgregarIngrediente}>Agregar Ingrediente adional</button>
								<button type="button" className="btn btn-danger align-self-center" onClick={handleClickEliminarIngrediente}>Eliminar input</button>
							</div>
							{/* GRUOP INPUTS 2 */}
							{ !inputAdicionales ?
								<div className='col-12 col-md-6 mt-0'>
										<div className='col-12 d-flex flex-column'>
											<div className='d-flex row'>
												<p className='col-6 text-center text-success fs-6 fw-medium'>Ingredientes adicionales</p>
												<p className='col-6 text-center text-success fs-6 fw-medium'>Precios ingredientes adicionales</p>
											</div>
											<div className='input-ingredientes-precio'>
												{ inpuIngredientesAdicionales.map((input, i)=>(
													<div className='d-flex' key={i}>
														<input type="text" className='input-adicionales input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Ingrediente' />
														<input type="number" className='input-adicionales input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Precio' />
													</div>
												))}
											</div>
											<button type="button" className="btn btn-success align-self-center my-3" onClick={handleClickAgregarIngredienteAdicional}>Agregar Ingrediente</button>
											<button type="button" className="btn btn-danger align-self-center" onClick={handleClickEliminarIngredienteAdicional}>Eliminar input</button>
										</div>
								</div>	
							:
								<></>
							}
	
						</div>
	
						<div className='d-flex justify-content-center'>
							<button type="button" className="col-6 w-75 btn btn-success align-self-center my-3 mx-auto" onClick={()=>setInputAdicionales(!inputAdicionales)}>Agregar adicionales</button>
						</div>
	
						<div className='my-5'>
							<div className='w-100 d-flex flex-column justify-content-center align-items-center' style={{border:'dashed 2px gray', height:200}} onClick={()=>document.querySelector('.input-file').click()}>
								<p className='text-success fs-4 m-0'>AGREGE LA IMAGEN DE PRODUCTO AQUI</p>
								<FaCloudUploadAlt className='text-success' style={{fontSize: 100}}/>
							</div>
							<input type="file" className='input-file' hidden onChange={handleChangeImg} />
						</div>
	
					</div>
				</section>
			</main>
		)
	}else if(design == 'mobile'){
		return (
			<main className='row m-0'>
				
				<header className='d-flex justify-content-between align-content-center bg-success p-4 shadow-lg'>
					<div className='d-flex'>
						<MdOutlineArrowBack className='fs-3 text-white mt-2' onClick={()=> navigate('/articulos')} />
						<p className='fs-3 text-white m-0'>Crear articulo</p>
					</div>
					<button className='btn bg-transparent text-white fw-medium' onClick={handleClickGuardar}>GUARDAR</button>
				</header>
				
				<section className='col-12 d-flex justify-content-center p-0'>
					<div className='bg-light shadow-lg col-12 mt-0 p-3'>
	
						<div className="form-floating mb-3">
							<input type="tetx" className="btn text-start form-control rounded-0 border-0 border-bottom fs-3" id="floatingInput" placeholder="name@example.com" onChange={handleChangeNombre}/>
							<label htmlFor="floatingInput">Nombre</label>
						</div>
	
						<div className="form-floating">
							<select onClick={handleChangeCategoria} className="form-select bg-transparent border-0 border-bottom rounded-0" id="floatingSelect" aria-label="Floating label select example">
								<option defaultValue >Sin categoria</option>
								{ categorias != null ?
									categorias.map((categoria, i)=>(
										<option key={i} value={categoria.id}>{categoria.categoria}</option>
									))
								: null
								}
							</select>
							<label htmlFor="floatingSelect">Categoria</label>
						</div>
	
						<div className='row mt-5 d-flex justify-content-center row'>
		
							{/* GRUOP INPUTS 1 */}
							<div className='col-12 col-md-6 d-flex flex-column'>
								<div className='d-flex row'>
									<p className='col-6 text-center text-success fs-6 fw-medium'>Ingredientes</p>
									<p className='col-6 text-center text-success fs-6 fw-medium'>Precios</p>
								</div>
								<div className='input-ingredientes'>
									{ inputIngredientes.map((input, i)=>(
										<div className='d-flex' key={i}>
											<input type="text" className='input-ingrediente input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Ingrediente' />
											<input type="number" className='input-ingrediente input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Precio' />
										</div>
									))}
								</div>
								<button type="button" className="btn btn-success align-self-center my-3" onClick={handleClickAgregarIngrediente}>Agregar Ingrediente adional</button>
							</div>
							<hr />
							{/* GRUOP INPUTS 2 */}
							{ !inputAdicionales ?
								<div className='col-12 col-md-6 mt-5'>
										<div className='col-12 d-flex flex-column'>
											<div className='d-flex row'>
												<p className='col-6 text-center text-success fs-6 fw-medium'>Ingredientes adicionales</p>
												<p className='col-6 text-center text-success fs-6 fw-medium'>Precios ingredientes adicionales</p>
											</div>
											<div className='input-ingredientes-precio'>
												{ inpuIngredientesAdicionales.map((input, i)=>(
													<div className='d-flex' key={i}>
														<input type="text" className='input-adicionales input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Ingrediente' />
														<input type="number" className='input-adicionales input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Precio' />
													</div>
												))}
											</div>
											<button type="button" className="btn btn-success align-self-center my-3" onClick={handleClickAgregarIngredienteAdicional}>Agregar Ingrediente</button>
										</div>
								</div>	
							:
								<></>
							}
							<hr />
	
						</div>
	
						<div className='d-flex justify-content-center'>
							<button type="button" className="col-6 w-75 btn btn-success align-self-center my-3 mx-auto" onClick={()=>setInputAdicionales(!inputAdicionales)}>Agregar adicionales</button>
						</div>
	
						<div className='my-5'>
							<div className='w-100 d-flex flex-column justify-content-center align-items-center' style={{border:'dashed 2px gray', height:200}} onClick={()=>document.querySelector('.input-file').click()}>
								<p className='text-success fs-4 m-0'>AGREGE LA IMAGEN DE PRODUCTO AQUI</p>
								<FaCloudUploadAlt className='text-success' style={{fontSize: 100}}/>
							</div>
							<input type="file" className='input-file' hidden onChange={handleChangeImg} />
						</div>
	
					</div>
				</section>
			</main>
		)
	}
}

export default AgregarArticulo;

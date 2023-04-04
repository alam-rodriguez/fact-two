// React
import React, { useContext, useEffect, useState } from 'react';

// React Router Dom
import { useNavigate } from 'react-router-dom';

// ID
import { v4 as uuidv4 } from 'uuid';

// Firebase 
import { agregarCategoria, obtenerCategoria, agregarArticulo as agregarArticuloff, subirImagen, ontenerImagen, actualizarArticulo, borrarArticulo, borrarImagen } from '../../firebase/firebase'

// Context
import { AppContext } from '../../context/AppContext';

// Iconos
import { MdOutlineArrowBack } from 'react-icons/md';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';

// Imagen
import imgDefault from '../../imagenes/default.png';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';

const EditarArticulo = () => {

  const navigate = useNavigate();

	const [categorias, setCategorias] = useState(null);

	const { design, articuloSelect, setArticuloSelect, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);
	
	const [actualCategoria, setActualCategoria] = useState(null);

	
	const [editArticulo, setEditArticulo] = useState({});

	const [ingredientes, setIngredientes] = useState(null);
	const [ingredientesPrecios, setIngredientesPrecios] = useState(null);

	const [ingredientesAdicionales, setIngredientesAdicionales] = useState(null);
	const [ingredientesAdicionalesPrecios, setIngredientesAdicionalesPrecios] = useState(null);

	const [img, setImg] = useState(null);

	const [editNombre, setEditNombre] = useState('');
	const [editCategoria, setEditCategoria] = useState(null);
	
	// Articulo ya actualizado
	const [articuloActualizado, setArticuloActualizado] = useState(null);

	// Para especificar si queremos los input de los adicionales
	const [inputsAdicionales, setInputsAdicionales] = useState(false);

	useEffect(()=>{
		// console.log(articuloSelect);
		if(emailUser == null){
			navigate('/articulos');
		}else {

			const getImg = async () =>{
				if (articuloSelect.img != ''){
					setImg( await ontenerImagen(emailUser, articuloSelect.id) );
					// console.log(articuloSelect.img)
				}else {
					setImg(imgDefault);
				}
			}
			getImg();
			console.log(articuloSelect)

			setArticuloActualizado(articuloSelect);
			setEditNombre(articuloSelect.nombre);
			// setNewArticulo(state => ({...state, nombre: articuloSelect.nombre}));

			const getCategorias = async () => {
				const categorias = await obtenerCategoria(`categorias-${emailUser}`);
				// setEditCategoria(articuloSelect.id);
				console.log(articuloSelect)
				categorias.map((categoria)=>{
					console.log(categoria)
					if(categoria.id == articuloSelect.categoria){
						setEditCategoria(categoria);
					}
				});
				// console.log(articuloSelect)
				setCategorias(categorias);
				setInputIngredientes([]);
				let ingredientes = [];
				let ingredientesPrecios = [];
				Object.keys(articuloSelect.adicionales).map((ingrediente, i) => {
					handleClickAgregarIngrediente();
					ingredientes.push(ingrediente);
					ingredientesPrecios.push(articuloSelect.adicionales[ingrediente])
					// console.log()
					// addIngrediente(ingrediente, articuloSelect.adicionales[ingrediente]); 
				});

				setIngredientes(ingredientes);
				setIngredientesPrecios(ingredientesPrecios)
				// console.log(ingredientes, ingredientesPrecios);
				setInpuIngredientesAdicionales([]);
				if(articuloSelect.precios != null){
					Object.keys(articuloSelect.precios).map((i)=>{
						if(i != ''){
							setInputsAdicionales(true);
						}
					})
				}
				
				// if(articuloSelect.precios[''] == ''){

				// }else {
				// 	setInputIngredientes(true);
				// }
				if(inputsAdicionales){
					
					let ingredientesAdicionales = [];
					let ingredientesAdicionalesPrecios = [];
					Object.keys(articuloSelect.precios).map((articulo)=>{
						handleClickAgregarIngredienteAdicional();
						ingredientesAdicionales.push(articulo);
						ingredientesAdicionalesPrecios.push(articuloSelect.precios[articulo])
					});
					setIngredientesAdicionales(ingredientesAdicionales);
					setIngredientesAdicionalesPrecios(ingredientesAdicionalesPrecios);
				}
				// console.log( document.querySelectorAll('.input-ingrediente-1') )
				// document.querySelectorAll('.input-ingrediente-1').forEach((i)=>{
					// 	console.log(i);
					// })
					// handleClickAgregarIngrediente()	
				}
				getCategorias();
		}
	}, [] );

	useEffect(()=>{
		setInpuIngredientesAdicionales([]);
				if(inputsAdicionales){
					// console.log(articuloActualizado.precios)
					if(articuloActualizado.precios != null){
					let ingredientesAdicionales = [];
					let ingredientesAdicionalesPrecios = [];
						Object.keys(articuloActualizado.precios).map((articulo)=>{
							handleClickAgregarIngredienteAdicional();
							ingredientesAdicionales.push(articulo);
							ingredientesAdicionalesPrecios.push(articuloActualizado.precios[articulo])
						});
					setIngredientesAdicionales(ingredientesAdicionales);
					setIngredientesAdicionalesPrecios(ingredientesAdicionalesPrecios);
					}else {
						setIngredientesAdicionales('');
						setIngredientesAdicionalesPrecios('');
					}
					
				}
	}, [inputsAdicionales] )

	const selectInputs = () => {
		console.log( document.querySelectorAll('.input-ingrediente-1') )
	}

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
	});

	const [imgFile, setImgFile] = useState(null);

  const handleClickGuardar = async () => {

		setArticuloActualizado(state => ({...state, categoria: editCategoria}));

		const data = [];
		const res = [];
		document.querySelectorAll('.input-ingrediente').forEach((input)=>{data.push(input.value);})
		for( let i = 0; i < data.length; i = i + 2){ res.push( [data[i], data[i+1]] );}
		const obj = Object.fromEntries(res);
		setArticuloActualizado(state => ({...state, adicionales: obj }))	

		const data2 = [];
		const res2 = [];
		document.querySelectorAll('.input-adicionales').forEach((input)=>{data2.push(input.value);})
		for( let i = 0; i < data2.length; i = i + 2){ res2.push( [data2[i], data2[i+1]] );}
		const obj2 = Object.fromEntries(res2);
		setArticuloActualizado(state => ({...state, precios: obj2 }))	

		const id = uuidv4();
		if( imgFile != null){
			setArticuloActualizado(state => ({...state, img: `productos-${emailUser}/${id}`}));
		}
		// setNewArticulo(state => ({...state, id: id}));
		setArticuloActualizado(state => ({...state, nombre: editNombre}));
		setArticuloActualizado(state => ({...state, categoria: editCategoria}))
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


	const handleChangeNombre = (e) => {
		setEditNombre(e.target.value);
		// setNewArticulo(state => ({...state, nombre: e.target.value}))
		// setArticuloActualizado(state => ({...state, nombre: e.target.value}))
	}

	const handleChangeCategoria = (e) => {
		console.log(e.target.value);
		setEditCategoria(e.target.value);
	}

	const handleChangeImg = (e) => setImgFile(e.target.files[0]);


	useEffect( () => {
		const setNuevoArticulo = async () => {
			if(sendInfo){
				const promesa = async () => {
					try {
						console.log(articuloActualizado);
						let res = await	actualizarArticulo(emailUser, articuloActualizado.id, articuloActualizado);

						let resf;
					
						if(imgFile != null){
							resf = await subirImagen(`productos-${emailUser}/${articuloActualizado.id}`, imgFile);
						}
						navigate('/articulos');
					} catch (error) {
						navigate('/articulos');
					}
				}

				toast.promise(
					promesa,
					{
						pending: 'Creando articulo',
						success: 'Articulo creado',
						error: 'ha ocurrido un error',
					}
				);


				// if(res == 'articulo actualizado' && resf == 'info subida' || res == 'articulo actualizado'){
				// 	handleClickAtras();
				// 	toast.success('Articulo actualizado', {
				// 		position: "top-center",
				// 		autoClose: 5000,
				// 		hideProgressBar: false,
				// 		closeOnClick: true,
				// 		pauseOnHover: true,
				// 		draggable: true,
				// 		progress: undefined,
				// 		theme: "light",
				// 	});
				// }else {
				// 	toast.error('Ha ocurrido un error, no se a podido actualizar el articulo', {
				// 		position: "top-right",
				// 		autoClose: 5000,
				// 		hideProgressBar: false,
				// 		closeOnClick: true,
				// 		pauseOnHover: true,
				// 		draggable: true,
				// 		progress: undefined,
				// 		theme: "light",
				// 	});
				// 	console.log(res, resf);
				// 	handleClickAtras();
				// }

			}
		}
		setNuevoArticulo();
		setArticuloSelect(null);
	}, [sendInfo] );

	const handleClickAtras = () => {
		setArticuloSelect(null);
		navigate('/articulos');
	}

	const handleChangeIngredientes = (e, i) => {
		const value = e.target.value;
		setIngredientes(state => ([...state, e.target.value ]))
		console.log(e, i);
	}

	const handleClickBorrar = async () => {
		const resArticulo = await borrarArticulo(emailUser, articuloActualizado.id);
		let resImagen = 'sin imagen';
		console.log( img );
		if(img != null){
			const resImg = await borrarImagen(`productos-${emailUser}`,articuloActualizado.id);
			if(resImg == 'imagen borrada'){
				resImagen = 'imagen borrada';
			}
		}
		if(resArticulo == 'articulo borrado' && resImagen == 'sin imagen' || resArticulo == 'articulo borrado' && resImagen == 'imagen borrada'){
			toast('Articulo borrado', {
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
		}else {
			alert('ha ocurrido un error');
		}
		// console.log(articuloActualizado.id)
		
	}

  if(design == 'computer'){
		return (
			<main className='row m-0'>
				
				<header className='d-flex justify-content-between align-content-center bg-success p-4 shadow-lg'>
					<div className='d-flex'>
						<MdOutlineArrowBack className='fs-3 text-white mt-2' onClick={handleClickAtras} />
						<p className='fs-3 text-white m-0'>Editar articulo</p>
					</div>
					<button className='btn bg-transparent text-white fw-medium' onClick={handleClickGuardar}>GUARDAR</button>
				</header>
				
				<section className='row d-flex justify-content-center p-0'>
					<div className='bg-light shadow-lg col-8 mt-3 p-3'>
	
						<div className="form-floating mb-3">
							<input type="tetx" className="btn text-start form-control rounded-0 border-0 border-bottom fs-3" id="floatingInput" placeholder="name@example.com" onChange={handleChangeNombre} value={editNombre} />
							<label htmlFor="floatingInput">Nombre</label>
						</div>
	
						<div className="form-floating">
							<select onChange={handleChangeCategoria} className="form-select bg-transparent border-0 border-bottom rounded-0" id="floatingSelect" aria-label="Floating label select example">
								{ editCategoria != null ?
									<option value={editCategoria.id} >{editCategoria.categoria}</option>
								: null }
								{ categorias != null ?
									categorias.map((categoria, i)=>(
										<option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
									))
								: null
								}
							</select>
							<label htmlFor="floatingSelect">Categoria</label>
						</div>
	
						<div className='row mt-5 d-flex justify-content-center'>
							{/* GRUOP INPUTS 1 */}
							<div className='col-6 d-flex flex-column'>
								<div className='d-flex row'>
									<p className='col-6 text-center text-success fs-6 fw-medium'>Ingredientes</p>
									<p className='col-6 text-center text-success fs-6 fw-medium'>Precios</p>
								</div>
								<div className='input-ingredientes'>
									{ ingredientes != null && ingredientesPrecios != null ? 
										inputIngredientes.map((input, i)=>(
											<div className='d-flex' key={i}>
												<input type="text" className='input-ingrediente-1 input-ingrediente input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Ingrediente' defaultValue={ingredientes[i]}  />
												<input type="number" className='input-ingrediente input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Precio' defaultValue={ingredientesPrecios[i]} />
											</div>
										))
									: <></>}
								</div>
								<button type="button" className="btn btn-success align-self-center my-3" onClick={handleClickAgregarIngrediente}>Agregar Ingrediente adional</button>
								<button type="button" className="btn btn-danger align-self-center" onClick={handleClickEliminarIngrediente}>Eliminar input</button>
							</div>
	
							{/* GROUP INPUTS 2 */}
							{ inputsAdicionales ?
								<div className='col-6 mt-0'>
								<div className='col-12 d-flex flex-column'>
									<div className='d-flex row'>
										<p className='col-6 text-center text-success fs-6 fw-medium'>Ingredientes adicionales</p>
										<p className='col-6 text-center text-success fs-6 fw-medium'>Precios ingredientes adicionales</p>
									</div>
									<div className='input-ingredientes-precio'>
										{ ingredientesAdicionales != null && ingredientesAdicionalesPrecios != null ?
											inpuIngredientesAdicionales.map((input, i)=>(
												<div className='d-flex' key={i}>
													<input type="text" className='input-adicionales input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Ingrediente' defaultValue={ingredientesAdicionales[i]} />
													<input type="number" className='input-adicionales input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Precio' defaultValue={ingredientesAdicionalesPrecios[i]} />
												</div>
											))
										: <></>}
									</div>
									<button type="button" className="btn btn-success align-self-center my-3" onClick={handleClickAgregarIngredienteAdicional}>Agregar Ingrediente</button>
									<button type="button" className="btn btn-danger align-self-center" onClick={handleClickEliminarIngredienteAdicional}>Eliminar input</button>
								</div>
								</div>	
							: <></>					
							}
							
						</div>
	
						<div className='d-flex justify-content-center'>
							<button type="button" className="col-6 w-75 btn btn-success align-self-center my-3 mx-auto" onClick={()=>setInputsAdicionales(!inputsAdicionales)}>Agregar adicionales</button>
						</div>
	
						<div className='my-5 d-flex' style={{height:200}}>
							<img src={img} className='col-6 object-fit-cover  h-100' alt="" />
							<div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{border:'dashed 2px gray'}} onClick={()=>document.querySelector('.input-file').click()}>
								<p className='text-success fs-4 m-0 text-center'>AGREGE LA IMAGEN DE PRODUCTO AQUI</p>
								<FaCloudUploadAlt className='text-success' style={{fontSize: 100}}/>
							</div>
							<input type="file" className='input-file' accept="image/*" hidden onChange={handleChangeImg} />
						</div>
	
					</div>
	
					<button className='d-flex justify-content-center align-items-center bg-light shadow-lg col-8 mt-3 mb-5 p-3 border gap-2' onClick={handleClickBorrar}>
						<IoMdTrash className='fs-4 text-secondary' />
						<p className='m-0'>ELIMINAR ARTICULO</p>
					</button>
				</section>
			</main>
		)
	}else if(design == 'mobile'){
		return (
			<main className='row col-12 m-0 p-0'>
				
				<header className='d-flex justify-content-between align-content-center bg-success p-4 shadow-lg'>
					<div className='d-flex'>
						<MdOutlineArrowBack className='fs-3 text-white mt-2' onClick={handleClickAtras} />
						<p className='fs-3 text-white m-0'>Editar articulo</p>
					</div>
					<button className='btn bg-transparent text-white fw-medium' onClick={handleClickGuardar}>GUARDAR</button>
				</header>
				
				<section className='row d-flex justify-content-center p-0 mx-auto'>
					<div className='bg-light shadow-lg col-12 mt-0'>
	
						<div className="form-floating mb-3">
							<input type="tetx" className="btn text-start form-control rounded-0 border-0 border-bottom fs-3" id="floatingInput" placeholder="name@example.com" onChange={handleChangeNombre} value={editNombre} />
							<label htmlFor="floatingInput">Nombre</label>
						</div>
	
						<div className="form-floating">
							<select onChange={handleChangeCategoria} className="form-select bg-transparent border-0 border-bottom rounded-0" id="floatingSelect" aria-label="Floating label select example">
								{ editCategoria != null ?
									<option value={editCategoria.id} >{editCategoria.categoria}</option>
								: null }
								{ categorias != null ?
									categorias.map((categoria, i)=>(
										<option key={categoria.id} value={categoria.id}>{categoria.categoria}</option>
									))
								: null
								}
							</select>
							<label htmlFor="floatingSelect">Categoria</label>
						</div>
	
						<div className='row mt-5 d-flex justify-content-evenly'>
							{/* GRUOP INPUTS 1 */}
							<div className='col-12 d-flex flex-column'>
								<div className='d-flex row'>
									<p className='col-6 text-center text-success fs-6 fw-medium'>Ingredientes</p>
									<p className='col-6 text-center text-success fs-6 fw-medium'>Precios</p>
								</div>
								<div className='input-ingredientes'>
									{ ingredientes != null && ingredientesPrecios != null ? 
										inputIngredientes.map((input, i)=>(
											<div className='d-flex' key={i}>
												<input type="text" className='input-ingrediente-1 input-ingrediente input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Ingrediente' defaultValue={ingredientes[i]}  />
												<input type="number" className='input-ingrediente input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Precio' defaultValue={ingredientesPrecios[i]} />
											</div>
										))
									: <></>}
								</div>
								<button type="button" className="btn btn-success align-self-center my-3" onClick={handleClickAgregarIngrediente}>Agregar Ingrediente adional</button>
								<button type="button" className="btn btn-danger align-self-center" onClick={handleClickEliminarIngrediente}>Eliminar input</button>
							</div>

							<hr className='mt-3' />					
							{/* GROUP INPUTS 2 */}
							{ inputsAdicionales ?
								<div className='col-12 my-5'>
								<div className='col-12 d-flex flex-column'>
									<div className='d-flex row'>
										<p className='col-6 text-center text-success fs-6 fw-medium'>Ingredientes adicionales</p>
										<p className='col-6 text-center text-success fs-6 fw-medium'>Precios ingredientes adicionales</p>
									</div>
									<div className='input-ingredientes-precio'>
										{ ingredientesAdicionales != null && ingredientesAdicionalesPrecios != null ?
											inpuIngredientesAdicionales.map((input, i)=>(
												<div className='d-flex' key={i}>
													<input type="text" className='input-adicionales input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Ingrediente' defaultValue={ingredientesAdicionales[i]} />
													<input type="number" className='input-adicionales input-group btn bg-transparent rounded-0 border-0 border-bottom text-start m-2' placeholder='Precio' defaultValue={ingredientesAdicionalesPrecios[i]} />
												</div>
											))
										: <></>}
									</div>
									<button type="button" className="btn btn-success align-self-center my-3" onClick={handleClickAgregarIngredienteAdicional}>Agregar Ingrediente</button>
									<button type="button" className="btn btn-danger align-self-center" onClick={handleClickEliminarIngredienteAdicional}>Eliminar input</button>
								</div>
								<hr />
								</div>	
							: <></>					
							}

							
						</div>
	
						<div className='d-flex justify-content-center'>
							<button type="button" className="col-6 w-75 btn btn-success align-self-center my-3 mx-auto" onClick={()=>setInputsAdicionales(!inputsAdicionales)}>Agregar adicionales</button>
						</div>
	
						<div className='my-5 d-flex' style={{height:200}}>
							<img src={img} className='col-6 object-fit-cover  h-100' alt="" />
							<div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{border:'dashed 2px gray'}} onClick={()=>document.querySelector('.input-file').click()}>
								<p className='text-success fs-4 m-0 text-center'>AGREGE LA IMAGEN DE PRODUCTO AQUI</p>
								<FaCloudUploadAlt className='text-success' style={{fontSize: 100}}/>
							</div>
							<input type="file" className='input-file' accept="image/*" hidden onChange={handleChangeImg} />
						</div>
	
					</div>
	
					<button className='d-flex justify-content-center align-items-center bg-light shadow-lg col-12 mt-3 mb-5 p-3 border gap-2' onClick={handleClickBorrar}>
						<IoMdTrash className='fs-4 text-secondary' />
						<p className='m-0'>ELIMINAR ARTICULO</p>
					</button>
				</section>
			</main>
		)
	}
}

export default EditarArticulo

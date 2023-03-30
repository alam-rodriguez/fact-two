import React, { useEffect ,useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Context 
import { AppContext } from '../context/AppContext';

// // Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { crearUsuario, iniciarSesion, auth, signGoogle, signFacebook, cerrarSesion } from '../firebase/firebase';

// import { crearUsuario, iniciarSesion, auth } from '../firebase/firebase';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';


const Configuracion = () => {
    const navigate = useNavigate();
  const { view, setView, emailUser, setEmailUser } = useContext(AppContext);

  useEffect(()=>{
    if(emailUser == null){
        navigate('/registrar');
    } 
  }, [] );

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  
  const handleClickCerrarSesion = async () => {
    const res = await cerrarSesion();
    if(res == 'sesion cerrada'){
        navigate('/registrar');
        toast.success(`Has salido de la cuenta llamada ${emailUser}`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
  }
  const handleClickAtras = () => {
    navigate('/ventas');
  }

  return (
    <div className='d-flex flex-column'>
      <div>
        <p className='text-center text-success fs-1 fw-bold pt-2'>FactTwo</p>
      </div>
      <h3 className='text-center fw-bolder'>Bienvenido</h3>
      <p className='text-center'>FactTwo es una programa de facturacion, capaz de crear clientes, productos y facturas.</p>
      
      {/* <form className='col-10 col-md-6 align-self-center mt-5'>
        <h3 className='text-center fw-bolder'>Bienvenido</h3>
        <p className='text-center'>FactTwo es una programa de facturacion, capaz de crear clientes, productos y facturas.</p>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={handleChangeEmail} autoComplete='on'/>
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={handleChangePassword} autoComplete='on' />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className='d-flex mt-3'>
          <button type="button" className="btn btn-success form-control m-2">Registrar</button>
          <button type="button" className="btn btn-success form-control m-2">Iniciar Sesion</button>
        </div>
        <div className='d-flex'>
          <button type="button" className="btn btn-success form-control m-2" >Google</button>
          <button type="button" className="btn btn-success form-control m-2" >Facebook</button>
        </div>
      </form> */}
      <p className='text-center'>Cuenta activa: <span className='fw-medium'>{emailUser}</span></p>
      <div className='d-flex justify-content-center'>
        <button type="button" className="btn btn-success m-2" onClick={handleClickAtras}>Volver al Programa</button>
        <button type="button" className="btn btn-success m-2" onClick={handleClickCerrarSesion}>Cerrar sesion</button>
      </div>
    </div>
  )
}

export default Configuracion;

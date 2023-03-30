import React, { useEffect ,useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Context 
import { AppContext } from '../context/AppContext';

// // Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { crearUsuario, iniciarSesion, auth, signGoogle, signFacebook } from '../firebase/firebase';

// import { crearUsuario, iniciarSesion, auth } from '../firebase/firebase';

// React Toastify
import { ToastContainer, toast } from 'react-toastify';


const RegistrarUsuario = () => {
  const { view, setView, emailUser, setEmailUser } = useContext(AppContext);

  useEffect( () => {
    onAuthStateChanged(auth, (user)=>{
      if(user) {
        setEmailUser(user.email);
        // console.log(user.email)
        // console.log(user.email + '==');
        // console.log(user.email+ '--');
        navigate(-1);
      }else {
        
      }
  });
  }, [] );


  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value); 

  const handleClickRegistrar = async () => {
    try {
      const res = await crearUsuario(email, password);
      if(res == email){
        // setView(1);
        // setEmailUser(res.user.email);
        console.log(res)
        navigate('/');
        toast.success(`Te has registrado con el correo de ${res}`, {
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
    } catch (error) {
      toast.error(error.code, {
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

  const handleClickIniciarSesion = async () => {
    try {
      const res = await iniciarSesion(email, password);
      if(res == email){
        // setView(1);
        setEmailUser(res);
        navigate('/');
        toast.success(`Has iniciado secion con el correo de ${res}`, {
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
    } catch (error) {
      toast.error(error.code, {
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
  // useEffect(()=>{
    
  // }, [] );
  const handleClickGoogle = async () => {
    try {
      const res = await signGoogle();
      toast.success(`Has iniciado seccion con el correo de ${res.user.email}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.code, {
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

  const handleClickFacebook = async () => {
    try {
      const res = await signFacebook()
      toast.success(`Has iniciado seccion con el correo de ${res.user.email}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      toast.error(error.code, {
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

  return (
    <div className='d-flex flex-column'>
      <div>
        <p className='text-center text-success fs-1 fw-bold pt-2'>FactTwo</p>
      </div>
      <form className='col-10 col-md-6 align-self-center mt-5'>
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
          <button type="button" className="btn btn-success form-control m-2" onClick={handleClickRegistrar}>Registrar</button>
          <button type="button" className="btn btn-success form-control m-2" onClick={handleClickIniciarSesion}>Iniciar Sesion</button>
        </div>
        <div className='d-flex'>
          <button type="button" className="btn btn-success form-control m-2" onClick={handleClickGoogle}>Google</button>
          <button type="button" className="btn btn-success form-control m-2" onClick={handleClickFacebook}>Facebook</button>
        </div>
      </form>
    </div>
  )
}

export default RegistrarUsuario;

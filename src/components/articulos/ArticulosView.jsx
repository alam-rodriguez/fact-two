import React, { useEffect, useContext, useState } from 'react';

// React Router Dom
import { useNavigate } from 'react-router-dom';

// Context
import { AppContext } from '../../context/AppContext';

// Firebase
import { ontenerImagen } from '../../firebase/firebase';

import imgDefault from '../../imagenes/default.png';

const ArticulosView = ({articulo}) => {
    const navigate = useNavigate();

    const { emailUser, articuloSelect, setArticuloSelect, } = useContext(AppContext)

    const [img, setImg] = useState(null);

    useEffect(() => {
        // console.log(articulo);
        const getImg = async () => {
            if(articulo.img != ''){
                setImg( await ontenerImagen(emailUser, articulo.id) )
            }else {
                setImg(imgDefault);
            }
        }
        getImg();
    }, []);
    

    const handleClickArticulo = () =>{
    
    setArticuloSelect(articulo);
    navigate('/articulos/editar-articulo');
    }

  return (
    <div className='d-flex align-content-center align-items-center my-2' onClick={handleClickArticulo}>
        <img src={img} className='rounded-circle object-fit-cover ' alt="" style={{width: 25, height:25}} />
        <div className='d-flex justify-content-between w-100 align-items-center border-0 border-bottom ms-2 py-3'>
            <p className='m-0'>{articulo.nombre}</p>
            { (articulo.adicionales.jamon != null) ?
                <p className='m-0'>{articulo.adicionales.jamon}</p>
            : 
                <p className='m-0'>00</p> 
            }
        </div>
    </div>
  )
}

export default ArticulosView;

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

import { ontenerImagen } from '../../firebase/firebase';

import imgDefaul from '../../imagenes/default.png'

const ArticuloCard = ({articulo}) => {

    const { design, setDesign, articuloSelect, setArticuloSelect,articulos, setArticulos,categorias, setCategorias, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

    const [img, setImg] = useState('');

		const [preciobase, setPreciobase] = useState(0);

    useEffect( () => {
        const getImg = async () => {
            if(articulo.img != '') setImg( await ontenerImagen(emailUser, articulo.id) );
            else setImg(imgDefaul);
        }
        getImg();

				let menor = 0;
				Object.keys(articulo).map((i)=>{
					if(i == 'adicionales'){
						Object.keys(articulo[i]).map((i2)=>{
							if(menor == 0){
								menor = articulo[i][i2];
							}else if(i2 < menor){
								menor = articulo[i][i2];
							}
						})
					}
				})
				setPreciobase(menor)
    }, [] );
    
    const handleClick = (articulo) => {
        setArticuloSelect(articulo);
        // console.log(articulo);
        // console.log(articulo.adicionales)

    }

    if(design == 'computer'){
        return (
            <div className='m-2 position-relative' onClick={()=>{handleClick(articulo)}} style={{
                height:'100px', 
                width:'100px', 
                backgroundImage: `URL(${img})`, 
                backgroundRepeat:'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='position-absolute bottom-0 w-100 bg-black bg-opacity-50 z-0' style={{}}>
                    <p className='text-opacity-100 text-white text-center' style={{opacity:1}}>{articulo.nombre}</p>
                </div>
            </div>
          )
    }else if(design == 'mobile'){
			return (
				<div className='col-12 d-flex px-3 py-1 align-items-center' onClick={()=>{handleClick(articulo)}}>
					<img className='rounded-circle col-2 object-fit-cover' src={img} style={{width:25, height:25}} />
					<div className='d-flex justify-content-between col-11 border-0 border-bottom py-2 ms-3'>
						<p className='fw-medium m-0'>{articulo.nombre}</p>
						<p className='fw-medium m-0 pe-3'>{preciobase}.00</p>
					</div>
				</div>
			)
		}

  
}

export default ArticuloCard;

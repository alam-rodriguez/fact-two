import React, { useContext, useEffect } from 'react';

import { AppContext } from '../../context/AppContext';

// Firebase
import { obtenerArticulos } from '../../firebase/firebase';

import ArticuloCard from './ArticuloCard';

const Articulos = ({articulos}) => {

    const { design, setDesign, categorias, setCategorias, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

    useEffect( () => {
        // console.log(articulos);
        // console.log(articulos.length)

        const getImg = async () => {
          if(articulos.length > 0){
            // await obtenerArticulos()
          }
        }
        getImg();
    }, [articulos] );

  // if(design == 'computer'){
    return (
      <div className='d-flex flex-wrap'>
          { articulos.length > 0 ?
              articulos.map((articulo)=>(
                <ArticuloCard articulo={articulo} key={articulo.id} />
              ))
          : 
            <>
              <p className='m-3'>No hay articulos</p>
            </>
          }
      </div>
    )
  // }else if(design == 'mobile'){
  //   return (
  //     <div className='d-flex flex-wrap'>
  //         { articulos.length > 0 ?
  //             articulos.map((articulo)=>(
  //               <ArticuloCard articulo={articulo} key={articulo.id} />
  //             ))
  //         : null
  //         }
  //     </div>
  //   )
  // }
}

export default Articulos

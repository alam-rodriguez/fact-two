// React
import React, { useContext, useEffect, useState } from 'react';

// Context
import { AppContext } from '../../context/AppContext';

//componente
import PedidoItem from './PedidoItem';

// React Icons
import { FaBars, FaLess } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai'
import { IoMdPersonAdd, IoMdMore, IoLogoNpm, IoMdArrowBack } from 'react-icons/io'
import { BiNotification } from 'react-icons/bi';

const Pedido = ({viewticket, setViewticket}) => {

    const { design, pedido, userSelected, setPedido, totalPedido, setTotalPedido, ordenCurrent, setOrdenCurrent, articulos, setArticulos,categorias, setCategorias, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

    const [totales, setTotales] = useState([]);

    const [total, setTotal] = useState(0);

    useEffect(()=>{
      if( ordenCurrent.length > 0 ){
        console.log(ordenCurrent);
        console.log('aqui');
      }
    }, [ordenCurrent])

    if( ordenCurrent.length > 0 ){

        console.log(ordenCurrent);
        // ordenCurrent.map((orden)=>{
        //     Object.keys(orden).map((item)=>{
        //         console.log(item)
        //     })
        // })
    }
    // Actualizar total definitivo
    useEffect( () => {
      let total = 0;
      totales.map((totalItem)=>{
        // setTotal(total + totalItem)
        total = total +  totalItem;
      });
      // total = total * ordenCurrent.cantidad;
      // console.log(ordenCurrent)
      setPedido(state => ({...state, totaldefinitivo: total}))
     
      // setPedido(state => ({...state, totaldefinitivo: total}))
      // console.log(pedido);
      console.log(total);
    }, [totales] );

		const handleClickViewTicket = () => {
			setViewticket(true)
		}

    const handleClickUser = () => {
      if( userSelected == null){
          setViewUser(1);
      }else {
          setViewUser(4);
      }
    }

    const handleClickBack = () => {
      setViewticket(false);
    }

    const handleChangeLugar = (e) => setPedido(state => ({...state, lugar: e.target.value}));

    if(design == 'computer'){
      if( ordenCurrent.length > 0){
        return (
            <div>
                <div className='border-0 border-bottom'>

              { ordenCurrent.map((orden, i)=>(
                  <PedidoItem key={i} orden={orden} totales={totales} setTotales={setTotales} />
                  // <div key={i} className='px-4  py-2'>
                  //     <p className='m-0 fw-bold'>{orden.nombre}<span className='text-secondary'> X {orden.cantidad}</span></p>
                  //     {/* {console.log(orden.adicicionales)} */}
                  //     { Object.keys(orden).map((item, i)=>(
                  //         // console.log(item.adicicionales)
                  //         (item != 'nombre' && item != 'cantidad' && item != 'nota' && item != 'adicicionales') ?
                              
                  //             <p key={i} className='d-inline-block m-0 fs-6 text-secondary'>{item},</p>
                          
                  //         : null
                  //     )) 
                  //     }
                  //     { Object.keys(orden.adicicionales).map((item2, i)=>(
                  //         <p key={i} className='d-inline-block m-0 fs-6 text-secondary'>{item2} </p>
                  //     ))
                          
                  //     }
                  //     {/* { Object.keys(orden).map((item)=>{
                  //         if(item != 'nombre' && item != 'cantidad' && item != 'nota' && item != 'adicicionales'){
                    //             return <p>{item}</p>
                  //         }
                  //     })} */}
                  //     {/* (item == 'adicicionales') ? 
                  //             Object.keys(item).map((item2)=>(
                    //                 // console.log(item2)
                  //                 <p key={item[item2]} className='d-inline-block'>{item[item2]},</p>
                  //             ))
                  //         : null */}
                  // </div>
                  ))
                }
              </div>
              <div className='d-flex justify-content-between p-4'>
                <p className='fw-bolder'>Total</p>
                <p className='fw-bolder'>{pedido.totaldefinitivo}.00</p>
              </div>
            </div>
          )
      }
    }else if(design == 'mobile') {
    if(viewticket ){
      return(
        <div className='position-relative min-vh-100 min-vw-100 bg-white p-0'>
          <div className='border-0 border-bottom m-0'>
            <header className='d-flex justify-content-between bg-success p-4 shadow-lg'>
              <div className='d-flex align-items-center'>
                <IoMdArrowBack className='fs-3 text-white' onClick={handleClickBack}/>
                <p className='fs-3 m-0 ms-3 text-white' onClick={handleClickBack}>Tickets</p>
                <div className='position-relative d-flex justify-content-center align-items-center ms-4' onClick={handleClickBack}>
                  <BiNotification className='display-5 text-white position-absolute' />
                  <p className='position-absolute m-0 text-white'>{ordenCurrent.length}</p>
                </div>
              </div>
              <div>
                <IoMdPersonAdd className='fs-3 mt-2 mx-3 text-white' onClick={handleClickUser} />
                <IoMdMore className='fs-3 mt-2 text-white' />
              </div>
            </header>
            <div className='d-flex justify-content-center border-bottom'>
              <select className='btn col-11 text-start' onChange={handleChangeLugar}>
                <option value="Comer dentro">Comer dentro</option>
                <option value="Para llevar">Para llevar</option>
                <option value="A domicilio">A domicilio</option>
              </select>
            </div>
            { ordenCurrent.map((orden, i)=>(
                  <PedidoItem key={i} orden={orden} totales={totales} setTotales={setTotales} />
                  // <div key={i} className='px-4  py-2'>
                  //     <p className='m-0 fw-bold'>{orden.nombre}<span className='text-secondary'> X {orden.cantidad}</span></p>
                  //     {/* {console.log(orden.adicicionales)} */}
                  //     { Object.keys(orden).map((item, i)=>(
                  //         // console.log(item.adicicionales)
                  //         (item != 'nombre' && item != 'cantidad' && item != 'nota' && item != 'adicicionales') ?
                              
                  //             <p key={i} className='d-inline-block m-0 fs-6 text-secondary'>{item},</p>
                          
                  //         : null
                  //     )) 
                  //     }
                  //     { Object.keys(orden.adicicionales).map((item2, i)=>(
                  //         <p key={i} className='d-inline-block m-0 fs-6 text-secondary'>{item2} </p>
                  //     ))
                          
                  //     }
                  //     {/* { Object.keys(orden).map((item)=>{
                  //         if(item != 'nombre' && item != 'cantidad' && item != 'nota' && item != 'adicicionales'){
                    //             return <p>{item}</p>
                  //         }
                  //     })} */}
                  //     {/* (item == 'adicicionales') ? 
                  //             Object.keys(item).map((item2)=>(
                    //                 // console.log(item2)
                  //                 <p key={item[item2]} className='d-inline-block'>{item[item2]},</p>
                  //             ))
                  //         : null */}
                  // </div>
                  ))
                }
              </div>
              <div className='d-flex justify-content-between p-4'>
                <p className='fw-bolder'>Total</p>
                <p className='fw-bolder'>{pedido.totaldefinitivo}.00</p>
              </div>
            </div>
      )
    }else {
      return (
        <div className='d-none'>
            <div className='border-0 border-bottom'>

          { ordenCurrent.map((orden, i)=>(
              <PedidoItem key={i} orden={orden} totales={totales} setTotales={setTotales} />
              // <div key={i} className='px-4  py-2'>
              //     <p className='m-0 fw-bold'>{orden.nombre}<span className='text-secondary'> X {orden.cantidad}</span></p>
              //     {/* {console.log(orden.adicicionales)} */}
              //     { Object.keys(orden).map((item, i)=>(
              //         // console.log(item.adicicionales)
              //         (item != 'nombre' && item != 'cantidad' && item != 'nota' && item != 'adicicionales') ?
                          
              //             <p key={i} className='d-inline-block m-0 fs-6 text-secondary'>{item},</p>
                      
              //         : null
              //     )) 
              //     }
              //     { Object.keys(orden.adicicionales).map((item2, i)=>(
              //         <p key={i} className='d-inline-block m-0 fs-6 text-secondary'>{item2} </p>
              //     ))
                      
              //     }
              //     {/* { Object.keys(orden).map((item)=>{
              //         if(item != 'nombre' && item != 'cantidad' && item != 'nota' && item != 'adicicionales'){
                //             return <p>{item}</p>
              //         }
              //     })} */}
              //     {/* (item == 'adicicionales') ? 
              //             Object.keys(item).map((item2)=>(
                //                 // console.log(item2)
              //                 <p key={item[item2]} className='d-inline-block'>{item[item2]},</p>
              //             ))
              //         : null */}
              // </div>
              ))
            }
          </div>
          <div className='d-flex justify-content-between p-4'>
            <p className='fw-bolder'>Total</p>
            <p className='fw-bolder'>{pedido.totaldefinitivo}.00</p>
          </div>
        </div>
      )
    }
  }
}

export default Pedido

import React, { useContext, useEffect, useState } from 'react';

// Context
import { AppContext } from '../../context/AppContext';

const PedidoItem = ({orden, totales, setTotales}) => {
    // Context
    const { totalPedido, setTotalPedido, setPedido ,orderCurrentView, setOrderCurrentView, ordenCurrent, setOrdenCurrent, articulos, setArticulos,categorias, setCategorias, view, setView, emailUser, setEmailUser, viewMenu, setviewMenu, viewUser, setViewUser, viewArticulos, setViewArticulos } = useContext(AppContext);

    // Para visualizar info
    const [ordenView, setOrdenView] = useState({
        nota: '',
        cantidad: 1,
    });

    const [totalItem, setTotalItem] = useState(0);

    // Array de ingredientes
    const [Ingredientes, setIngredientes] = useState([]);

    // Array de coste
    const [coste, setcoste] = useState([]);

    useEffect(()=>{
        let data = [];
        let costeItem = [];
        Object.keys(orden).map((item)=>{
            if( item == 'nombre'){
                // Establecer nombre
                setOrdenView(state => ({...state, nombre: orden[item]}))
            }else if(item == 'cantidad'){
                // establecer cantidad
                setOrdenView(state => ({...state, cantidad: orden[item]}))
            }else if(item == 'nota'){
                // establecer nota
                setOrdenView(state => ({...state, nota: orden[item]}))
            }else if(item == 'adicicionales'){
                Object.keys(orden[item]).map((item2)=>{
                     // para establecer ingredientes y precios
                    costeItem.push(orden[item][item2])
                    data.push(item2);
                })
            }else {
                // para establecer ingredientes y precios
                costeItem.push(coste + orden[item])
                data.push(item)
            }
            // setcoste(coste + costeItem);
        });
        setOrdenView(state => ({...state, costo: coste}))
        setIngredientes(data);
        setcoste(costeItem);

        console.log('first');
    }, [] );

    useEffect(()=>{
        // establecer coste de articulo y precio total
        if(coste.length > 0){
            let totalcurrent = 0;
            coste.map((item)=>{
                totalcurrent += Number(item);
            });
            totalcurrent = totalcurrent * orden.cantidad;
            console.log(totalcurrent);
            
            setTotales(state => ([...state, totalcurrent]));
            setTotalItem(totalcurrent);
            

            // setPedido(state => ({...state, totalfinal: total + totalcurrent}))

            // setcoste(totalcurrent);
            // setTotal(total + totalcurrent);
            // // setPedido(state => ({...state, total: total + totalcurrent}))
            // console.log(total + totalcurrent + '--')
            // // setOrdenCurrent(state => ({...state, total: total + totalcurrent}));
            // // setPedido(state => ({...state, total: total}))

            // setTotalPedido(totalPedido + totalcurrent);
            // // console.log(totalPedido + totalcurrent);
       }
    }, [coste])

    
    useEffect(()=>{
            // if(edit){
                setOrdenView(state => ({...state, ingredientes: Ingredientes}));
                // setEdit(false)
            // }
    }, [Ingredientes] );
    useEffect(()=>{
        // console.log(ordenView.ingredientes.data)
        // console.log(ordenView.ingredientes.data);
        // if( ordenView.ingredientes.data.length ){
        //     ordenView.ingredientes.data.forEach((i)=>{
        //         console.log(i)
        //     })
        // }
        if(ordenView.ingredientes != undefined){
            // setOrdenCurrent([]);
            // setIngredientes([]);
        }
        console.log(ordenView.nota)
        // ordenView.ingredientes.map((item)=>{
            // console.log(item)
        // })
        // ordenView.ingredientes.map((item)=>{
            // console.log(item)
        // })
    }, [ordenView] );


  return (
    <div  className='px-4 py-2 '>
        <div className='d-flex justify-content-between' style={{height:17}}>
            <p className='m-0 fw-medium'>{ordenView.nombre}<span className='text-secondary'> X {ordenView.cantidad}</span></p>
            <p className='precios'>{totalItem}.00</p>
       </div>
        { (ordenView.ingredientes != undefined) ?
            ordenView.ingredientes.map((ingrediente, i)=>(
                <p key={i} className='text-secondary d-inline-block m-0'>{ingrediente},</p>
            ))
        :   null
        }
       
        { (ordenView.nota != '') ?
            <p className='m-0 text-secondary fst-italic'>{ordenView.nota}</p>
        :   null
        }
                
            {/* { Object.keys(orden).map((item, i)=>(
                    (item != 'nombre' && item != 'cantidad' && item != 'nota' && item != 'adicicionales') ?
                        
                        <p key={i} className='d-inline-block m-0 fs-6 text-secondary'>{item},</p>
                    
                    : null
                )) 
                }
                { Object.keys(orden.adicicionales).map((item2, i)=>(
                    <p key={i} className='d-inline-block m-0 fs-6 text-secondary'>{item2} </p>
                ))
                    
                } */}
     </div>
  )
}

export default PedidoItem;

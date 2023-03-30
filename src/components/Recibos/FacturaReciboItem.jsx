import React, { useEffect, useState } from 'react'

const FacturaReciboItem = ({ element, total, setTotal }) => {

    const [ingredientePrincipal, setingredientePrincipal] = useState('');

    const [reciboSelected, setReciboSelected] = useState({});

    const [ingrendientes, setIngrendientes] = useState([]);

    const [costeOrden, setCosteOrden] = useState([]);

    useEffect(()=>{
        
    },[])

    useEffect(()=>{
        let costo = [];
        let ingredientes = [];
        // let costoPedido = 0;
        // setCosteOrden([])
        // console.log(element)
        Object.keys(element).map((i)=>{
            let totalItem = 0;
            // console.log(i)
            if(i == 'nombre'){
                setReciboSelected(state => ({...state, nombre: element[i]}));
                // console.log(element[i] + '--');
            }else if(i == 'cantidad'){
                setReciboSelected(state => ({...state, cantidad: element[i]}));
            }else if(i == 'adicicionales'){
                
                Object.keys(element[i]).map((i2)=>{
                    // setTotal(0)
                    ingredientes.push(`+ ${i2} (${element[i][i2]})`);
                    // setIngrendientes(state => ([...state, `+ ${i2} (${element[i][i2]})`]))
                    // console.log(i2);
                    // console.log(element[i][i2]);

                    // totalItem = totalItem + Number(element[i][i2]);

                    // setTotal(totalItem + Number(element[i][i2]));

                    costo.push( element[i][i2] );

                    // costoPedido = costoPedido + Number(element[i][i2]);
                    // setCosteOrden(state => ([...state, Number(element[i][i2])]))
                })
                // console.log(element[i])
            }else if(i == 'nota'){
                setReciboSelected(state => ({...state, nota: element[i]}));
            }else {
                
                // console.log([i] + '=')
                setingredientePrincipal(i);
                ingredientes.push(`+ ${i} (${element[i]})`);
                // setIngrendientes(state => ([...state, `+ ${i} (${element[i]})`]));

                // totalItem = totalItem + Number(element[i]);
                // console.log(element[i])
                
                // setCosteOrden(state => ([...state, element[i]]))

                // setTotal(totalItem + Number(element[i]))

                // console.log(i);
                // console.log(element[i])
                // costoPedido = costoPedido + Number(element[i]);
                costo.push( element[i] );
            }
            // console.log(i)
        });
        // console.log(costoPedido);
        // console.log(costo)
        setCosteOrden(costo);
        setIngrendientes(ingredientes);
    }, [element] );

    useEffect( () => {
        if(costeOrden.length > 0){
            let total = 0;
            costeOrden.map((i)=>{
                total = total + Number(i);
            });
            setCosteOrden(total);
        }
        // console.log(ingrendientes)
    }, [costeOrden] );

    useEffect( () => {
        console.log(ingrendientes)
    }, [ingrendientes] );

    

  return (
    <div className='my-2'>
        <div className='d-flex justify-content-between'>
            <p className='m-0'><span className='text-secondary'>{reciboSelected.cantidad}</span>- <span className='fw-medium'>{reciboSelected.nombre}: {ingredientePrincipal}</span></p>
            <p className='m-0'>{costeOrden}</p>
            {/* <p>{costeOrden.length > 0 ?
                <p>{ costeOrden.length > ?
                    costeOrden.map((i)=>{
                        return i
                    })
                : null
                }</p>
            : null}</p> */}
        </div>
        {/* {Object.keys(element).map((item, i)=>(
            <div key={i}>
                <div>
                    <p>{ingredientePrincipal}</p>
                </div>
            </div>
        ))} */}
        {/* <p>{ingredientePrincipal}</p> */}
        { ingrendientes.length > 0 ?
            ingrendientes.map((item, i)=>(
                <p className='text-secondary m-0' key={i}>{item}</p>
            ))
        : null }
        { element.nota != '' ?
            <p className='text-secondary m-0 fst-italic'>{element.nota}</p>
        : null }
    </div>
  )
}

export default FacturaReciboItem;

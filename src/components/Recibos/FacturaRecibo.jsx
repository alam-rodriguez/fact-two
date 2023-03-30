import React, { useEffect, useState } from 'react';

// Componente
import FacturaReciboItem from './FacturaReciboItem';

const FacturaRecibo = ({i, reciboSelected}) => {

    const [ordenes, setOrdenes] = useState([]);

    const [total, setTotal] = useState(0);

    useEffect(()=>{
        
    },[] );

    useEffect( () => {
        setTotal(0)
        // reciboSelected.orden.map((i)=>{
        //     console.log(i.nombre)
        // })
        reciboSelected.orden.forEach(element => {
            let data = {};
            // data.nombre = element.nombre
            // console.log(element.nombre);
            Object.keys(element).map((item)=>{
                // console.log(item);
                if(item == 'nombre'){
                    data.nombre = item;
                    // console.log(element[item])
                }else if(item == 'cantidad'){
                    data.cantidad = item;
                }else if(item == 'nota'){
                    data.nota = item;
                }else if(item == 'adicicionales'){
                    // console.log(element[item]);
                }
            })
        });
        
        // Object.keys(reciboSelected.orden).map((item)=>{
        //     console.log(item);
        // })

        // console.log(reciboSelected);
        // console.log(reciboSelected.orden)
    }, [reciboSelected]);

  return (
    <div className='bg-white col-10 mt-5 mx-auto shadow-lg border p-3'>
        <p className='fs-3 text-center fw-medium m-0'>{reciboSelected.total}.00</p>
        <p className='text-center m-0 text-secondary'>Total</p>

        <hr className='mb-1' />
        { reciboSelected.cliente != null ? 
        <>
            <p className='m-0'>Empleado: Nelson Rodriguez</p>
            <p className='m-0'>TPV: Pizzeria</p>
            <p className='m-0'>Cliente: {reciboSelected.cliente.nombre}</p>
            <hr className='my-2' />
        </>
        : <></> }
        <p className='fw-bold m-0'>{reciboSelected.lugar}</p>
        <hr className='my-2' />
        {/* <p>{item.nombre}</p> */}
        {/* { reciboSelected.orden.map((item,i)=>(
            <div key={i}>
                <div>
                </div>
                </div>
                ))
            } */}
        { reciboSelected.orden.map((element, i)=>(
            <FacturaReciboItem key={i} element={element} total={total} setTotal={setTotal} />
        ))
        }
        <hr className='my-2' />
        <div className='d-flex justify-content-between'>
            <p className='fw-bold mb-1'>Total</p>
            <p className='fw-bold mb-1'>{reciboSelected.total}.00</p>
        </div>
        <div className='d-flex justify-content-between'>
            <p className='mb-1'>Efectivo</p>
            <p className='mb-1'>{reciboSelected.total}.00</p>
        </div>
          <hr className='my-2' />
        <div className='d-flex justify-content-between'>
            <p className='text-secondary mb-0'>{reciboSelected.fecha}, {reciboSelected.hora}</p>
            <p className='text-secondary mb-0'>#-{i+1}</p>
        </div>
        </div>
  )
}

export default FacturaRecibo;

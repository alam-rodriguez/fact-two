import React, { useContext, useEffect} from 'react';

// Iconos
import { AiOutlineSearch } from 'react-icons/ai'
import { IoIosCash } from 'react-icons/io';

// Context
import { AppContext } from '../../context/AppContext';

// // Firbase
// import { obtenerRecibo } from '../../firebase/firebase';

const ReciboItem = ({recibo, i, setReciboSelected, setI}) => {

    const { design, emailUser } = useContext(AppContext);

    // const [fecha, setFecha] = useState('');

    // useEffect(() => {
    //     console.log(recibo);
    //     setFecha(new Date().toLocaleDateString())
    // }, []);


    const handleClickItem = () => {
        setReciboSelected(recibo);
        setI(i);
    }

  if(design == 'computer'){
    return (
        <li className='d-flex align-items-center row' onClick={handleClickItem}>
            <IoIosCash className='col-2 fs-3' />
            <div className='col-10 d-flex border-0 border-bottom p-2'>
                <div className='col-8'>
                    <p className='m-0'>{recibo.total}.00</p>
                    <p className='text-secondary m-0'>{recibo.hora}</p>
                </div>
                <p className='text-secondary col-4'>#-{i + 1}</p>
            </div>
        </li> 
    )
  }else if(design == 'mobile'){
    return (
        <li className='d-flex align-items-center row' onClick={handleClickItem}>
            <IoIosCash className='col-2 fs-3 p-0 m-0' />
            <div className='col-10 d-flex border-0 border-bottom p-2 px-0'>
                <div className='col-8'>
                    <p className='m-0'>{recibo.total}.00</p>
                    <p className='text-secondary m-0'>{recibo.hora}</p>
                </div>
                <p className='text-secondary col-4'>#-{i + 1}</p>
            </div>
        </li> 
    )
  }
}

export default ReciboItem;

import React, { useEffect, useContext} from 'react';

// Context
import { AppContext } from '../context/AppContext';

// React Router
import { useNavigate } from 'react-router-dom';

// Componentes
import Ventas from './Ventas';



const Content = () => {

    const navigate = useNavigate();

    const { view, setView, emailUser, setEmailUser, viewMenu, setviewMenu } = useContext(AppContext);

    useEffect( () => {

        

        if( emailUser == null){
            // console.log(emailUser)
            navigate('/registrar');
        }else {
            navigate('/ventas');
        }
        
    }, [] );

  return (
    <div>
        {/* <Ventas />
        hola     */}
    </div>
  )
}

export default Content

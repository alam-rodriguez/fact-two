// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Context Provider
import { AppContextProvider } from './context/AppContext'

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
import RegistrarUsuario from './components/RegistrarUsuario';
import Content from './components/Content';
import Ventas from './components/Ventas';
import Recibos from './components/Recibos';
import Articulos from './components/Articulos';
import AgregarCategoria from './components/articulos/AgregarCategoria';
import AgregarArticulo from './components/articulos/AgregarArticulo';
import Ventas2 from './components/Ventas2';
import Ventas3 from './components/Ventas3';
import EditarCategoria from './components/articulos/EditarCategoria';
import EditarArticulo from './components/articulos/EditarArticulo';
import Configuracion from './components/Configuracion';

// CSS
import './App.css';

function App() {
  
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Content />} />
          <Route path='/registrar' element={<RegistrarUsuario />} />
          <Route path='/ventas' element={<Ventas />} />
          <Route path='/ventas/ventas2' element={<Ventas2 />} />
          <Route path='/ventas/ventas3' element={<Ventas3 />} />
          <Route path='/recibos' element={<Recibos />} />
          <Route path='/articulos' element={<Articulos />} />
          <Route path='/articulos/editar-categoria' element={<EditarCategoria />} />
          <Route path='/articulos/editar-articulo' element={<EditarArticulo />} />
          <Route path='/categorias/agregar-articulo' element={<AgregarArticulo />} />
          <Route path='/categorias/agregar-categoria' element={<AgregarCategoria />} />Configuracion
          <Route path='/configuracion' element={<Configuracion />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;

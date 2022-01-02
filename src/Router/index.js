//Este archivo se llama index por convencion de JavaScript
//al momento de importar desde otro archivo este archivo, lo puedo importar como 
// import './router';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Products from '../components/Products';

const Router = () => (
    //Este componente hace parte de react-router, y lo que hace es crearme un contenedor
    // para mi enrutador y mis rutas
    <BrowserRouter>
        {/* este es el contenedor de las rutas que se van a configurar */}
        <Routes>
            {/* Esta es la forma de definir una ruta basica */}
            <Route path="/productos" element={<Products />} />
        </Routes>
    </BrowserRouter>
);

export default Router;
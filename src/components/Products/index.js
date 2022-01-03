//Este es el componente de entrada para todos los productos (Administrador de productos)
import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import ProductsList from "./ProductsList";
import Productform from "./Productform";

import axios from 'axios';

//esta es otra forma para exportar un compoenente desde una sola linea
export default function Products() {

    //aqui definimos el el estado de este componente
    //definimos la variable products para el estado
    //en esta variable vamos a almacenar la respuesta
    //de la peticion al back de los productos
    //entonces, en este caso, el estado es donde yo almaceno los datos devueltos 
    //por el servidor 
    const [products, setProducts] = useState([]);
    //se usa el Hook useState, que se define con dos parametros
    //la variable para almaecenar los datos y la funcion para actualizar dicha variable
    //en le useState([]) se esta definiendo el valor de products como un array vacio


    //con axios hago un get (peticion GET al back con el url '/products') para traer los productos
    //igual que en postman
    const getProducts = () => axios.get('/products')
        //defino la variable que me trae la respuesta del servidor 
        .then((respuesta) => {
            //valido que la respuesta tenga un status 200 OK
            if (respuesta.status === 200) {
                // con la funcion que defini anteriormente con useState, actualizo la variable products
                setProducts(respuesta.data)
            }
        })

    //este hook se utiliza para ejecutar funciones al momento en que se renderiza el componente
    //desde aqui puedo usar el setProducts que defini con el useState para agregar los valores
    //retornados desde el back en el estado (en este caso la variable products)
    useEffect(() => {

        // se refactoriza para tener una funcion dedicada que traiga los productos
        // para ejecutarla cada que se crea el componente y cada qyue elimino un producto
        getProducts();

    //use efect recibe un segundo parametro, en este caso [], para vitar que se ejcute muchas veces
    }, [])

    const [editando, setEditando] = useState(false)
    const [productoAEditar, setProoductoEditar] = useState({
        name: '',
        description: '',
        qty: 0,
        price: 0,
    })

    const editProduct = (producto) => {
        setEditando(true);
        setProoductoEditar({...producto});
    }

    const dejarDeEditar = () => setEditando(false);

    return (
        //React siempre necesita que un componente se renderice sobre solo una etiqueta padre
        //Esta es una fora de poner esa etiqueta desde la cual se rendereiza el resto del contenido
        <>
            <Typography variant="h4" >Productos</Typography>
            <br />
            <br />
            {/* aqui, como componente padre, le estoy mandando propiedades (props) a mi hijo (productform)
            las propiedades se pueden llamar como yo quiera y pueden tener el valor que yo desee enviar */}
            <Productform 
                editandoProducto={editando}
                productoAEditar={productoAEditar}
                dejarDeEditar={dejarDeEditar}
                refrescarProductos={getProducts} 
            />
            <br />
            <br />
            <ProductsList 
                products={products} 
                refrescarProductos={getProducts} 
                editarProducto={editProduct}
            />
        </>
    );
}

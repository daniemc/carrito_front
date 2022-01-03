import React, { useState, useEffect } from 'react';
import {
    Table,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
} from '@mui/material';

import axios from 'axios';

//Se necesita instalar 'npm install @mui/icons-material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



function ProductsList() {    


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


    //este hook se utiliza para ejecutar funciones al momento en que se renderiza el componente
    //desde aqui puedo usar el setProducts que defini con el useState para agregar los valores
    //retornados desde el back en el estado (en este caso la variable products)
    useEffect(() => {

        //con axios hago un get (peticion GET al back con el url '/products') para traer los productos
        //igual que en postman
        axios.get('/products')
            //defino la variable que me trae la respuesta del servidor 
            .then((respuesta) => {
                //valido que la respuesta tenga un status 200 OK
                if (respuesta.status === 200) {
                    // con la funcion que defini anteriormente con useState, actualizo la variable products
                    setProducts(respuesta.data)
                }
            })
    }, [])


    return (
        <>
           <Table>
               <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="center">Nombre</TableCell>
                    <TableCell align="center">Descripcion</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="center">Precio</TableCell>
                    <TableCell align="center">Tipo</TableCell>
                    <TableCell align="center"></TableCell>
                </TableRow>
               </TableHead>
               <TableBody>
                   {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell align="center">{product.name}</TableCell>
                            <TableCell align="center">{product.description}</TableCell>
                            <TableCell align="center">{product.qty}</TableCell>
                            <TableCell align="center">{product.price}</TableCell>
                            <TableCell align="center">{product.type}</TableCell>
                            <TableCell align="center">
                            <IconButton 
                                color="secondary"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                   ))}
               </TableBody>
            </Table> 
        </>
    );
}

export default ProductsList;
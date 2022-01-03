import React from 'react';
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



function ProductsList(props) {    
    

    //funcion para manejar el evento de clic en el boton de eliminar
    //y ejecutar la eliminacion del producto
    const eliminarProducto = (idProducto) => {
        
        axios.delete(`/products/${idProducto}`)
            .then((respuesta) => {
                if (respuesta.status === 200) {
                    //Se llama la funcion get products para actualizar la lista de productos
                    //sin el producto eliminado
                    props.refrescarProductos();
                }
            })
    }   


    return (
        <TableContainer component={Paper}>
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
                   {/* utilizamos la funcion map para recorrer el array de productos
                   cada producto se asigna a la variable product y se pone en cada una de las celdas */}
                   {props.products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell align="center">{product.name}</TableCell>
                            <TableCell align="center">{product.description}</TableCell>
                            <TableCell align="center">{product.qty}</TableCell>
                            <TableCell align="center">{product.price}</TableCell>
                            <TableCell align="center">{product.type}</TableCell>
                            <TableCell align="center">
                            <IconButton 
                                // cuando se da clic se envia el producto a editar
                                onClick={() => props.editarProducto(product)}
                                color="secondary"
                            >
                                <EditIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => eliminarProducto(product.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                            </TableCell>
                        </TableRow>
                   ))}
               </TableBody>
            </Table> 
        </TableContainer>
    );
}

export default ProductsList;
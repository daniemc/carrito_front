//Este es el componente de entrada para todos los productos (Administrador de productos)
import React from "react";
import Typography from '@mui/material/Typography';
import ProductsList from "./ProductsList";
import Productform from "./Productform";

//esta es otra forma para exportar un compoenente desde una sola linea
export default function Products() {
    return (
        //React siempre necesita que un componente se renderice sobre solo una etiqueta padre
        //Esta es una fora de poner esa etiqueta desde la cual se rendereiza el resto del contenido
        <>
            <Typography variant="h4" >Productos</Typography>
            <br />
            <br />
            <Productform />
            <br />
            <br />
            <ProductsList />
        </>
    );
}

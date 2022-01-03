//Creacion de formulario para enviar datos a back para crear el producto
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    TextField,
    Button,
} from '@mui/material';

//Aqui estoy recibiendo las propiedades (props) enviadas por el padre
function Productform(props) {

    //definimos los datos del formualrio usando el Hook useState
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        description: '',
        qty: 0,
        price: 0,
    });

    //definimos la funcion que va a manejar el evento onChange en cada input
    //Este evento detecta todos los cambios que se hacen en los inputs
    //y con la function setFormData, definida con useState, vamos a ir llenando cada uno de los 
    //valores del form en el estado
    //la variable e que recibe la funcion significa Evento
    const cambioEnForm = (e) => setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });   
    

    //Se crea esta funcion para validar el formulario sin usar otras librerias
    const formIsValid = () => {
        let valid = true;
        if (formData.name.trim() === '') {
            valid = false;
        }
        if (formData.description.trim() === '') {
            valid = false;
        }
        if (formData.qty.toString().trim() === '' || parseInt(formData.qty, 10) < 0) {
            valid = false;
        }
        if (formData.price.toString().trim() === '' || parseInt(formData.price, 10) < 0) {
            valid = false;
        }

        return valid;
    }


    // funcion para enviar datos del formulario al back
    const enviarDatos = () => {

        //Se valida que el formulario sea valido
        if (formIsValid()) {
            
            //Se usa axios con el metodo POST para enviar los datos
            axios.post('/products', formData)
                .then((respuesta) => {
                    console.log(respuesta);
                    if (respuesta.status === 200) {
                        props.refrescarProductos();
                        setFormData({
                            id: null,
                            name: '',
                            description: '',
                            qty: 0,
                            price: 0,
                        });
                    }
                })

        } else {
            //Si no es valido se saca una alerta
            alert("Por favor complete el formulario correctamente.")
        }
    }

    const actualizarDatos = () => {

        //Se valida que el formulario sea valido
        if (formIsValid()) {
            // Se crea la variable payload para enviar solo los datos que se deben 
            //actualizar en el back
            const payload = {
                name: formData.name,
                description: formData.description,
                qty: formData.qty,
                price: formData.price,
            }
            //Se usa axios con el metodo POST para enviar los datos
            axios.put(`/products/${formData.id}`, payload)
                .then((respuesta) => {
                    console.log(respuesta);
                    if (respuesta.status === 200) {
                        props.refrescarProductos();
                        props.dejarDeEditar();
                        setFormData({
                            id: null,
                            name: '',
                            description: '',
                            qty: 0,
                            price: 0,
                        });
                    }
                })

        } else {
            //Si no es valido se saca una alerta
            alert("Por favor complete el formulario correctamente.")
        }
    }

    useEffect(() => {
        if (props.editandoProducto) {
            setFormData({...props.productoAEditar});
        }

    }, [props.editandoProducto])

    return (
        <form>
            <TextField 
                name="name" 
                //Asignamos el valor del input desde el formdata, definido en el estado con el Hook useState
                value={formData.name} 
                label="Nombre" 
                // cada que un textField cambia, ejecutamos la fuincion cambio en form
                onChange={(e) => cambioEnForm(e)}
            />
            <TextField 
                name="description" 
                value={formData.description} 
                label="Descricion" 
                onChange={(e) => cambioEnForm(e)}
            />
            <TextField 
                name="qty" 
                value={formData.qty} 
                label="Cantidad" 
                onChange={(e) => cambioEnForm(e)}
                type="number" 
            />
            <TextField 
                name="price" 
                value={formData.price} 
                label="Precio" 
                onChange={(e) => cambioEnForm(e)}
                type="number" 
            />
            {props.editandoProducto ? 
            (<Button 
                color="secondary" 
                variant="contained"
                onClick={() => actualizarDatos()}
            >
                Actualizar
            </Button>) : 
            (<Button 
                color="primary" 
                variant="contained"
                onClick={() => enviarDatos()}
            >
                Guardar
            </Button>)
            }
            
        </form>
    );
}

export default Productform;
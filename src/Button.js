import React from 'react';

// Con este componente se representarán todos los botones con números y operadores, quedando diferenciados con el parámetro
// 'value' y la función 'onClick' que fueron seteados en el componente 'Buttons'. 

export default function Button (props){
    return (
        <button onClick={() => props.onClick(props.value)} id='miBoton'>{props.value}</button>    // El mismo character que muestre un boton en la página, será el parametro de la función 'onClick'.
    )
}


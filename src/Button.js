import React from "react";

// Con este componente se representarán todos los botones con números y operadores, quedando diferenciados con el parámetro "value", la función "onClick", y el parámetro "className" que fueron seteados en el componente "Buttons". 
export default function Button (props){
    return (
        <button onMouseDown={() => props.onMouseDown(props.value)} className={props.className} >{props.value}</button>    // El mismo character que muestre un boton en la página, será el parametro de la función "onMouseDown".
    )
}


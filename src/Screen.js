import React from "react";
import { connect } from "react-redux"; 

// Este componente mostrará el número que se esta ingresando, o el resultado de una operación.
function Screen (props){   // A diferencia de un componente de Clase, un componente Funcional debe tener explicitamente el parámetro "props".
    return (
        // Renderizado condicional para definir si se debe mostrar el primer número ingresado o el segundo.
        <span id="screen" >{props.operator === "" ? props.numA : props.numB}</span>
    )
}


// Los componentes que necesiten subscribirse al Store, para obtener la información que se necesita en este componente, deben tener la función "mapStateToProps", y el export con la función "connect".
const mapStateToProps = (state) => {   
    return {
        numA: state.numA,
        numB: state.numB,
        operator: state.operator
    };
};


// Usando "connect" en el "export default", estoy exportando una versión de este componente donde ya tiene en sus props los estados definidos en "mapStateToProps", y las "Actions Creators" presentes en el segundo parámetro (en este componente no se necesitan).
export default connect(mapStateToProps, null)(Screen);  // Al final de un "connect" debe ir siempre el componente actual entre paréntesis.


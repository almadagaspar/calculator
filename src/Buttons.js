import React from 'react';
import Button from './Button.js';
import { connect } from 'react-redux';        // Importo connect, que es la funcion que conecta este componente con Redux.
import { nuevoNumero, operador, cambiarSigno, reiniciar, resultado } from './Actions';        // Importo las Actions Creators.

// Este componente 'Buttons', es un contenedor que hace multiples invocaciones al componente 'Button'. Aqui se define
// la función que se debe ejecutar al hacerce click en cada invocación a 'Button', y tambien el parametro 'value' para cada caso. 
function Buttons (props){  // A diferencia de un componente de Clase, un componente Funcional debe tener explicitamente el parámetro 'props'.
    return (
        <div>
            <div>
                <Button onClick={props.nuevoNumero} value={'7'} />
                <Button onClick={props.nuevoNumero} value={'8'} />
                <Button onClick={props.nuevoNumero} value={'9'} />
            </div> 
            <div>
                <Button onClick={props.nuevoNumero} value={'4'} />
                <Button onClick={props.nuevoNumero} value={'5'} />
                <Button onClick={props.nuevoNumero} value={'6'} />
            </div> 
            <div>
                <Button onClick={props.nuevoNumero} value={'1'} />
                <Button onClick={props.nuevoNumero} value={'2'} />
                <Button onClick={props.nuevoNumero} value={'3'} />
            </div> 
            <div>
                <Button onClick={props.nuevoNumero} value={'0'} />
            </div>   
            <div>
                <Button onClick={props.reiniciar} value={'C'} />
                <Button onClick={props.operador} value={'/'} />
                <Button onClick={props.operador} value={'*'} />
                <Button onClick={props.operador} value={'-'} />
                <Button onClick={props.operador} value={'+'} />
            </div>
            <div>
                <Button onClick={props.cambiarSigno} value={'+/-'} />
                <Button onClick={props.resultado} value={'='} /> 
            </div>
        </div>

    )
}

// Todos los componentes que necesiten subscribirse al Store tanto para leer su información, como para
// obtener Actions Creators (que serán automáticamente dispatcheadas al ejecutarse), deben tener como mínimo 
// la función 'mapStateToProps', y el export con la función 'connect'.

const mapStateToProps = (state) => {   // En la función 'mapStateToProps' defino la información del Store que necesitaré en este componente.
  return {
      numA: state.numA,
      numB: state.numB,
      operador: state.operador
    };
};

// Al usar la función 'connect' en el 'export default', lo que estoy haciendo es exportar una versión de este componente donde ya tiene
// en sus props los estados definidos en 'mapStateToProps', y las 'Actions Creators' presentes en el segundo parámetro. 
// Estas 'Actions Creators' son solo las que necesito en este componente, y serán automáticamente dispatcheadas al ejecutarse. 

export default connect(mapStateToProps, { nuevoNumero, operador, cambiarSigno, reiniciar ,resultado })(Buttons);    

// Al final de un 'connect' debe ir siempre el componente actual entre paréntesis.
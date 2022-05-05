import React from "react";
import Button from "./Button.js";
import { connect } from "react-redux";        // Importo connect, que es la funcion que conecta este componente con Redux.
import { newNum, operator, changeSign, reset, result } from "./Actions";        // Importo las Actions Creators.

// Este componente "Buttons", es un contenedor que hace multiples invocaciones al componente "Button". Aqui se define la funcionalidad y aspecto que tendra cada uno de ellos. 
function Buttons (props){  
    return (
        <div className="grid-container">
                <Button onMouseDown={props.reset} value={"C"} className="btnClear" />
                <Button onMouseDown={props.changeSign} value={"+/-"} className="btnNormal" />
                <Button onMouseDown={props.operator} value={"/"} className="btnNormal" />
                <Button onMouseDown={props.operator} value={"*"} className="btnNormal" />

                <Button onMouseDown={props.newNum} value={"7"} className="btnNormal" />
                <Button onMouseDown={props.newNum} value={"8"} className="btnNormal" />
                <Button onMouseDown={props.newNum} value={"9"} className="btnNormal" />
                <Button onMouseDown={props.operator} value={"-"} className="btnNormal" />
            
                <Button onMouseDown={props.newNum} value={"4"} className="btnNormal" />
                <Button onMouseDown={props.newNum} value={"5"} className="btnNormal" />
                <Button onMouseDown={props.newNum} value={"6"} className="btnNormal" />
                <Button onMouseDown={props.operator} value={"+"} className="btnNormal" />
            
                <Button onMouseDown={props.newNum} value={"1"} className="btnNormal" />
                <Button onMouseDown={props.newNum} value={"2"} className="btnNormal" />
                <Button onMouseDown={props.newNum} value={"3"} className="btnNormal" />
                <Button onMouseDown={props.result} value={"="}  className="btnEqual"/> 
             
                <Button onMouseDown={props.newNum} value={"0"} className="btnCero" />
                <Button onMouseDown={props.newNum} value={"."} className="btnNormal" />
        </div>
    )
}



// Usando "connect" en el "export default", estoy exportando una versión de este componente donde ya tiene en sus props los estados definidos en "mapStateToProps", y las "Actions Creators" presentes en el segundo parámetro. Estas "Actions Creators" son solo las que necesito en este componente, y serán automáticamente dispatcheadas al ejecutarse.  
export default connect(null, { newNum, operator, changeSign, reset ,result })(Buttons);    



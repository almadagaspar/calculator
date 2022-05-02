import { NUEVO_NUMERO, OPERADOR, CAMBIAR_SIGNO, REINICIAR, RESULTADO } from './Actions.js';


const initialState = {  // Creo un estado inicial.
    numA: "0",       // Estado que almacenará el primero número a ingresar.
    numB: "0",       // Estado que almacenará el segundo número a ingresar.
    operador: 'SIN-DEFINIR',         // Estado que almacenará la operación matemática que se realizará entre los dos números ingresados al presionarse '='.
    reemplazar: false         // Estado con el que se determinará si el número mostrado debe ser remplazado o no, por el nuevo número que se esta intrduciendo.
}


// El Reducer contempla el ingreso de un primer número, un operador matemático, un segundo número, y el boton '=' para generar el resultado. También contempla el cambio de signo del número, y reiniciar todos los valores.
export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case NUEVO_NUMERO:      // Si se presionó un botón con un número, o el boton con el punto...
        
        const screenNumber = document.getElementById("screenNumber").innerText;

            // Evito que se introduzca más de un punto, que el numero ingresado sea mayor que la pantalla, y que se concatenen ceros como primer valor.
            if ( (action.payload === "." && screenNumber.includes('.')) ||
                screenNumber.length >= 10  ||
                (screenNumber === "0" && action.payload === "0")) {
                return { ...state }
            }

            // Si tengo que reemplazar el "0"
            if (screenNumber === "0" && action.payload !== ".") {  
                return state.operador === 'SIN-DEFINIR' ? {
                    ...state,
                    numA: action.payload 
                } : {
                    ...state,
                    numB: action.payload 
                }       
            }
            
            // Si tengo que concatenar
            return state.operador === 'SIN-DEFINIR' ? {
                ...state,
                numA: state.numA + action.payload 
            } : {
                ...state,
                numB: state.numB + action.payload 
            }
                
        case OPERADOR:             // Si se presionó sobre un operador matemático...
            return {
                ...state,
                operador: action.payload           // Lo almaceno en mi estado.
            }
        case CAMBIAR_SIGNO:      // Si se presionó el boton para cambiar el signo...
            return state.operador === 'SIN-DEFINIR' ? {
                ...state,
                numA: (-Number(state.numA)).toString()            // ...entonces le tengo que cambiar el signo al segundo número.
            } : {
                ...state,
                numB: (-Number(state.numB)).toString()            // ...entonces le tengo que cambiar el signo al segundo número.
            }
        case REINICIAR:          // Si se presionó el boton 'C' (Clear) reinicio todos los valores...
            return {
                ...state,
                numA: state.numA = "0",
                numB: state.numB = "0",
                operador: state.operador = 'SIN-DEFINIR'   // ¿¿¿ Debo agregar "reemplazar: state.reemplazar = false" ???
            };
        case RESULTADO:     // Si se presionó el boton '=' relaizo la operación matemática correspondiente y almaceno el resultado en el primer número para que se pueda seguir haciendo más cálculos, y reinicio los otros estados.
            switch (state.operador) {     
                case '+':
                    return {
                        ...state,
                        numA: (Number(state.numA) + Number(state.numB)).toString(),
                        operador: state.operador = 'SIN-DEFINIR',
                        numB: state.numB = "0",
                        reemplazar: state.reemplazar = true
                    }

                case '-':
                    return {
                        ...state,
                        numA: (Number(state.numA) - Number(state.numB)).toString(),
                        operador: state.operador = 'SIN-DEFINIR',
                        numB: state.numB = "0",
                        reemplazar: state.reemplazar = true
                    }

                case '*':
                    return {
                        ...state,
                        numA: (Number(state.numA) * Number(state.numB).toString()),
                        operador: state.operador = 'SIN-DEFINIR',
                        numB: state.numB = "0",
                        reemplazar: state.reemplazar = true
                    }

                case '/':
                    if (state.numB !== 0) {
                        return {
                            ...state,
                            numA: (Number(state.numA) / Number(state.numB)).toString(),
                            operador: state.operador = 'SIN-DEFINIR',
                            numB: state.numB = "0",
                            reemplazar: state.reemplazar = true
                        }
                    } else {
                        alert('No se puede dividir por cero.')
                        return {
                            ...state,
                            numA: "0",
                            operador: state.operador = 'SIN-DEFINIR',
                            numB: state.numB = "0",
                            reemplazar: state.reemplazar = true
                        }
                    }

                default:
                    return state;     // Siempre se debe devolver el estado para los casos en los que el Reducer no pueda procesar la Action recibida.
            }

        default:
            return state;      // Siempre se debe devolver el estado para los casos en los que el Reducer no pueda procesar la Action recibida.
    }

}
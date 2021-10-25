import { NUEVO_NUMERO, OPERADOR, CAMBIAR_SIGNO, REINICIAR, RESULTADO } from './Actions.js';


// Testing push from Ubuntu 1
// Testing push from Windows 1
// Testing push from Ubuntu 2
// Testing push from Ubuntu 3
// Testing push from Windows 2
// Testing push from Windows 3
// Testing push from Ubuntu 4

const initialState = {  // Creo un estado inicial.
    numA: 0,       // Estado que almacenará el primero número a ingresar.
    numB: 0,       // Estado que almacenará el segundo número a ingresar.
    operador: 'SIN-DEFINIR',         // Estado que almacenará la operación matemática que se realizará entre los dos números ingresados al presionarse '='.
    reemplazar: false         // Estado con el que se determinará si el número mostrado debe ser remplazado o no, por el nuevo número que se esta intrduciendo.
}

// El Reducer contempla el ingreso de un primer número, un operador matemático, un segundo número, y finalmente el
// boton '=' para realizar la operación entre los dos números. Tambien contempla el cambio de signo del número, y reiniciar todos los valores.
export default function Reducer(state = initialState, action) {
    switch (action.type) {
        case NUEVO_NUMERO:                  // Si se presionó un botón con un número, o el boton con el punto...
            if (state.operador === 'SIN-DEFINIR') {                // ...y si es el primero de los dos números a ingresar...

                if ( action.payload === "." && state.numA.toString().includes('.')) { // Evito que el punto se agregue más de una vez en el primer número.
                    return {
                        ...state,
                    }
                }

                if (state.numA === 0 || state.reemplazar === true) {          // ...y si el valor actual del primer número es 0, o es el resultado de una operación...
                    if (action.payload === ".") {               // ...si el boton presionado es el punto decimal...
                        return {
                            ...state,
                            numA: state.numA = "0.",          // ...remplazo el "0" actual por "0."
                            reemplazar: state.reemplazar = false
                        };
                    } else {                                 // ...si el boton presionado es un número...
                        return {
                            ...state,
                            numA: state.numA = Number(action.payload),   // ...remplazo el 0 actual por el número ingresado, convirtiendolo al tipo númerico pues me llega como tipo string.
                            reemplazar: state.reemplazar = false
                        };
                    }
                } else {          // Si el valor actual del primer número es distinto a 0...
                    return {
                        ...state,
                        numA: state.numA + action.payload             // ...concateno el nuevo número ingresado con el que estaba almacenado.
                    };
                }
            } else {                // Si se esta ingresando el segundo número...

                if ( action.payload === "." && state.numB.toString().includes('.')) {   // Evito que el punto se agregue más de una vez en el segundo número.
                    return {
                        ...state,
                    }
                }

                if (state.numB === 0) {         // ...y si el valor actual del segundo número es 0.
                    if (action.payload === ".") {             // ...si el boton presionado es el punto decimal..
                        return {
                            ...state,
                            numB: state.numB = "0.",         // ...remplazo el "0" actual por "0."
                            reemplazar: state.reemplazar = false
                        };
                    } else {                            // ...si el boton presionado es un número...
                        return {
                            ...state,
                            numB: state.numB = Number(action.payload)    // ...remplazo el 0 actual por el número ingresado, convirtiendolo al tipo númerico pues me llega como tipo string.
                        };

                    }
                } else {              // Si el valor actual del segundo número es distinto a 0.
                    return {
                        ...state,
                        numB: state.numB + action.payload         // Concateno el nuevo número ingresado con el que estaba almacenado.
                    };
                }
            }

        case OPERADOR:             // Si se presionó sobre un operador matemático...
            return {
                ...state,
                operador: state.operador = action.payload           // Lo almaceno en mi estado.
            }
        case CAMBIAR_SIGNO:      // Si se presionó el boton para cambiar el signo...
            switch (state.operador) {        // ...me fijo si debo cambiarle el signo al primero o al segundo número.
                case 'SIN-DEFINIR':         // Si aun NO se definio una operación a realizar...
                    return {
                        ...state,
                        numA: -state.numA        // ...entonces le tengo que cambiar el signo al primer número.
                    };
                default:              // Si ya se definió una operación a realizar...
                    return {
                        ...state,
                        numB: -state.numB           // ...entonces le tengo que cambiar el signo al segundo número.
                    };
            }

        case REINICIAR:          // Si se presionó el boton 'C' (Clear) reinicio todos los valores...
            return {
                ...state,
                numA: state.numA = 0,
                numB: state.numB = 0,
                operador: state.operador = 'SIN-DEFINIR'
            };

        case RESULTADO:     // Si se presionó el boton '='...
            switch (state.operador) {     // ...relizo la operación matemática correspondiente y almaceno el resultado en el primer número para que se pueda seguir haciendo más cálculos, y reinicio los otros estados.
                case '+':
                    return {
                        ...state,
                        numA: Number(state.numA) + Number(state.numB),
                        operador: state.operador = 'SIN-DEFINIR',
                        numB: state.numB = 0,
                        reemplazar: state.reemplazar = true
                    }

                case '-':
                    return {
                        ...state,
                        numA: Number(state.numA) - Number(state.numB),
                        operador: state.operador = 'SIN-DEFINIR',
                        numB: state.numB = 0,
                        reemplazar: state.reemplazar = true
                    }

                case '*':
                    return {
                        ...state,
                        numA: Number(state.numA) * Number(state.numB),
                        operador: state.operador = 'SIN-DEFINIR',
                        numB: state.numB = 0,
                        reemplazar: state.reemplazar = true
                    }

                case '/':
                    if (state.numB !== 0) {
                        return {
                            ...state,
                            numA: Number(state.numA) / Number(state.numB),
                            operador: state.operador = 'SIN-DEFINIR',
                            numB: state.numB = 0,
                            reemplazar: state.reemplazar = true
                        }
                    } else {
                        alert('No se puede dividir por cero.')
                        return {
                            ...state,
                            numA: 0,
                            operador: state.operador = 'SIN-DEFINIR',
                            numB: state.numB = 0,
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
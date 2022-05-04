import { NUEVO_NUMERO, OPERADOR, CAMBIAR_SIGNO, REINICIAR, RESULTADO } from './Actions.js';


const initialState = {  // Creo un estado inicial.
	numA: "0",       // Estado que almacenará el primero número a ingresar.
	numB: "0",       // Estado que almacenará el segundo número a ingresar.
  operador: 'SIN-DEFINIR',    // Estado que almacenará la operación matemática que se realizará entre los dos números ingresados al presionarse '='.
  reemplazar: false          // ¿ Debo reemplazar el número mostrado por el nuevo número que se esta ingresando?
}
	


// El Reducer contempla el ingreso de un primer número, un operador matemático, un segundo número, y el boton '=' para generar el resultado. También contempla el cambio de signo del número, y reiniciar todos los valores.
export default function Reducer(state = initialState, action) {
	switch (action.type) {
		case NUEVO_NUMERO:      // Si se presionó un botón con un número, o el boton con el punto...
        
			const screenNumber = document.getElementById("screenNumber").innerText;

			if ((action.payload === "." && screenNumber.includes('.')) ||   // Evito que se introduzca más de un punto...
				(action.payload === "." && state.reemplazar === true) ||     // ... que se pueda introducir un punto tras obtener un resultado.
				screenNumber.length >= 11  ||                               // ... que el numero ingresado sea mayor que la pantalla.
				(screenNumber === "0" && action.payload === "0") ){        // ... que se concatenen ceros como primer valor.
					return { ...state }
			}

			// Si tengo que reemplazar el "0"
			if ((screenNumber === "0" && action.payload !== ".") || 
					state.reemplazar === true) {  
						return state.operador === 'SIN-DEFINIR' ? {
							...state,
							numA: action.payload,
							reemplazar: false  
						} : {
							...state,
							numB: action.payload,
							reemplazar: false  
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
				numA: (-Number(state.numA)).toString()       // ...entonces le tengo que cambiar el signo al segundo número.
			} : {
				...state,
				numB: (-Number(state.numB)).toString()       // ...entonces le tengo que cambiar el signo al segundo número.
			}
		case REINICIAR:            // Si se presionó el boton 'C' (Clear) reinicio todos los valores...
			return resolveNewState(state, "0", false )
		case RESULTADO:          // Si se presionó el boton '=' realizo la operación matemática correspondiente y almaceno el resultado en el primer número para que se pueda seguir haciendo más cálculos, y reinicio los otros estados.
			switch (state.operador) {     
				case '+':
					return resolveNewState(state, (Number(state.numA) + Number(state.numB)).toString(), true )
				case '-':
					return resolveNewState(state, (Number(state.numA) - Number(state.numB).toString()), true )
				case '*':
					return resolveNewState(state, (Number(state.numA) * Number(state.numB).toString()), true )
				case '/':
					if (state.numB !== "0") {
						return resolveNewState(state, (Number(state.numA) / Number(state.numB).toString()), true )
					} else {
						alert('Division by zero is impossible.')
						return resolveNewState(state, "0" )
					}
				default:
					return state;     // Siempre se debe devolver el estado para los casos en los que el Reducer no pueda procesar la Action recibida.
			}
		default:
			return state;      // Siempre se debe devolver el estado para los casos en los que el Reducer no pueda procesar la Action recibida.
	}
}


function resolveNewState (state, numA_value, reemplazarValue) {
	// Si el resultado de la operación es más extenso que el tamaño de la pantalla, lo reduzco.
	if (numA_value.toString().length > 11) {
		numA_value = Number(numA_value.toString().slice(0,11))
	}

    return {
            ...state,
            numA: numA_value,
            numB: "0",
            operador: 'SIN-DEFINIR',
            reemplazar: reemplazarValue
        }
}
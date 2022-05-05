import { NEW_NUMBER, OPERATOR, CHANGE_SIGN, RESET, RESULT } from "./Actions.js";


const initialState = {  // Estado inicial.
  numA: "0",       // Primer número a ingresar.
  numB: "0",       // Primer número a ingresar.
  operator: "",    // Operador matemático que se usará con los dos números ingresados al presionarse "=".
  replace: false          // ¿ Debo reemplazar el número mostrado por el nuevo número que se esta ingresando?
}

export default function Reducer(state = initialState, action) {
	switch (action.type) {
		case NEW_NUMBER:      // Si se presionó un botón con un número, o el boton con el punto...

			const numberShown = document.getElementById("screen").innerText;  // Capturo el número mostrado actualmente en la pantalla.

			if ((action.payload === "." && numberShown.includes(".")) ||   // Evito que se introduzca más de un punto...
				(action.payload === "." && state.replace === true) ||     // ... que se pueda introducir un punto tras obtener un resultado.
				numberShown.length >= 11  ||                               // ... que el numero ingresado sea mayor que la pantalla.
				(numberShown === "0" && action.payload === "0") ){        // ... que se concatenen ceros como primer valor.
					return { ...state }
			}

			// Si tengo que reemplazar el "0" por un número ingresado, lo remplazo en el primer número a ingresar o en el segundo, segun corresponda.
			if ((numberShown === "0" && action.payload !== ".") || 
				state.replace === true) {  
					return state.operator === "" ? {
						...state,
						numA: action.payload,
						replace: false  
					} : {
						...state,
						numB: action.payload,
						replace: false  
					}       
			}

			// Si tengo que concatenar lo ingesado con lo que ya se mostraba en la pantalla, lo concateno con el primer número a ingresar o en el segundo, segun corresponda.
			return state.operator === "" ? {
				...state,
				numA: state.numA + action.payload 
			} : {
				...state,
				numB: state.numB + action.payload 
			}

		case OPERATOR:             // Si se presionó sobre un operador matemático...
			if (state.operator !== "") return state   // Si ya se eligió un operador, no permito que se elija otro.
			return {
				...state,
				operator: action.payload       
			}
		case CHANGE_SIGN:      // Si se presionó el boton para cambiar el signo...
			return state.operator === "" ? {
				...state,
				numA: (-Number(state.numA)).toString()       // ...le cambio el signo al primer número.
			} : {
				...state,
				numB: (-Number(state.numB)).toString()       // ...le cambio el signo al segundo número.
			}

		case RESET:            // Si se presionó el boton "C" (Clear) reinicio todos los valores...
			return getNewState(state, "0", false )
			
		case RESULT:          // Si se presionó el boton "=" realizo la operación matemática correspondiente y almaceno el resultado en el primer número para que se pueda seguir haciendo más cálculos, y reinicio los otros estados.
			switch (state.operator) {     
				case "+":
					return getNewState(state, (Number(state.numA) + Number(state.numB)).toString(), true )

				case "-":
					return getNewState(state, (Number(state.numA) - Number(state.numB).toString()), true )

				case "*":
					return getNewState(state, (Number(state.numA) * Number(state.numB).toString()), true )

				case "/":
					if (state.numB !== "0") {
						return getNewState(state, (Number(state.numA) / Number(state.numB).toString()), true )
					} else {
						alert("Division by zero is impossible.")
						return getNewState(state, "0", false )
					}

				default:
					return state;     
			}

		default:
			return state;      // Siempre se debe devolver el estado para los casos en los que el Reducer no pueda procesar la Action recibida.
	}
}


// Calculo segun los parámetros recividos, cual es el nuevo estado que debe devolver el Reducer.
function getNewState (state, numA_value, replace_value) {
	if (numA_value.toString().length > 11) {     // Si el resultado de la operación es más extenso que el tamaño de la pantalla, lo reduzco.
		numA_value = Number(numA_value.toString().slice(0,11))
	}
    return {
            ...state,
            numA: numA_value.toString(),
            numB: "0",
            operator: "",
            replace: replace_value
        }
}
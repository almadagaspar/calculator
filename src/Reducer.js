import { NEW_NUMBER, OPERATOR, CHANGE_SIGN, RESET, RESULT } from "./Actions.js";


const initialState = {  // Estado inicial.
  numA: "0",       // Primer número a ingresar.
  numB: "0",       // Primer número a ingresar.
  operator: "",    // Operador matemático que se usará con los dos números ingresados al presionarse "=".
  replace: false          // ¿ Debo reemplazar el número mostrado por el nuevo número que se esta ingresando?
}

export const screenCapacity = 11; // Longitud normal de la pantalla de la calculadora para mostrar números ingresados.
const screenExtraCapacity = screenCapacity + 4; // Longitud extra de la pantalla de la calculadora, solo para mostrar resultados muy grandes.


export default function Reducer(state = initialState, action) {
	switch (action.type) {
		case NEW_NUMBER:      // Si se presionó un botón con un número, o el boton con el punto...

			const numberShown = document.getElementById("screen").innerText;  // Capturo el número mostrado actualmente en la pantalla.

			if ((action.payload === "." && numberShown.includes(".")) ||   // Evito que se introduzca más de un punto.
				(action.payload === "." && state.replace === true) ||      // Evito que se pueda introducir un punto tras obtener un resultado.
				(numberShown.length >= screenExtraCapacity && state.replace === false) ||      // Evito que el numero ingresado sea mayor que la pantalla.
				(numberShown === "0" && action.payload === "0") ){         // Evito que se concatenen ceros como primer valor.
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
	// No muestro resultados que incluyen "e", y resultados enteros cuya logitud es mayor a la capacidad extra de la pantalla.
	if (numA_value.toString().includes("e") || 
	   (!numA_value.toString().includes(".") && numA_value.toString().length > screenExtraCapacity)	) {
			alert ("The result is too long to show. Operation cancelled.")
			numA_value = "0"
	}
	// Si el resultado de la operación es decimal y es más extenso que el tamaño de la pantalla, lo reduzco.
	if (numA_value.toString().includes(".") && numA_value.toString().length > screenExtraCapacity) {
		numA_value = Number(numA_value.toString().slice(0, screenExtraCapacity))
	}
    return {
		...state,
		numA: numA_value.toString(),
		numB: "0",
		operator: "",
		replace: replace_value
	}
}


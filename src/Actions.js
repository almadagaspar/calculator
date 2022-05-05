// Constantes que describen las acciones tanto en su nombre como en su valor, y que serán usadas en el 'type' de cada Action. Las exporto para poder usarlos también en el Reducer. Su uso evita errores de tipeo al usar autocompletado.
export const NEW_NUMBER = "NEW_NUMBER";
export const OPERATOR = "OPERATOR";
export const CHANGE_SIGN = "CHANGE_SIGN";
export const RESET = "RESET";
export const RESULT = "RESULT";


// Estas Action Creators se invocarán...
export const newNum = (newNum) => {  // ...cada vez que se presione un número
    return {
      type: NEW_NUMBER,
      payload: newNum
    };
};

export const operator = (operator) => {  // ...cuando se haga click en un operador matemático
    return {
      type: OPERATOR,
      payload: operator
    };
};

export const changeSign = () => {  // ...cada vez que se haga click en el boton para cambiar el signo del número ingresado
  return {
    type: CHANGE_SIGN
  };
};

export const reset = () => {  // ...cada vez que se presione el boton 'C' (Clear)
  return {
    type: RESET
  };
};

export const result = () => {  // ...cada vez que se presione el boton '='
    return {
      type: RESULT
    };
};


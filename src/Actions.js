// Creo constantes que describen las acciones tanto en su nombre como en su valor, y que serán usadas en el 'type' de cada Action.
// Las exporto para poder usarlos también en el Reducer. Al estar almacenadas en constantes, evito errores de tipeo cuando use el autocompletado.
export const NUEVO_NUMERO = 'NUEVO_NUMERO';
export const OPERADOR = 'OPERADOR';
export const CAMBIAR_SIGNO = 'CAMBIAR_SIGNO';
export const RESULTADO = 'RESULTADO';
export const REINICIAR = 'REINICIAR'


// Los siguientes Action Creators se invocarán...
export const nuevoNumero = (nuevoNum) => {  // ...cada vez que se presione un número.
    return {
      type: NUEVO_NUMERO,
      payload: nuevoNum
    };
};

export const operador = (tipoOperador) => {  // ...cuando se haga click en un operador matemático.
    return {
      type: OPERADOR,
      payload: tipoOperador
    };
};

export const cambiarSigno = () => {  // ...cada vez que se haga click en el boton para cambiar el signo del número ingresado.
  return {
    type: CAMBIAR_SIGNO
  };
};

export const reiniciar = () => {  // ...cada vez que se presione el boton 'C' (Clear).
  return {
    type: REINICIAR
  };
};

export const resultado = () => {  // ...cada vez que se presione el boton '='.
    return {
      type: RESULTADO
    };
};
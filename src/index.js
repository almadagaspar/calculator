import React from 'react';     
import ReactDOM from 'react-dom';    
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App';  
import Reducer from './Reducer.js';

// Creo el Store para almacenar los estados globales de mi aplicación...
const store = createStore( Reducer,             /* ...y lo conecto con mi Reducer pasandoselo por parámetro.  */
                           window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );     /* Con esta linea puedo usar la extención Redux DevTool con mi aplicación */
                                                                                                               
// Uso 'ReactDOM.render' con el componente principal de la apliacación
// para renderizarlo a él y a sus componentes hijos en la pagina usando React.
ReactDOM.render(
  <Provider store={store}>      {/* Con el componente Provider envolviendo el componente principal para poder usar React y Redux juntos en mi aplicación  */}
    <App />
  </Provider>,
  document.getElementById('root')
);



import React from "react";     
import ReactDOM from "react-dom";    
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from "./Reducer.js";
import App from "./App";  

// Creo el Store para almacenar los estados globales de mi aplicación, y lo conecto con mi Reducer pasandoselo por parámetro. 
// Con el segundo parámetro permito que la extención Redux DevTool pueda leer los estados de  mi aplicación.
const store = createStore( Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );
                                                                                                               
ReactDOM.render(
  <Provider store={store}>      {/* Con el componente Provider envolviendo el componente principal pongo los estados globales de Redux al alcance de toda la aplicación.  */}
    <App />
  </Provider>,
  document.getElementById("root")
);



import React from 'react';
import './App.css';
import Buttons from './Buttons.js';
import Screen from './Screen.js';



export default function App() { 
  return (
    <div className="App">

      <h2>Calculadora React+Redux</h2>

      <div id="calculator">
        <div id="screen">
          <Screen />      {/* Componente que muestra el numero ingresado, o el resultado obtenido de una operación */}
        </div>
        <Buttons />     {/* Contenedor del componente Button */}
      </div>

      <p>
        <a href="https://react-redux.js.org/" className="App-link" >Sitio oficial de React-Redux</a>
      </p>

    </div>
  );
}


import React from 'react';
import './App.css';
import Buttons from './Buttons.js';
import Screen from './Screen.js';



export default function App() { 
  return (
    <div className="App">
      <br/>
      <h2>Calculadora React+Redux</h2>
      <Screen />      {/* Componente que muestra el numero ingresado, o el resultado obtenido de una operación */}
      <Buttons />     {/* Contenedor del componente Button */}
      <br/>
      <br/>
      <br/>
      <p>
        <a href="https://react-redux.js.org/" className="App-link" >Sitio oficial de React-Redux</a>
      </p>
      <br/>
    </div>
  );
}


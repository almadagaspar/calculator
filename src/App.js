import React from 'react';
import './App.css';
import Buttons from './Buttons.js';
import Screen from './Screen.js';



export default function App() { 
  return (
    <div>
      <header>
        <h1>Calculator</h1>
        <h2>React + Redux</h2>
      </header>

      <div className="calculator">
        <div className="display">
          <Screen />      {/* Componente que muestra el numero ingresado, o el resultado obtenido de una operación */}
        </div>
        
        <div>      
          <Buttons />     {/* Contenedor del componente Button */}
        </div>
      </div>

    </div>
  );
}


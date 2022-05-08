import React from "react";
import Buttons from "./Buttons.js";
import Screen from "./Screen.js";
import "./App.css";



export default function App() { 
  return (
    <div>
      <header>
        <h2>CALCULATOR</h2>
        <h2>React Redux</h2>
      </header>

      <div className="calculator">
        <div>
          <Screen />      {/* Componente que muestra el numero ingresado, o el resultado obtenido de una operación */}
        </div>
        
        <div>      
          <Buttons />     {/* Contenedor del componente Button */}
        </div>
      </div>

    </div>
  );
}


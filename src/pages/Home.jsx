import { useState } from "react";
import reactLogo from "../assets/images/react.svg";
import "../assets/styles/css/App.css";

import { Link } from "react-router-dom";

import "../assets/styles/css/main.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a href="https://redux-saga.js.org" target="_blank">
          <img src="https://redux-saga.js.org/img/Redux-Saga-Logo.png" className="logo" alt="logo" />
        </a>
      </div>
      <h1>Vite + React + Redux Saga</h1>
      <div className="row">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <Link to="/about">
          <button>About</button>
        </Link>
        <Link to="/student">
          <button>Student</button>
        </Link>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;

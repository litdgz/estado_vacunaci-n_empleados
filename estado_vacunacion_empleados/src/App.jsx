import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import NuevoEmpleado from "./pages/NuevoEmpleado";
import FormularioEmpleado from "./pages/FormularioEmpleado";
import ListaEmpleados from "./pages/ListaEmpleados";

function App() {
  const [userSession, setUserSession] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });

  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link className="link" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>

          <li>
            <Link className="link" to="/nuevo-empleado">
              Nuevo Empleado
            </Link>
          </li>

          <li>
            <Link className="link" to="/lista-empleados">
              Lista Empleados
            </Link>
          </li>

          <li>
            <Link className="link" to={`/formulario-empleado`}>
              Formulario Empleado
            </Link>
          </li>

          <li>
            <Link
              className="link"
              onClick={() => {
                localStorage.removeItem("user");
              }}
              to="/login"
            >
              Cerrar sesion
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/nuevo-empleado" element={<NuevoEmpleado />}></Route>
        <Route path="/nuevo-empleado/:id" element={<NuevoEmpleado />}></Route>
        <Route
          path="/formulario-empleado/"
          element={<FormularioEmpleado />}
        ></Route>
        <Route
          path="/formulario-empleado/:id"
          element={<FormularioEmpleado />}
        ></Route>
        <Route path="/lista-empleados" element={<ListaEmpleados />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

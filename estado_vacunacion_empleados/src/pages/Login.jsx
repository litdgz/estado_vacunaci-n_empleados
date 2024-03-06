import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userSession, setUserSession] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  const [user, setUser] = useState({
    usuario: "",
    contrasena: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    //agregamos los cambios a nuestro estado empleado
    setUser({
      ...user,
      [name]: value,
    });
  };
  console.log("userSession: ", userSession);

  return (
    <div className="container">
      <h1>Login</h1>
      <div>
        <form
          className="form-container"
          onSubmit={(event) => {
            event.preventDefault();
            fetch(
              `http://localhost:3000/empleados?usuario=${user.usuario}&contrasena=${user.contrasena}`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log("data: ", data);
                if (data.length > 0) {
                  localStorage.setItem("user", JSON.stringify(data));
                  navigate(`/`);
                }
              })
              .catch((error) => console.error(error));
          }}
        >
          <label htmlFor="usuario">Usuario</label>
          <input
            onChange={handleChange}
            type="text"
            name="usuario"
            id="usuario"
          />
          <label htmlFor="contrasena">Contraseña</label>
          <input
            onChange={handleChange}
            type="text"
            name="contrasena"
            id="contrasena"
          />
          <button type="submit">Entregar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

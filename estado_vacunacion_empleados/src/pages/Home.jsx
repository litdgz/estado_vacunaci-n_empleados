import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userSession, setUserSession] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  const navigate = useNavigate();
  console.log("userSessionhome:", userSession);
  if (userSession === null) {
    navigate("/login");
  }
  if (userSession !== null && userSession[0]?.role === "administrador") {
    return (
      <div className="container">
        <h1>Home</h1>
        <p>
          Hola, administrador, dirígete al link de nuevo empleado para agregar
          un nuevo empleado o, si deseas editar o eliminar un empleado, dirígete
          al link de lista de empleados
        </p>
      </div>
    );
  }

  if (userSession !== null && userSession[0]?.role !== "administrador") {
    return (
      <div className="container">
        <h1>Home</h1>
        <p>
          Hola, empleado, por favor, dirígete al link de formulario para llenar
          tus datos o editarlos si ya los has llenado antes
        </p>
      </div>
    );
  }
}

export default Home;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function FormularioEmpleado() {
  const [userSession, setUserSession] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  const navigate = useNavigate();

  if (userSession === null) {
    navigate("/login");
  }
  if (userSession !== null && userSession[0].role !== "empleado") {
    navigate("/");
  }
  const { id } = useParams();
  console.log("id: ", id);
  const [empleado, setEmpleado] = useState({
    id: "",
    cedula: "",
    nombres: "",
    apellidos: "",
    email: "",
    usuario: "",
    contrasena: "",
    role: "empleado",
    fecha_nacimiento: "",
    direccion_domicilio: "",
    telefono_movil: "",
    estado_vacunacion: "no vacunado",
  });

  const [vacuna, setVacuna] = useState({
    id: "",
    empleadoId: "",
    tipo_vacuna: "Sputnik",
    fecha_vacunacion: "",
    numero_de_dosis: "",
  });

  useEffect(() => {
    if (userSession !== null) {
      fetch(`http://localhost:3000/empleados/${userSession[0].id}`)
        .then((response) => response.json())
        .then((data) => {
          setEmpleado({ ...empleado, ...data });
          return data;
        })
        .then((data) => {
          return fetch(`http://localhost:3000/vacunas?empleadoId=${data.id}`);
        })
        .then((response) => response.json())
        .then((data) => {
          setVacuna({ ...vacuna, ...data[0] });
        })
        .catch((error) => console.error(error));
    } else {
      setEmpleado({
        id: "",
        cedula: "",
        nombres: "",
        apellidos: "",
        email: "",
        usuario: "",
        contrasena: "",
        role: "empleado",
        fecha_nacimiento: "",
        direccion_domicilio: "",
        telefono_movil: "",
        estado_vacunacion: "no vacunado",
      });
      setVacuna({
        id: "",
        empleadoId: "",
        tipo_vacuna: "Sputnik",
        fecha_vacunacion: "",
        numero_de_dosis: "",
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    //agregamos los cambios a nuestro estado empleado
    setEmpleado({
      ...empleado,
      [name]: value,
    });
  };

  const handleChangeVacuna = (e) => {
    const { name, value } = e.target;

    //agregamos los cambios a nuestro estado vacuna
    setVacuna({
      ...vacuna,
      [name]: value,
    });
  };

  function formularioVacuna() {
    return (
      <>
        <label htmlFor="tipo_vacuna">Tipo de Vacuna</label>
        <select
          onChange={handleChangeVacuna}
          name="tipo_vacuna"
          id="tipo_vacuna"
          value={vacuna?.tipo_vacuna}
        >
          <option value="Sputnik">Sputnik</option>
          <option value="AstraZeneca">AstraZeneca</option>
          <option value="Pfizer">Pfizer</option>
          <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
        </select>
        <label htmlFor="fecha_vacunacion">Fecha de vacunación</label>
        <input
          onChange={handleChangeVacuna}
          type="date"
          name="fecha_vacunacion"
          id="fecha_vacunacion"
          value={vacuna.fecha_vacunacion}
        />
        <label htmlFor="numero_de_dosis">Número de dosis</label>
        <input
          onChange={handleChangeVacuna}
          type="number"
          name="numero_de_dosis"
          id="numero_de_dosis"
          value={vacuna.numero_de_dosis}
        />
      </>
    );
  }

  return (
    <div className="container">
      <h1>Tus Datos</h1>
      <div>
        <form
          className="form-container"
          onSubmit={(event) => {
            event.preventDefault();
            const options = {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(empleado),
            };
            fetch(`http://localhost:3000/empleados/${empleado.id}`, options)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                navigate("/");
              })
              .catch((error) => console.error(error));
            if (empleado.estado_vacunacion === "vacunado" && vacuna.id === "") {
              const optionsVacuna = {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...vacuna, empleadoId: empleado.id }),
              };

              fetch(`http://localhost:3000/vacunas`, optionsVacuna)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
            } else if (
              empleado.estado_vacunacion === "vacunado" &&
              vacuna.id !== ""
            ) {
              const optionsVacuna = {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...vacuna, empleadoId: empleado.id }),
              };

              fetch(`http://localhost:3000/vacunas/${vacuna.id}`, optionsVacuna)
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
            }
          }}
        >
          <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
          <input
            onChange={handleChange}
            type="date"
            name="fecha_nacimiento"
            id="fecha_nacimiento"
            value={empleado?.fecha_nacimiento}
          />
          <label htmlFor="direccion_domicilio">Dirección de domicilio</label>
          <input
            onChange={handleChange}
            type="text"
            name="direccion_domicilio"
            id="direccion_domicilio"
            value={empleado?.direccion_domicilio}
          />
          <label htmlFor="telefono_movil">Teléfono móvil</label>
          <input
            onChange={handleChange}
            type="number"
            name="telefono_movil"
            id="telefono_movil"
            value={empleado?.telefono_movil}
          />
          <label htmlFor="estado_vacunacion">Estado de vacunación</label>
          <select
            onChange={handleChange}
            name="estado_vacunacion"
            id="estado_vacunacion"
            value={empleado?.estado_vacunacion}
          >
            <option value="no vacunado">No Vacunado</option>
            <option value="vacunado">Vacunado</option>
          </select>
          {empleado.estado_vacunacion === "vacunado" && formularioVacuna()}
          <button type="submit">Entregar</button>
        </form>
      </div>
    </div>
  );
}

export default FormularioEmpleado;

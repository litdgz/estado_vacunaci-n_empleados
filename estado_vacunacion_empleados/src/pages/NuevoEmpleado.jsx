import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function NuevoEmpleado() {
  const [userSession, setUserSession] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  const navigate = useNavigate();

  if (userSession === null) {
    navigate("/login");
  }
  if (userSession !== null && userSession[0].role !== "administrador") {
    navigate("/");
  }

  const { id } = useParams();

  const [empleado, setEmpleado] = useState({
    id: " ",
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
    estado_vacunacion: "",
  });

  const [validations, setValidations] = useState({
    cedula: false,
    nombres: false,
    apellidos: false,
    email: false,
  });

  useEffect(() => {
    if (id !== undefined) {
      fetch(`http://localhost:3000/empleados/${id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("data: ", data);
          setEmpleado({ ...empleado, ...data });
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
        estado_vacunacion: "",
      });
    }
  }, [id]);

  function errorMessage(inputName) {
    if (inputName === "cedula") {
      return (
        <p className="error-message">
          El numero de cedula debe contener 10 digitos
        </p>
      );
    }
    if (inputName === "nombres") {
      return (
        <p className="error-message">
          El campo nombres no debe contener caracteres especiales solo letras
        </p>
      );
    }
    if (inputName === "apellidos") {
      return (
        <p className="error-message">
          El campo apellidos no debe contener caracteres especiales solo letras
        </p>
      );
    }
    if (inputName === "email") {
      return (
        <p className="error-message">
          Debe ingresar un correo electronico valido
        </p>
      );
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    //hacemos validacion de 10 dígitos para cedula
    if (name === "cedula" && Math.ceil(Math.log10(value)) !== 10) {
      setValidations({ ...validations, cedula: true });
    } else if (name === "cedula" && Math.ceil(Math.log10(value)) === 10) {
      setValidations({ ...validations, cedula: false });
    }

    //hacemos validacion de solo letras para nombres
    if (name === "nombres" && !e.target.checkValidity()) {
      setValidations({ ...validations, nombres: true });
    } else if (name === "nombres" && e.target.checkValidity()) {
      setValidations({ ...validations, nombres: false });
    }

    //hacemos validacion de solo letras para apellidos
    if (name === "apellidos" && !e.target.checkValidity()) {
      setValidations({ ...validations, apellidos: true });
    } else if (name === "apellidos" && e.target.checkValidity()) {
      setValidations({ ...validations, apellidos: false });
    }

    //hacemos validacion de email para correo electronico
    if (name === "email" && !e.target.checkValidity()) {
      setValidations({ ...validations, email: true });
    } else if (name === "email" && e.target.checkValidity()) {
      setValidations({ ...validations, email: false });
    }

    //agregamos los cambios a nuestro estado empleado
    setEmpleado({
      ...empleado,
      [name]: value,
    });
  };

  function onFormSubmit(event) {
    event.preventDefault();
    if (empleado?.id === "") {
      const indexEspacio = empleado.apellidos.indexOf(" ");
      const usuario = `${empleado.nombres.charAt(0)}${empleado.apellidos.slice(
        0,
        indexEspacio
      )}${Math.floor(Math.random() * 634)}`.toLowerCase();
      const contrasena = `1234567890`;

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...empleado, contrasena, usuario }),
      };
      fetch("http://localhost:3000/empleados", options)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    } else {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empleado),
      };
      fetch(`http://localhost:3000/empleados/${empleado.id}`, options)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }
  return (
    <div className="container">
      <h1>Formulario empleado</h1>
      <div>
        <form className="form-container" onSubmit={(e) => onFormSubmit(e)}>
          <label htmlFor="cedula">Cédula</label>
          <input
            type="number"
            required
            name="cedula"
            id="cedula"
            onChange={handleChange}
            value={empleado?.cedula}
          />
          {validations.cedula && errorMessage("cedula")}

          <label htmlFor="nombres">Nombres</label>
          <input
            type="text"
            required
            name="nombres"
            id="nombres"
            onChange={handleChange}
            pattern="^[A-Za-z\s]+$"
            value={empleado?.nombres}
          />
          {validations.nombres && errorMessage("nombres")}

          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            required
            name="apellidos"
            id="apellidos"
            onChange={handleChange}
            pattern="^[A-Za-z\s]+$"
            value={empleado?.apellidos}
          />
          {validations.apellidos && errorMessage("apellidos")}

          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            value={empleado?.email}
            onChange={handleChange}
          />
          {validations.email && errorMessage("email")}

          <button type="submit">Entregar</button>
        </form>
      </div>
    </div>
  );
}

export default NuevoEmpleado;

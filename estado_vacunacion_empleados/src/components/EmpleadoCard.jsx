import React from "react";
import { useNavigate } from "react-router-dom";

function EmpleadoCard(props) {
  const {
    id,
    cedula,
    nombres,
    apellidos,
    email,
    role,
    fecha_nacimiento,
    direccion_domicilio,
    telefono_movil,
    estado_vacunacion,
    vacunas,
  } = props.empleado;

  const navigate = useNavigate();
  function handleClick() {
    navigate(`/nuevo-empleado/${id}`);
  }
  function handleDeleteClick() {
    const optionsDelete = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:3000/empleados/${id}`, optionsDelete)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.onEmpleadoDelete(id);
      })
      .catch((error) => console.error(error));
  }

  function infoVacuna() {
    if (vacunas?.length > 0) {
      const { tipo_vacuna, fecha_vacunacion, numero_de_dosis } = vacunas[0];

      return (
        <>
          <div className="text_container">
            <p className="txt_titulo">Tipo de vacuna</p>
            <p className="txt_info">{tipo_vacuna}</p>
          </div>
          <div className="text_container">
            <p className="txt_titulo">Fecha de vacunación</p>
            <p className="txt_info">{fecha_vacunacion}</p>
          </div>
          <div className="text_container">
            <p className="txt_titulo">Número de dosis</p>
            <p className="txt_info">{numero_de_dosis}</p>
          </div>
        </>
      );
    }
  }
  return (
    <div className="empleado_card">
      <p className="nombre_apellido_txt">{nombres}</p>
      <p className="nombre_apellido_txt">{apellidos}</p>
      <div className="text_container">
        <p className="txt_titulo">Cédula</p>
        <p className="txt_info">{cedula}</p>
      </div>
      <div className="text_container">
        <p className="txt_titulo">Correo electrónico</p>
        <p className="txt_info">{email}</p>
      </div>
      <div className="text_container">
        <p className="txt_titulo">Role</p>
        <p className="txt_info">{role}</p>
      </div>
      <div className="text_container">
        <p className="txt_titulo">Fecha de nacimiento</p>
        <p className="txt_info">{fecha_nacimiento}</p>
      </div>
      <div className="text_container">
        <p className="txt_titulo">Dirección de domicilio</p>
        <p className="txt_info">{direccion_domicilio}</p>
      </div>
      <div className="text_container">
        <p className="txt_titulo">Teléfono móvil</p>
        <p className="txt_info">{telefono_movil}</p>
      </div>
      <div className="text_container">
        <p className="txt_titulo">Estado de vacunación</p>
        <p className="txt_info">{estado_vacunacion}</p>
      </div>
      {infoVacuna()}
      <button onClick={handleClick}>editar</button>
      <button onClick={handleDeleteClick}>eliminar</button>
    </div>
  );
}

export default EmpleadoCard;

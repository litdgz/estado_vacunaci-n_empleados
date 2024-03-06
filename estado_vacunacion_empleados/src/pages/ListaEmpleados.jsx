import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import EmpleadoCard from "../components/EmpleadoCard";

function ListaEmpleados() {
  const [userSession, setUserSession] = useState(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  const navigate = useNavigate();

  if (userSession === null) {
    navigate("/login");
  }
  if (userSession !== null && userSession[0]?.role !== "administrador") {
    navigate("/");
  }

  const [empleados, setEmpleados] = useState([]);

  const [idVacunados, setIdVacunados] = useState([]);
  console.log("empleados: ", empleados);

  useEffect(() => {
    fetch("http://localhost:3000/empleados?_embed=vacunas")
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        setEmpleados(data);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    setEmpleados([]);
    if (idVacunados.length > 0) {
      idVacunados.forEach((idVacunado) =>
        fetch(`http://localhost:3000/empleados/${idVacunado}?_embed=vacunas`)
          .then((response) => response.json())
          .then((data) => {
            console.log("datafiltrado: ", data);
            setEmpleados((prev) => [...prev, data]);
          })
          .catch((error) => console.error(error))
      );
    }
  }, [idVacunados]);

  function filtrarPorEstadoVacunacion(estado) {
    fetch(`http://localhost:3000/empleados?estado_vacunacion=${estado}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        setEmpleados(data);
      })
      .catch((error) => console.error(error));
  }
  function filtarPorTipoVacuna(tipoVacuna) {
    setIdVacunados([]);
    fetch(`http://localhost:3000/vacunas?tipo_vacuna=${tipoVacuna}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        data.forEach((vacuna) => {
          setIdVacunados((prev) => [...prev, vacuna.id]);
        });
      })
      .catch((error) => console.error(error));
  }

  function filtarPorFechaVacuna(orden) {
    setIdVacunados([]);
    fetch(
      `http://localhost:3000/vacunas?_sort=fecha_vacunacion&_order=${orden}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        data.forEach((vacuna) => {
          setIdVacunados((prev) => [...prev, vacuna.id]);
        });
      })
      .catch((error) => console.error(error));
  }

  console.log("idVacunados: ", idVacunados);

  function handleEmpleadoDelete(id) {
    const empleados2 = empleados.filter((empleado) => empleado.id !== id);
    setEmpleados(empleados2);
    console.log("Deleting empleado " + id);
  }

  return (
    <div className="container">
      <h1>Lista Empleados</h1>
      <div className="filtros_container">
        <div className="seccion_filtros">
          <button
            className="btn_filtro"
            onClick={() => filtrarPorEstadoVacunacion("vacunado")}
          >
            Empleados vacunados
          </button>
          <button
            className="btn_filtro"
            onClick={() => filtrarPorEstadoVacunacion("no vacunado")}
          >
            Empleados no vacunados
          </button>
          <button
            className="btn_filtro"
            onClick={() => filtarPorTipoVacuna("Jhonson%26Jhonson")}
          >
            Tipo de vacuna Jhonson&Jhonson
          </button>
          <button
            className="btn_filtro"
            onClick={() => filtarPorTipoVacuna("Pfizer")}
          >
            Tipo de vacuna Pfizer
          </button>
        </div>
        <div className="seccion_filtros">
          <button
            className="btn_filtro"
            onClick={() => filtarPorTipoVacuna("AstraZeneca")}
          >
            Tipo de vacuna AstraZeneca
          </button>
          <button
            className="btn_filtro"
            onClick={() => filtarPorTipoVacuna("Sputnik")}
          >
            Tipo de vacuna Sputnik
          </button>
          <button
            className="btn_filtro"
            onClick={() => filtarPorFechaVacuna("asc")}
          >
            Por fecha ascendente
          </button>
          <button
            className="btn_filtro"
            onClick={() => filtarPorFechaVacuna("desc")}
          >
            Por fecha descendente
          </button>
        </div>
      </div>
      {empleados.length > 0 &&
        empleados.map((empleado) => (
          <EmpleadoCard
            empleado={empleado}
            onEmpleadoDelete={handleEmpleadoDelete}
            key={empleado.id}
          />
        ))}
    </div>
  );
}

export default ListaEmpleados;

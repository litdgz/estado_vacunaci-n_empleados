import { useEffect, useState, useRef } from "react";
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

  const [filtroFecha, setFiltroFecha] = useState({
    fecha_de: "",
    fecha_hasta: "",
    empleadosFiltrados: [],
  });

  const inputFechaDe = useRef();
  const inputFechaHasta = useRef();

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

  useEffect(() => {
    getFiltroFecha();
  }, [filtroFecha.fecha_hasta, filtroFecha.fecha_de]);

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

  function getFiltroFecha() {
    console.log("empleados filtro fecha", empleados);
    if (
      empleados.length > 0 &&
      filtroFecha.fecha_de !== "" &&
      filtroFecha.fecha_hasta !== ""
    ) {
      let empleadosFiltrados = [...empleados];
      console.log("corrio filtro fecha");

      empleadosFiltrados = empleadosFiltrados?.filter((empleado) => {
        const fecha = new Date(empleado.vacunas[0].fecha_vacunacion);

        return (
          fecha.getTime() >= new Date(filtroFecha.fecha_de).getTime() &&
          fecha.getTime() <= new Date(filtroFecha.fecha_hasta).getTime()
        );
      });

      setFiltroFecha({ ...filtroFecha, empleadosFiltrados });
    }
  }

  function hanfleOnChangeFecha(e) {
    const { name, value } = e.target;

    //agregamos los cambios a nuestro estado empleado
    setFiltroFecha({
      ...filtroFecha,
      [name]: value,
    });
  }

  function resetFecha() {
    setFiltroFecha({
      fecha_de: "",
      fecha_hasta: "",
      empleadosFiltrados: [],
    });
    inputFechaDe.current.value = "";
    inputFechaHasta.current.value = "";
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
        <div>
          <label htmlFor="fecha_de">De</label>
          <input
            type="date"
            name="fecha_de"
            id="fecha_de"
            ref={inputFechaDe}
            onChange={hanfleOnChangeFecha}
          />
        </div>
        <div>
          <label htmlFor="fecha_hasta">Hasta</label>
          <input
            type="date"
            name="fecha_hasta"
            id="fecha_hasta"
            ref={inputFechaHasta}
            onChange={hanfleOnChangeFecha}
          />
          <button onClick={() => resetFecha()}>resetear fecha</button>
        </div>
      </div>
      {empleados.length > 0 &&
        filtroFecha.empleadosFiltrados.length === 0 &&
        empleados.map((empleado) => (
          <EmpleadoCard
            empleado={empleado}
            onEmpleadoDelete={handleEmpleadoDelete}
            key={empleado.id}
          />
        ))}
      {empleados.length > 0 &&
        filtroFecha.empleadosFiltrados.length > 0 &&
        filtroFecha.empleadosFiltrados.map((empleado) => (
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

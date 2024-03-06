# estado_vacunacion_empleados
DESCRIPCIÓN

Reporte del Proyecto: Sistema de Gestión de Empleados
Descripción del Proyecto
El objetivo de este proyecto es una aplicación de Sistema de Gestión de Empleados que permita a los administradores y empleados interactuar con la información de los empleados de manera eficiente. La aplicación contará con dos roles principales: Administrador y Empleado.

Historias de Usuario
1. Administrador: Registro y Gestión de Empleados
El administrador debe poder realizar las siguientes acciones relacionadas con los empleados:

Criterios de Aceptación:

*Registrar Empleado:

El administrador debe poder ingresar la siguiente información del empleado:

1. Cédula.

2. Nombres.

3. Apellidos.

4. Correo electrónico.

Validaciones de campos:

1. Todos los campos son requeridos.

2. La cédula debe ser un valor numérico único de 10 dígitos.

3. El correo electrónico debe ser válido.

4. Los nombres y apellidos no deben contener números ni caracteres especiales.

5. Al dar de alta un empleado, se debe generar un usuario y contraseña para el mismo.

Editar Empleado:

1. El administrador puede actualizar la información de un empleado existente.

Listar Empleados:

  El administrador debe poder ver una lista de todos los empleados registrados.

Eliminar Empleado:

  El administrador puede eliminar a un empleado de la base de datos.

2. Empleado: Visualización y Actualización de Información

Los empleados deben poder acceder al sistema para ver y actualizar su propia información personal.

* Criterios de Aceptación:

Completar Información Personal:

  El empleado debe poder ingresar la siguiente información:

  1. Fecha de nacimiento.

  2. Dirección de domicilio.

  3. Teléfono móvil.

  4. Estado de vacunación (Vacunado / No Vacunado).

Si el empleado está vacunado, se deben solicitar los siguientes detalles:

  1. Tipo de vacuna (Sputnik, AstraZeneca, Pfizer o Jhonson&Jhonson).

  2. Fecha de vacunación.

  3.Número de dosis.

3. Administrador: Filtrado de Empleados
   
El administrador necesita filtrar la lista de empleados según ciertos criterios.

Criterios de Aceptación:

Filtrar por Estado de Vacunación:

El administrador puede ver una lista de empleados vacunados o no vacunados.

Filtrar por Tipo de Vacuna:

El administrador puede filtrar empleados según el tipo de vacuna recibida.

Filtrar por Rango de Fecha de Vacunación:

El administrador puede seleccionar un rango de fechas para filtrar empleados según su fecha de vacunación.

Conclusiones

Este sistema proporcionará una plataforma eficiente para gestionar la información de los empleados, garantizando la seguridad y la integridad de los datos. Se espera que cumpla con los requisitos establecidos en las historias de usuario y brinde una experiencia fluida tanto para los administradores como para los empleados.

PROCESO DE CONTRUCCION:
el proyecto lo realice con vite y react 
para el backend y db use json-server

1. comenzamos analizando que datos necesitamos para la base de datos, los normalizamos y por ulitimo los creamos en el archivo db.json
2. provamos los endopoints con postman
3. creamos el estilo grafico de la pagina web con figma
4. comenzamos creando las rutas y paginas de cada elemento del proyecto
5. creamos los componentes y la arquitectura de cada pagina
6. le damos los estilos a cada componente con css
7. conectamos el proyecto a la base de datos por medio de los endpoints y llamamos a la informacion que necesitamos donde la necesitamos 
8. probamos las endpoints de POST y PATCH para verificar que los datos se estan agregando a la base de datos
9. terminamos de probar por cualquier bug que se nos presente
10. probamos la aplicaccion una ultima vez para verificar que todo este funcionando como se debe y subimos nuestra aplicacion a git
extra: 
1. en cada paso que vamos avanzando vamos agregando a git para no perder nuestro progreso


INSTRUCCIONES:

entrar a la carpeta estado_vacunacion_empleados y usar el comando "npm install" en la terminal

el proyecto utiliza json-server para el backend de nuestra aplicacion asi q debemos usar el comando "json-server --watch db.json"

y por ultimo usamos el comando "npm run dev" para iniciar nuestro proyecto entramos al localhost que nos indica y estamos listos

dentro del archivo db.json ya tenemos 1 usuario administrador sus credenciales son:
usuario: cdominguez593
contrasena: 1234567890

seguimos las instrucciones en Home para agregar nuestro primer empleado

al agregar el empleado a la base de datos tambien le creamos el usuario y contrasena del nuevo empleado esta es la primera letra del primer nombre y el primer apellido seguido por un numero al asar
y la contrasena es "1234567890"
para encontrar el usuario y contrasena del nuevo empleado podemos entrar al archivo db.json y ver le usuario y contrasena

si iniciamos sesion como empleado (cualquier empleado que creemos) tendremos acceso unicamente al link de formulario empleado donde podremos llenar nuestros datos personales

si iniciamos sesion como administrador tendremos acceso a los links de nuevo empleado donde podremos crear nuevos empleados y a lista de empleados donde podremos visualizar los empledados creados

por ultimo podemos cerrar sesion para entrar nuevamente como empleado o administrador

//Variables
const carrito  = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

//Event listeners
function cargarEventListeners(){
   //Se ejecuta cuando presionamos el botón "agregar al carrito"
   cursos.addEventListener("click", comprarCursos);

   //Se ejecuta cuando presionamos el botón "x" para eliminar un curso
   carrito.addEventListener("click", eliminarCursos);

   //Se ejecuta cuando presionamos el botón "Vaciar carrito"
   vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

   //Mostrar Local Storage en el DOM
   document.addEventListener("DOMContentLoaded", leerLocalStorage);
}
cargarEventListeners();

//Funciones

//Añade el curso al carrito
function comprarCursos(e){
   e.preventDefault();
   //Delegation para botón "agregar al carrito"
   if(e.target.classList.contains("agregar-carrito")){
      const curso = e.target.parentElement.parentElement;
      leerDatosCurso(curso);
   }
}
//Lee los datos del curso 
function leerDatosCurso(curso){
   const infoCurso = {
      imagen: curso.querySelector("img").src,
      titulo: curso.querySelector("h4").textContent,
      precio: curso.querySelector(".precio span").textContent,
      id:     curso.querySelector("a").getAttribute("data-id")
   };
   insertarCarrito(infoCurso);
}

//Muestra en el carrito el curso seleccionado
function insertarCarrito(curso){
   const row = document.createElement("tr");
   row.innerHTML = `
      <td><img src = "${curso.imagen}" width = "100"</img></td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td><a href = "#" class = "borrar-curso" data-id = "${curso.id}">X</a></td>
   `;
   listaCursos.appendChild(row);
   guardarCursoLocalStorage(curso);
}

//Guarda los cursos en el Local Storage
function guardarCursoLocalStorage(curso){
   let cursos;
   cursos = obtenerCursosLocalStorage();     //Comprueba el local Storage
   cursos.push(curso);
   localStorage.setItem("cursos", JSON.stringify(cursos));
}

//Comprueba que haya elementos en el local storage
function obtenerCursosLocalStorage(){
   let cursosLocalStorage;
   if(localStorage.getItem("cursos") === null){
      cursosLocalStorage = [];
   }else{
      cursosLocalStorage = JSON.parse(localStorage.getItem("cursos"));
   }
   return cursosLocalStorage;
}

//Carga los cursos del Local Storage al DOM
function leerLocalStorage(){
   let cursosLocalStorage;
   cursosLocalStorage = obtenerCursosLocalStorage();
   cursosLocalStorage.forEach(function (curso){
      const row = document.createElement("tr");
      row.innerHTML = `
         <td><img src = "${curso.imagen}" width = "100"</img></td>
         <td>${curso.titulo}</td>
         <td>${curso.precio}</td>
         <td><a href = "#" class = "borrar-curso" data-id = "${curso.id}">X</a></td>
      `;
      listaCursos.appendChild(row);
   });
}

//Función para eliminar los cursos individualmente del DOM
function eliminarCursos(e){
   e.preventDefault();
   let curso;
   let cursoId;
   if(e.target.classList.contains("borrar-curso")){
      e.target.parentElement.parentElement.remove();  //Selecciona y remueve el <tr>
      curso = e.target.parentElement.parentElement;
      cursoId = curso.querySelector("a").getAttribute("data-id");
   }
   eliminarCursoLocalStorage((cursoId));
}

//Elimina el curso por el ID del Local Storage
function eliminarCursoLocalStorage(cursoId){
    let cursosLocalStorage = obtenerCursosLocalStorage();

    cursosLocalStorage.forEach(function (curso, index){
      if(curso.id === cursoId){      //Compara el índice del arreglo con el atributo "data-id"
         cursosLocalStorage.splice(index, 1);
      }
    });
    
    localStorage.setItem("cursos", JSON.stringify(cursosLocalStorage));
    return false;    //Asegura que la función "se corte" para evitar conflictos
}

//Función para eliminar todos los cursos del DOM
function vaciarCarrito(){
   while(listaCursos.firstChild){
      listaCursos.removeChild(listaCursos.firstChild);
   }

   //Vaciar Local Storage
   vaciarLocalStorage();
}

//Vacía todo el contenido del local storage
function vaciarLocalStorage(){
   localStorage.clear();
}
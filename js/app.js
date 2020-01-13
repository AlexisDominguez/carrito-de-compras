//Variables
const carrito  = document.getElementById("carrito");
const cursos = document.getElementById("lista-cursos");
const listaCursos = document.querySelector("#lista-carrito tbody");

//Event listeners
function cargarEventListeners(){
   //Se ejecuta cuando presionamos el botón "agregar al carrito"
   cursos.addEventListener("click", comprarCursos);
   //Se ejecuta cuando presionamos el botón "x" para eliminar un curso
   carrito.addEventListener("click", eliminarCursos);
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
}

function eliminarCursos(e){
   e.preventDefault();
   let curso;
   if(e.target.classList.contains("borrar-curso")){
      e.target.parentElement.parentElement.remove();  //Selecciona y remueve el <tr>
   }
}
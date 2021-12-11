/* =========================================
                Variables
========================================= */
const formulario  = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-tweets');

// Variable para guardar notas
let notas = [];


/* =========================================
              EventListeners
========================================= */
eventListeners();

function eventListeners() { 
    // Agregar nota al escuchar evento 'submit'
    formulario.addEventListener('submit' , agregarNota);
    // Agregar nota al precionar enter
    formulario.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            agregarNota(e);
        };
    });
};


/* =========================================
                Funciones
========================================= */
function agregarNota(e) {
    // Evitar que se recargue la pagina
    e.preventDefault();

    // Contenido del textarea donde el usuario escribe
    const nota = document.querySelector('#tweet').value;

    // Si el campo no está vacio
    if( nota !== '' ) {
        // Crear nueva nota
        const notaObj = {
            id: Date.now(),
            nota
        };
        
        // Añadir al arreglo de notas
        notas = [ ...notas, notaObj ];

        // Limpiar el textarea
        formulario.reset();
        
        // Mostrar arreglo de notas en el HTML
        crearHTML();
    } else {
        mostrarError('No puede agregar una nota vacia');
    };
};

function mostrarError( error ) {
    // Buscar mensajes de error en el HTML
    const errorHTML = document.querySelector('.error');

    // Si no existen
    if( !errorHTML ) {
        // Crear mensaje de error
        const mensajeError = document.createElement('p');
        mensajeError.textContent = error;
        mensajeError.classList.add('error');

        // Insertar en el Contenido
        const contenido = document.querySelector('#contenido');
        contenido.appendChild(mensajeError);

        // Elimina la alerta despues de 3 segundos
        setTimeout(() => {
            mensajeError.remove();
        }, 3000);
    };
};

function crearHTML() {
    // Eliminar el HTML previo
    limpiarHTML();

    // Si el arreglo contiene una nota o mas
    if( notas.length > 0 ) {
        // Iterar arreglo
        notas.forEach( nota => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-nota');
            btnEliminar.innerText = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarNota(nota.id);
            }

            // Crear el HTML
            const li = document.createElement('li');

            // Agregar el texto
            li.innerText = nota.nota;

            // Agregar el boton
            li.appendChild(btnEliminar);

            // Insertar en el html
            listaNotas.appendChild(li)
        });
    };
};

function limpiarHTML() {
    while( listaNotas.firstChild ) {
        listaNotas.removeChild(listaNotas.firstChild);
    }
}

function borrarNota( id ) {
    /* Filtrar todas las notas exceptuando la que 
    contiene el id que recibimos */
    notas = notas.filter( nota => nota.id !== id );

    // Volver a generar el HTML
    crearHTML();
}
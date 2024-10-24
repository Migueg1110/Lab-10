// Clase para representar una tarea
class Tarea {
    constructor(nombre, estado = 'pendiente') {
        this.nombre = nombre;
        this.estado = estado;
    }
}

// Lista para almacenar todas las tareas
let tareas = [];

// Función para agregar una nueva tarea
function agregarTarea() {
    const nombreTarea = document.getElementById('new-task').value.trim();
    if (nombreTarea === '') return;

    const nuevaTarea = new Tarea(nombreTarea);
    tareas.push(nuevaTarea);
    actualizarInterfaz();
    document.getElementById('new-task').value = ''; // Limpiar input
}

// Función para cambiar el estado de una tarea
function cambiarEstadoTarea(tarea, nuevoEstado) {
    tarea.estado = nuevoEstado;
    actualizarInterfaz();
}

// Función para actualizar la interfaz de usuario
function actualizarInterfaz() {
    // Limpiar las listas de tareas
    document.getElementById('pending-tasks').innerHTML = '';
    document.getElementById('in-progress-tasks').innerHTML = '';
    document.getElementById('completed-tasks').innerHTML = '';

    // Iterar sobre todas las tareas y agregarlas a la columna correspondiente
    tareas.forEach(tarea => {
        const tareaElement = document.createElement('li');
        tareaElement.classList.add('task');
        tareaElement.textContent = tarea.nombre;

        // Crear botones de mover dependiendo del estado de la tarea
        const botonMover = document.createElement('button');
        botonMover.classList.add('move');

        if (tarea.estado === 'pendiente') {
            botonMover.textContent = '→ Haciendo';
            botonMover.onclick = () => cambiarEstadoTarea(tarea, 'haciendo');
            document.getElementById('pending-tasks').appendChild(tareaElement);
        } else if (tarea.estado === 'haciendo') {
            const botonMoverACompletado = document.createElement('button');
            botonMoverACompletado.classList.add('move');
            botonMoverACompletado.textContent = '→ Completada';
            botonMoverACompletado.onclick = () => cambiarEstadoTarea(tarea, 'completada');
            const botonMoverAPendiente = document.createElement('button');
            botonMoverAPendiente.classList.add('move');
            botonMoverAPendiente.textContent = '← Pendiente';
            botonMoverAPendiente.onclick = () => cambiarEstadoTarea(tarea, 'pendiente');

            tareaElement.appendChild(botonMoverAPendiente);
            tareaElement.appendChild(botonMoverACompletado);
            document.getElementById('in-progress-tasks').appendChild(tareaElement);
        } else if (tarea.estado === 'completada') {
            document.getElementById('completed-tasks').appendChild(tareaElement);
        }

        if (tarea.estado === 'pendiente' || tarea.estado === 'haciendo') {
            tareaElement.appendChild(botonMover);
        }
    });
}

// Event listener para agregar una tarea
document.getElementById('add-task').addEventListener('click', agregarTarea);

// Permitir agregar tareas con la tecla Enter
document.getElementById('new-task').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        agregarTarea();
    }
});

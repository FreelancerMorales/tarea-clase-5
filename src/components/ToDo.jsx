import React, { useState } from 'react';
import { Error } from './error';

export const ToDo = () => {
  const [tareas, setTareas] = useState([]);
  const [newTarea, setNewTarea] = useState('');
  const [mostrarError, setMostrarError] = useState(false);

  const agregarTarea = (e) => {
    e.preventDefault();
    if (newTarea.trim() === '') {
      setMostrarError(true);
      return;
    }
    const tarea = { id: Date.now(), text: newTarea, completed: false };
    setTareas([...tareas, tarea]);
    setNewTarea('');
  };

  const alternarCompletado = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea
    ));
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
  };

  const cerrarError = () => {
    setMostrarError(false);
  };

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>

      {mostrarError && <Error message="La tarea no puede estar vacía" onClose={cerrarError} />}

      <form onSubmit={agregarTarea}>
        <input
          type="text"
          value={newTarea}
          onChange={(e) => setNewTarea(e.target.value)}
          placeholder="Añadir nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tareas.map(tarea => (
          <li key={tarea.id}>
            <input
              type="checkbox"
              checked={tarea.completed}
              onChange={() => alternarCompletado(tarea.id)}
            />
            <span style={{ textDecoration: tarea.completed ? 'line-through' : 'none' }}>
              {tarea.text}
            </span>
            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
/*import logo from './logo.svg';
import './App.css';*/

import React, { useState} from 'react';
import { isEmpty } from 'loadsh';
import shortid from 'shortid';


function App() {
  // hub  seria el estado de los componentes tener datos para almacenar y modificar 
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  const addTask =(e) => { 
    e.preventDefault()
    if (isEmpty(task)){
      console.log("Task empty")
      return
    }
    
    const newTask = {
      id: shortid.generate(),
      name : task // se modificó para mejorar codigo
      // =>  task    /*: task*/ //javascrit si despues de los dos puntos (el objeto que se asigna tiene el mismo nombre, solo se coloca el nombre sin asignar.)
    }

    setTasks([...tasks, newTask])  // spread operator
    setTask("")
  }

  return (
    
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/*Edit <code>src/App.js</code> and save to reload. Hellow Work React
        </p>
        <a className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
      
    <div className="container mt-5" >
      <h1> Tareas! </h1>
      <hr/>
      <div className='row'>
        <div className='col-8'>
          <h4 className='text-center'>Lista de Tareas</h4>
          <ul className='list-group'>
            {
              tasks.map((task) => (
                <li className='list-group-item' key={task.id}>
                  <span className='lead'>{task.name}</span>
                  <button className='btn btn-danger btn-sm float-right mx-2'> Eliminar </button>
                  <button className='btn btn-warning btn-sm float-right'> Editar </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='col-4'>
          <h4 className='text-center'>Formulario</h4>
          <form onSubmit={addTask}>
             <input 
              type='text' 
              className='form-control mb-2'
              placeholder="Ingrese la tarea" 
              onChange={(text) => setTask(text.target.value)}
              value={task} 
              />
              <button className='btn btn-dark btn-block' 
              type='submit'> Agregar </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default App;

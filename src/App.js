/*import logo from './logo.svg';
import './App.css';*/

import React, { useState, useEffect} from 'react'; 
  // hub useState => de estado  seria el estado de los componentes tener datos para almacenar y modificar 
  // hub useEffect => servir cuando la pag cargue
import { isEmpty, size} from 'loadsh';
import shortid from 'shortid';
import { addDocument, deleteDocument, getCollection, updateDocument } from './actions';


function App() {
  
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode] = useState(false)
  const [id, setId] = useState("")
  const [error, setError] = useState(null)

  useEffect(()=> { //similiar a un ready
    (async () => {
      const result = await getCollection("tasks")
      //console.log(result)
      if (result.statusResponse){
        setTasks(result.data)
      }
      // sino mostrar el error luego ojo
    })()
  }, [])

  const validForm =() => { 
    let isValid = true
    setError(null)
    if (isEmpty(task)){
      setError("Debes ingresar una tarea.")
      isValid = false
    }

    return isValid
  }

  const addTask = async (e) => {  //pasa a hacer async porque se espera que guarde en la base de datos
    e.preventDefault()
    
    if (!validForm()){
      return
    }

    const result = await addDocument("tasks", { name: task }) 
    if (!result.statusResponse){
      setError(result.error)
      return 
    }//agrega en base de datos y si no muestra el error

    const newTask = {
      id: shortid.generate(),
      name : task // se modificó para mejorar codigo
      // =>  task    /*: task*/ //javascrit si despues de los dos puntos (el objeto que se asigna tiene el mismo nombre, solo se coloca el nombre sin asignar.)
    }// ya esto no se usa porque se cambio al guardarlo en la base de dato

    //setTasks([...tasks, newTask])  // spread operator   //se cambia ahora para agregar el que se agrego a la base de datos
    setTasks([...tasks, {id : result.data.id , name: task }])
    setTask("")
  }

  const saveTask = async(e) => { 
    e.preventDefault()
    if (!validForm()){
      return
    }

    const result = await updateDocument("tasks", id, { name: task }) 
    if(!result.statusResponse) {
      setError(result.error)
      return
    }
  
    const editedTasks = tasks.map(item => item.id === id ? { id, name : task } : item)
    setTasks(editedTasks) 
    setEditMode(false)
    setTask("")
    setId("")
  }

  const deleteTask = async(id) => { 

    const result = await deleteDocument("tasks", id) 
    if(!result.statusResponse) {
      setError(result.error)
      return
    }

    const filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }

  const editTask = (theTask) => { 
    setEditMode(true)
    setTask(theTask.name)
    setId(theTask.id)
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
          {
            size(tasks) === 0 ? (
              /*<h6 className='text-center'>Aun no hay tareas programadas.</h6> Se cambiar porque quedo feo*/
              <li className='list-group-item'>Aun no hay tareas programadas.</li>
            ) : (
            <ul className='list-group'>
              {
                tasks.map((task) => (
                  <li className='list-group-item' key={task.id}>
                    <span className='lead'>{task.name}</span>
                    <button
                      className='btn btn-danger btn-sm float-right mx-2'
                      onClick={() => deleteTask(task.id)}
                    > Eliminar 
                    </button>
                    <button 
                      className='btn btn-warning btn-sm float-right'
                      onClick={() => editTask(task)}
                    > Editar 
                    </button>
                  </li>
                ))
              }
            </ul>
            )
          }
        </div>
        <div className='col-4'>
          <h4 className='text-center'>
            { editMode ? "Modificar Tarea" : "Agregar Tarea" }
          </h4>
          <form onSubmit={ editMode ? saveTask : addTask}>
              {
                error && <span className='text-danger'>{error}</span>
              }
             <input 
              type='text' 
              className='form-control mb-2'
              placeholder="Ingrese la tarea" 
              onChange={(text) => setTask(text.target.value)}
              value={task} 
              />
              <button className={ editMode ? 'btn btn-warning btn-block':'btn btn-dark btn-block' }
              type='submit'> { editMode ? "Guardar": "Agregar" } </button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default App;

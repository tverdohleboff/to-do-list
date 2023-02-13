import './App.css';
import React, {useState, useEffect} from 'react';
import TasksList from './TasksList';
import CreateEditForm from './CreateEditForm';

function getFromLocalStorage(key){
  return JSON.parse(localStorage.getItem(key));
}

function syncWithLocalStorage(tasks){
  const serializedTasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', serializedTasks ); 
}

const tasksFromLocalStorage = getFromLocalStorage('tasks') || [];
let biggestTaskId = 0;
tasksFromLocalStorage.forEach(function(task){
  if(task.id > biggestTaskId){
    biggestTaskId = task.id;
  }
})

let taskId = biggestTaskId || 0;
function incrementTaskId(){
  taskId = taskId + 1;
  return taskId;
}

function App() {
  const [tasks, setTasks] = useState(tasksFromLocalStorage || []);
  const [searchText, setSearchText] = useState('');

  useEffect(function(){
    console.log(tasks);
    syncWithLocalStorage(tasks);
  }, [tasks]);

  function changeStatus(id) {
    const updatedTasks = [...tasks];
    const task = updatedTasks.find(function(task){
      return task.id === id;
    });
    task.isChecked = !task.isChecked;
    setTasks(updatedTasks);
  }

  function deleteTask(id){
    const updatedTasks = tasks.filter(function(task){
      return task.id !== id;
    });
    setTasks(updatedTasks);
  }

  const futureTasks = tasks.filter(function(task){
    if(searchText !== ''){
      return (task.isChecked === false && task.name.toLowerCase().includes(searchText.toLocaleLowerCase()))
    }
    return task.isChecked === false;
  })

  const completedTasks = tasks.filter(function(task){
    if(searchText !== ''){
      return (task.isChecked === true && task.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
    }
    return task.isChecked === true;
  })

  function handleSearchInputChange(event) {
    const value = event.target.value;
    setSearchText(value);
  }

  return (
    <div className='App'>
      <div className='lists'>
      <div className='search'>
        <label htmlFor='search-form'> Найти задачу: </label>
        <input 
        type='text'
        id='search-form'
        value={searchText}
        onChange={handleSearchInputChange}
        />
      </div>
        <div className='FutureTasks'>
          <h2>Будущие задачи: </h2>
          <TasksList
            tasks={futureTasks} 
            changeStatus={changeStatus}
            deleteTask={deleteTask}
          />
        </div>
        <div className='CompletedTasks'>
          <h2>Завершенные задачи: </h2>
          <TasksList
            tasks={completedTasks} 
            changeStatus={changeStatus}
            deleteTask={deleteTask}
          />
        </div>
      </div>
      <div className='form'>
        <CreateEditForm 
          tasks={tasks}
          createTask={setTasks}
          incrementTaskId={incrementTaskId}
        />
      </div>
    </div>
  );
}

export default App;

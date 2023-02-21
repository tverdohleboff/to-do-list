import './App.css';
import React, {useState, useEffect} from 'react';
import TasksList from './TasksList';
import CreateEditForm from './CreateEditForm';
import {getFromLocalStorage, syncWithLocalStorage} from './utils';

const tasksFromLocalStorage = getFromLocalStorage('tasks');
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
  const [editTaskId, setEditTaskId] = useState('');

  useEffect(function(){
    syncWithLocalStorage('tasks', tasks);
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

    if(editTaskId === id){
      setEditTaskId('');
      alert('Дело было удалено в процессе редактирования'); 
    }
  }

  const futureTasks = tasks.filter(function(task){
    if(searchText !== ''){
      return (task.isChecked === false 
        && task.name.toLowerCase().includes(searchText.toLocaleLowerCase()))
    }
    return task.isChecked === false;
  })

  const completedTasks = tasks.filter(function(task){
    if(searchText !== ''){
      return (task.isChecked === true 
        && task.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
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
            setEditTaskId={setEditTaskId}
          />
        </div>
        <div className='CompletedTasks'>
          <h2>Завершенные задачи: </h2>
          <TasksList
            tasks={completedTasks} 
            changeStatus={changeStatus}
            deleteTask={deleteTask}
            setEditTaskId={setEditTaskId}
          />
        </div>
      </div>
      <div className='form'>
        <CreateEditForm 
          tasks={tasks}
          setTasks={setTasks}
          incrementTaskId={incrementTaskId}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
        />
      </div>
    </div>
  );
}

export default App;

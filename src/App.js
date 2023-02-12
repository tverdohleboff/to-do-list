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

function App() {
  const [tasks, setTasks] = useState(getFromLocalStorage('tasks') || []);

  useEffect(function(){
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
    return task.isChecked === false;
  })

  const completedTasks = tasks.filter(function(task){
    return task.isChecked === true;
  })

  return (
    <div className='App'>
      <div className='lists'>
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
          createTask={setTasks}
          tasks={futureTasks}
        />
      </div>
    </div>
  );
}

export default App;

import './App.css';
import React, {useState, useEffect} from 'react';
import FutureTasks from './FutureTasks';
import CompletedTasks from './CompletedTasks';
import CreateEditForm from './CreateEditForm';

function getFromLocalStorage(key){
  return JSON.parse(localStorage.getItem(key));
}

function syncWithLocalStorage(futureTasks, completedTasks){

  const serializedFutureTasks = JSON.stringify(futureTasks);
  const serializedCompletedTasks = JSON.stringify(completedTasks);

  localStorage.setItem('futureTasks', serializedFutureTasks ); 
  localStorage.setItem('completedTasks', serializedCompletedTasks); 
}

function App() {
  const [futureTasks, setFutureTasks] = useState(getFromLocalStorage('futureTasks') || []);
  const [completedTasks, setCompletedTasks] = useState(getFromLocalStorage('completedTasks') || []);

  useEffect(function(){
    syncWithLocalStorage(futureTasks, completedTasks);
  }, [futureTasks, completedTasks]);

  function moveToCompletedTasks(id) {
    const updatedFutureTasks = futureTasks.filter(function(task){
      return task.id !== id;
    });
    const task = futureTasks.find(function(task){
      return task.id === id;
    });
    task.isChecked = true;
    const updatedCompletedTasks = [...completedTasks, task];
    setFutureTasks(updatedFutureTasks);
    setCompletedTasks(updatedCompletedTasks);
  }

  function moveToFutureTasks(id) {
    const updatedCompletedTasks = completedTasks.filter(function(task){
      return task.id !== id;
    });
    const task = completedTasks.find(function(task){
      return task.id === id;
    });
    task.isChecked = false;
    const updatedFutureTasks = [...futureTasks, task];
    setFutureTasks(updatedFutureTasks);
    setCompletedTasks(updatedCompletedTasks);
  }

  function deleteFromCompletedTask(id){
    const updatedCompletedTasks = completedTasks.filter(function(task){
      return task.id !== id;
    });
    setCompletedTasks(updatedCompletedTasks);
  }

  function deleteFromFutureTask(id){
    const updatedFutureTasks = futureTasks.filter(function(task){
      return task.id !== id;
    });
    setFutureTasks(updatedFutureTasks);
  }

  return (
    <div className='App'>
      <div className='lists'>
        <FutureTasks 
          tasks={futureTasks} 
          moveToCompletedTasks={moveToCompletedTasks}
          deleteTask={deleteFromFutureTask}
          />
        <CompletedTasks
          tasks={completedTasks}
          moveToFutureTasks={moveToFutureTasks} 
          deleteTask={deleteFromCompletedTask}
        />
      </div>
      <div className='form'>
        <CreateEditForm 
          createTask={setFutureTasks}
          tasks={futureTasks}
        />
      </div>
    </div>
  );
}

export default App;

import './App.css';
import React, {useState, useEffect} from 'react';
import SortButtons from './SortButtons';
import TasksList from './TasksList';
import CreateEditForm from './CreateEditForm';
import {
  getFromLocalStorage, 
  syncWithLocalStorage, 
  sortTasksByDate, 
  sortTasksByCategory, 
  sortTasksByPriority, 
  filterTasksByExpired,
  searchTasksByName
} from './utils';
import {
  BY_CATEGORY, 
  BY_DATE, 
  BY_EXPIRED, 
  BY_PRIORITY
} from './constants';

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
  const [editTaskId, setEditTaskId] = useState('');
  const [sortOrder, setSortOrder] = useState(BY_DATE);
  const [filter, setFilter] = useState(null);

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

  function handleSearchInputChange(event) {
    const value = event.target.value;
    setSearchText(value);
  }

  function sortAndFilterTasks(tasks){
    let updatedTasks = [
      ...tasks
    ]
    
    if(sortOrder === BY_DATE) {
      updatedTasks = sortTasksByDate(updatedTasks);
    } else if (sortOrder === BY_CATEGORY) {
      updatedTasks = sortTasksByCategory(updatedTasks);
    } else if (sortOrder === BY_PRIORITY) {
      updatedTasks = sortTasksByPriority(updatedTasks);
    }

    if(filter === BY_EXPIRED) {
      updatedTasks = filterTasksByExpired(updatedTasks);
    }

    if(searchText !== ''){
      updatedTasks = searchTasksByName(updatedTasks, searchText);
    }

    return updatedTasks;
  }

  let futureTasks = tasks.filter(function(task){
    return task.isChecked === false;
  })
  futureTasks = sortAndFilterTasks(futureTasks);

  let completedTasks = tasks.filter(function(task){
    return task.isChecked === true;
  })
  completedTasks = sortAndFilterTasks(completedTasks);

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
      <SortButtons 
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        filter={filter}
        setFilter={setFilter}
      />
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

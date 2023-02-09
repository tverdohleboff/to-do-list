import './App.css';
import React, {useState} from 'react';
import FutureTasks from './FutureTasks';
import CompletedTasks from './CompletedTasks';
import CreateEditForm from './CreateEditForm';

function App() {
  const [futureTasks, setFutureTasks] = useState([]);
  console.log(futureTasks);

  return (
    <div className='App'>
      <div className='lists'>
        <FutureTasks 
        updateTask={setFutureTasks}
        tasks={futureTasks} />
        <CompletedTasks />
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

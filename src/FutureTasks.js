import React from 'react';
import Task from './Task';

function FutureTasks(props) {
  const {
    update,
    tasks
  } = props;

  return (
    <div className='FutureTasks'>
      <h2>Будущие дела</h2>
      <div className='FutureTasksList'>
        {tasks.map(function(task) {
          return (
            <Task 
              name={task.name}
              date={task.date}
              key={task.name}
              status={task.status} 
            />
          );
        })}
      </div>
    </div>
  );
}

export default FutureTasks;
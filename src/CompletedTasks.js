import React from 'react';
import Task from './Task';

function CompletedTasks(props) {
  const {
    tasks,
    moveToFutureTasks
  } = props;

  return (
    <div className='CompletedTasks'>
      <h2>Выполненные дела</h2>
      <div className='CompletedTasksList'>
        {tasks.map(function(task) {
          return (
            <Task 
              name={task.name}
              id={task.id}
              date={task.date}
              key={task.id}
              isChecked={task.isChecked} 
              onCheckboxChange={moveToFutureTasks}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CompletedTasks;
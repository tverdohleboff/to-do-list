import React from 'react';
import Task from './Task';

function FutureTasks(props) {
  const {
    tasks,
    moveToCompletedTasks,
    deleteTask
  } = props;

  return (
    <div className='FutureTasks'>
      <h2>Будущие дела</h2>
      <div className='FutureTasksList'>
        {tasks.map(function(task) {
          return (
            <Task 
              name={task.name}
              id={task.id}
              date={task.date}
              key={task.id}
              isChecked={task.isChecked} 
              onChangeStatus={moveToCompletedTasks}
              onDelete={deleteTask}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FutureTasks;
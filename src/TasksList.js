import React from 'react';
import Task from './Task';

function TasksList(props) {
  const {
    tasks,
    changeStatus,
    deleteTask
  } = props;

  return (
    <div className='TasksList'>
      {tasks.map(function(task) {
        return (
          <Task 
            name={task.name}
            id={task.id}
            date={task.date}
            key={task.id}
            isChecked={task.isChecked} 
            onChangeStatus={changeStatus}
            onDelete={deleteTask}
          />
        );
      })}
    </div>
  );
}

export default TasksList;
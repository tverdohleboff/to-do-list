import React from 'react';

function Task(props) {
  const {
    name,
    id,
    date,
    isChecked,
    onChangeStatus,
    onDelete
  } = props;

  function handleCheckboxChange(){
    onChangeStatus(id);
  } 

  function handleDeleteButton(){
    const deleteIsConfirmed = window.confirm("Удаляем?!");
    if(deleteIsConfirmed) {
      onDelete(id);
    }
  }

  const className = isChecked ? 'Task Task_Checked' : 'Task';


  return (
    <div className={className}>
      <input 
        type='checkbox' 
        onChange={handleCheckboxChange} 
        checked={isChecked}
      />
      <div className='Name'>{name}</div>
      <div className='Date'>{date}</div>
      <button 
        className='deleteTask' 
        type='button'
        onClick={handleDeleteButton}
      >
        Удалить задачу
      </button>
    </div>
  );
}

export default Task;
  
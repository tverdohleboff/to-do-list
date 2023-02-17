import React from 'react';

function Task(props) {
  const {
    name,
    id,
    date,
    isChecked,
    onChangeStatus,
    setEditTaskId,
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

  function handleEditButton(){
    setEditTaskId(id);
  }

  const className = isChecked ? 'Task Task_Checked' : 'Task';

  return (
    <div className={className}>
      <input 
        type='checkbox' 
        onChange={handleCheckboxChange} 
        checked={isChecked}
      />
      <div className='Date'>{new Date(date).toLocaleString('ru-RU', {
        dateStyle: 'short',
        timeStyle: 'short'
      })}</div>
      <div className='Name'>{name}</div>
      <button 
        className='editTask actionWithTask' 
        type='button'
        onClick={handleEditButton}
      >
        Редактировать
      </button>
      <button 
        className='deleteTask actionWithTask' 
        type='button'
        onClick={handleDeleteButton}
      >
        Удалить
      </button>
    </div>
  );
}

export default Task;
  
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
 
  const isExpired = new Date(date).getTime() < new Date().getTime();

  const className = isChecked ? 'Task Task_Checked' : 'Task';
  const dateClassName = isExpired ? 'Date redText' : 'Date';
  const nameClassName = isExpired ? 'Name redText' : 'Name';

  return (
    <div className={className}>
      <input 
        type='checkbox' 
        onChange={handleCheckboxChange} 
        checked={isChecked}
      />
      <div className={dateClassName}>{new Date(date).toLocaleString('ru-RU', {
        dateStyle: 'short',
        timeStyle: 'short'
      })}</div>
      <div className={nameClassName}>{name}</div>
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
  
import React from 'react';

function Task(props) {
  const {
    name,
    id,
    date,
    isChecked,
    onChangeStatus,
    category,
    priority,
    setEditTaskId,
    onDelete
  } = props;

  function handleCheckboxChange(){
    onChangeStatus(id);
  } 

  function handleDeleteButton(){
    const deleteIsConfirmed = window.confirm("Удаляем дело?!");
    if(deleteIsConfirmed) {
      onDelete(id);
    }
  }

  function handleEditButton(){
    setEditTaskId(id);
  }
 
  const isExpired = new Date(date).getTime() < new Date().getTime();

  let className = isChecked ? 'Task Task_Checked' : 'Task';
  if(priority === 'Высокий') {
    className = className + ' high';
  } else if(priority === 'Низкий') {
    className = className + ' low';
  }
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
      <div className='categoryClass'>{category}</div>
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
  
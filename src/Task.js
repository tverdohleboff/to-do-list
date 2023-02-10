import React from 'react';

function Task(props) {
  const {
    name,
    id,
    date,
    isChecked,
    onCheckboxChange
  } = props;

  function handleCheckboxChange(){
    onCheckboxChange(id);
  } 

  return (
    <div className='Task'>
      <input 
        type='checkbox' 
        onChange={handleCheckboxChange} 
        checked={isChecked}
      />
      <div className='Name'>{name}</div>
      <div className='Date'>{date}</div>
    </div>
  );
}

export default Task;
  
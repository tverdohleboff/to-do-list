import React from 'react';

function Task(props) {
  const {
    name,
    date
  } = props;

  return (
    <div className='Task'>
      <div className='Name'>{name}</div>
      <div className='Date'>{date}</div>
    </div>
  );
}

export default Task;
  
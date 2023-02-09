import React from 'react';
import CheckBoxSwitchStatus from './CheckBoxSwitchStatus';

function Task(props) {
  const {
    name,
    date,
    status
  } = props;

  return (
    <div className='Task'>
      <CheckBoxSwitchStatus />
      <div className='Name'>{name} + {status}</div>
      <div className='Date'>{date}</div>
    </div>
  );
}

export default Task;
  
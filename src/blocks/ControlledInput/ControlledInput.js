import React from 'react';
import './ControlledInput.css';

function ControlledInput(props) {
  const {
    id,
    type,
    value,
    onChange
  } = props;

  function handleInputChange(event){
    const value = event.target.value;
    onChange(value);
  }

  return (
    <input 
      className='ControlledInput'
      type={type} 
      id={id} 
      value={value} 
      onChange={handleInputChange} 
    />
  );
}

export default ControlledInput;
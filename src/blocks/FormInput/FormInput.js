import React from 'react';
import ControlledInput from '../ControlledInput/ControlledInput';
import './FormInput.css';

function FormInput(props) {
  const {
    technology,
    setTechnology,
    companyName,
    setCompanyName,
    authorName,
    setAuthorName,
    authorSecondName,
    setAuthorSecondName,
    date,
    setDate,
    managerName,
    setManagerName
  } = props;

  return (
    <div className='FormInput Form'>
      <div className='technology'>
        <div className='label'>Название технологии</div>
        <ControlledInput
          id='Technology' 
          type='text' 
          value={technology}
          onChange={setTechnology}
        />
      </div>
      <div className='company'>
        <div className='label'>Компания</div>
        <ControlledInput 
          id='CompanyName'
          type='text'
          value={companyName}
          onChange={setCompanyName}
        />
      </div>
      <div className='authorName'>
        <div className='label'>Имя автора</div>
        <ControlledInput 
          id='AuthorName' 
          type='text' 
          value={authorName}
          onChange={setAuthorName}
        />
      </div>
      <div className='authorSecondName'>
        <div className='label'>Фамилия</div>
        <ControlledInput 
          id='AuthorSecondName' 
          type='text' 
          value={authorSecondName}
          onChange={setAuthorSecondName}
        />
      </div>
      <div className='date'>
        <div className='label'>Дата регистрации</div>
        <ControlledInput 
          id='Date' 
          type='date' 
          value={date}
          onChange={setDate}
        />
      </div>
      <div className='managerName'>
        <div className='label'>Руководитель проекта</div>
        <ControlledInput 
          id='ManagerName' 
          type='text' 
          value={managerName}
          onChange={setManagerName}
        />
      </div>
    </div>
  );
}

export default FormInput;
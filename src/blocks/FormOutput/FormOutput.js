import React from 'react';
import './FormOutput.css';

function FormOutput(props) {
  const {
    technology,
    companyName,
    authorName,
    authorSecondName,
    date,
    managerName,
  } = props;

  return (
  <div className='FormOutput Form'>
    <h1>Патент</h1>
    <h2>На изобретение № 2312719</h2>
    <p>{technology}</p>
    <p>Патентообладатель: {companyName}</p>
    <p>Автор: {authorName} {authorSecondName}</p>
    <p>Приоритет изобретения: {date}</p>
    <p>Руководитель Федеральной службы по интеллектуальной собственности,
      патентам и товарным знакам: {managerName}
    </p>
    <p>Зарегистрировано в государственном реестре: {(new Date()).toDateString()}</p>
  </div>
  );
}

export default FormOutput;
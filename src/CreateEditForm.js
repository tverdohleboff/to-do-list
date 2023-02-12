import React, {useState} from 'react';

let taskId = 1;

function CreateEditForm(props) {
  const {
    createTask,
    tasks
  } = props;

  const currentDate = new Date();
  const [name, setName] = useState('');
  const [date, setDate] = useState(currentDate.toLocaleDateString('en-CA'));
  const [errorName, setErrorName] = useState(false);
  const [errorDate, setErrorDate] = useState(false);

  function handleNameChange(event) {
    const value = event.target.value;
    setName(value);
  }

  function handleDateChange(event) {
    const value = event.target.value;
    setDate(value);
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    if(name === '') {  
      setErrorName('Имя не может быть пустым');
    } else {
      setErrorName(false);
    }
    
    if(new Date(date + ' 23:59:59').getTime() < new Date().getTime() ) {
      setErrorDate('Дата задачи не может быть раньше, чем сегодня');
    } else {
      setErrorDate(false);
    }
    
    if(name !== '' &&  new Date(date + ' 23:59:59').getTime() >= new Date().getTime() ){
      const updatedTasks = [
        ...tasks,
        {
          id: taskId,
          name: name,
          date: date,
          isChecked: false
        }
      ];
      taskId += 1;
      createTask(updatedTasks);
      setName('');
      setDate(currentDate.toLocaleDateString('en-CA'));
    }
  }

  return (
    <div className='CreateEditForm'>
      <h2>Форма создания и редактирования дел</h2>
      <form 
        className='CreateEditForm__container'
        onSubmit={handleSubmitForm}
      >
        <div>
          <label htmlFor='name'>Что нужно сделать</label>
          <input 
            type='text' 
            name='name' 
            id='name' 
            value={name} 
            onChange={handleNameChange} 
          />
          {errorName !== false ? <div className='Error'>
            {errorName}</div> : null}
        </div>
        <div>
          <label htmlFor='date'>Когда нужно сделать</label>
          <input 
            type='date' 
            name='date' 
            id='date' 
            value={date}
            onChange={handleDateChange} 
          />
          {errorDate !== false ? <div className='Error'>
            {errorDate}</div> : null}
        </div>
        <div>
          <button type='submit'>Создать</button>
        </div>
      </form>
    </div>
  );
}

export default CreateEditForm;
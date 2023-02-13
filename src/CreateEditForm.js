import React, {useState} from 'react';

let taskId = 1;

function CreateEditForm(props) {
  const {
    tasks,
    createTask,
  } = props;

  const currentDate = new Date();
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
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

  function sortTasksByDate(tasks){
    const sortedTasks =  tasks.sort(function(a, b){
      if(new Date(a.date).getTime() > new Date(b.date).getTime()) {
        return 1;
      }
      if(new Date(a.date).getTime() < new Date(b.date).getTime()) {
        return -1;
      }
      return 0;
    })
    return sortedTasks;
  }

  function handleSubmitForm(event) {
    event.preventDefault();

    if(name === '') {  
      setErrorName('Имя не может быть пустым');
    } else {
      setErrorName(false);
    }

    if(date === '') {
      setErrorDate('Дата задачи не может быть пустой');
    } else {
      setErrorDate(false);
    }
    
    if(name !== '' &&  date !== ''){
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
      const sortedTasks = sortTasksByDate(updatedTasks);
      createTask(sortedTasks);
      setName('');
      setDate(currentDate.toLocaleDateString('en-CA'));
    }
  }

  return (
    <div className='CreateEditForm'>
      <h2>Форма создания и редактирования дел: </h2>
      <form 
        className='CreateEditForm__container'
        onSubmit={handleSubmitForm}
      >
        <div>
          <label htmlFor='name'>Что нужно сделать </label>
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
          <label htmlFor='date'>Когда нужно сделать </label>
          <input 
            type='datetime-local' 
            name='date' 
            id='date' 
            value={date}
            min="2020-01-01T00:30" 
            max="2040-12-31T23:30"
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
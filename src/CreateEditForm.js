import React, {useState} from 'react';

function CreateEditForm(props) {
  const {
    createTask,
    tasks
  } = props;

  const currentDate = new Date();
  const [name, setName] = useState('');
  const [date, setDate] = useState(currentDate.toLocaleDateString('en-CA'));
  const [status, setStatus] = useState(false);

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
    const updatedFutureTasks = [
      ...tasks,
      {
        name: name,
        date: date,
        status: status
      }
    ];
    createTask(updatedFutureTasks);
    setName('');
    setDate(currentDate.toLocaleDateString('en-CA'));
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
        </div>
        <div>
          <button type='submit'>Создать</button>
        </div>
      </form>
    </div>
  );
}

export default CreateEditForm;
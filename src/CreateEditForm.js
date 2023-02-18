import React, {useState, useEffect} from 'react';

function CreateEditForm(props) {
  const {
    tasks,
    setTasks,
    incrementTaskId,
    editTaskId,
    setEditTaskId
  } = props;

  const isEdit = editTaskId !== '';

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [errorName, setErrorName] = useState(false);
  const [errorDate, setErrorDate] = useState(false);

  useEffect(function(){
    let task;
    if(editTaskId !== ''){
      task = tasks.find(function(item){
        return item.id === editTaskId;
      })
      setName(task.name);
      setDate(task.date);
    } else {
      clearFields();
    }
  }, [editTaskId]);

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

  function validateFields(){
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

    return name !== '' &&  date !== '';
  }

  function clearFields(){
    setName('');
    setDate('');
  }

  function editTask(){
    const updatedTasks = [
      ...tasks
    ]
    const task = updatedTasks.find(function(item){
      return item.id === editTaskId;
    })
    task.name = name;
    task.date = date;
    const sortedTasks = sortTasksByDate(updatedTasks);
    setTasks(sortedTasks);
    clearFields();
    setEditTaskId('');
  }

  function createTask(){
    const updatedTasks = [
      ...tasks,
      {
        id: incrementTaskId(),
        name: name,
        date: date,
        isChecked: false
      }
    ];
    const sortedTasks = sortTasksByDate(updatedTasks);
    setTasks(sortedTasks);
    clearFields();
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    const validationSuccess = validateFields();
    if(validationSuccess) {
      if (isEdit) {
        editTask();
      } else {
        createTask();
      }
    }
  }  

  function switchToCreateForm(){
    setEditTaskId('');
  }

  const formTitle = isEdit ?
  'Форма редактирования дела: ' :
  'Форма создания дел: ';

  const buttonText = isEdit ?
  'Сохранить' :
  'Создать';

  return (
    <div className='CreateEditForm'>
      <h2>{formTitle}</h2>
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
          <button type='submit'>{buttonText}</button>
          {
            isEdit ?
              <button type='button' onClick={switchToCreateForm}>
                Переключиться в режим создания
              </button> :
              null
          }
        </div>
      </form>
    </div>
  );
}

export default CreateEditForm;
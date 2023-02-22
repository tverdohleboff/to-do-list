import React, {useState, useEffect} from 'react';
import {getFromLocalStorage, syncWithLocalStorage} from './utils';

const categoriesFromLocalStorage = getFromLocalStorage('categories');

function CreateEditForm(props) {
  const {
    tasks,
    setTasks,
    incrementTaskId,
    editTaskId,
    setEditTaskId
  } = props;

  const isEdit = editTaskId !== '';

  const defaultCategories = [
    'Работа',
    'Дом',
    'Спорт',
    'Творчество'
  ];

  const [category, setCategory] = useState(defaultCategories[0]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState(categoriesFromLocalStorage || defaultCategories);
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
      setCategory(task.category);
    } else {
      clearFields();
    }
  }, [editTaskId, tasks]);

  useEffect(function(){
    syncWithLocalStorage('categories', categories);
  }, [categories]);

  function handleNameChange(event) {
    const value = event.target.value;
    setName(value);
  }

  function handleDateChange(event) {
    const value = event.target.value;
    setDate(value);
  }

  function handleCategoryChange(event) {
    const value = event.target.value;

    setCategory(value);
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
    setCategory(defaultCategories[0]);
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
    task.category = category;
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
        category: category,
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

  function handleAddCategory(){
    const newCategory = prompt('Назовите категорию: ');
    if(newCategory){
      const updatedCategories = [
        ...categories,
        newCategory
      ];
      setCategories(updatedCategories)
    } else {
      alert('Нельзя создать пустую категорию');
    };
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
        <label htmlFor='category'>Категория </label>
          <select 
            id='category'
            value={category}
            onChange={handleCategoryChange}>   
            {
              categories.map(function(option) {
                return (
                  <option key={option}
                  value={option}>{option}</option>
                )
              })
            }
          </select>
          <button 
            className='margin-left-10' 
            type='button'
            onClick={handleAddCategory}
          >+</button>
        </div>
        <div>
          <label htmlFor='name'>Что нужно сделать </label>
          <input 
            type='text' 
            name='name' 
            id='name' 
            value={name} 
            onChange={handleNameChange} 
          />
          {errorName !== false ? <div className='redText'>
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
          {errorDate !== false ? <div className='redText'>
            {errorDate}</div> : null}
        </div>
        <div>
          <button type='submit'>{buttonText}</button>
          {
            isEdit ?
              <button className='margin-left-10' type='button' onClick={switchToCreateForm}>
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
import React, {useState, useEffect} from 'react';
import {getFromLocalStorage, syncWithLocalStorage} from './utils';

const categoriesFromLocalStorage = getFromLocalStorage('categories');

function CreateEditForm(props) {
  const {
    tasks,
    setTasks,
    incrementTaskId,
    editTaskId,
    setEditTaskId,
  } = props;

  const isEdit = editTaskId !== '';

  const defaultCategories = [
    'Работа',
    'Дом',
    'Спорт',
    'Творчество'
  ];

  const priorities = [
    'Обычный',
    'Высокий',
    'Низкий'
  ];

  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState(defaultCategories[0]);
  const [categories, setCategories] = useState(categoriesFromLocalStorage || defaultCategories);
  const [priority, setPriority] = useState(priorities[0]);
  const [errorName, setErrorName] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  
  const formTitle = isEdit ?
  'Форма редактирования дела: ' :
  'Форма создания дел: ';

  const buttonText = isEdit ?
  'Сохранить' :
  'Создать';

  useEffect(function(){
    let task;
    if(editTaskId !== ''){
      task = tasks.find(function(item){
        return item.id === editTaskId;
      })
      setName(task.name);
      setDate(task.date);
      if(categories.includes(task.category) === false) {
        const updatedCategories = [
          ...categories,
          task.category
        ];
        setCategories(updatedCategories);
      }
      setCategory(task.category);
      setPriority(task.priority);
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
    task.priority = priority;
    setTasks(updatedTasks);
    clearFields();
    setEditTaskId('');
    setPriority(priorities[0]);
  }

  function createTask(){
    const updatedTasks = [
      ...tasks,
      {
        id: incrementTaskId(),
        name: name,
        date: date,
        category: category,
        priority: priority,
        isChecked: false
      }
    ];
    setTasks(updatedTasks);
    clearFields();
    setPriority(priorities[0]);
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
      setCategories(updatedCategories);
    } else {
      alert('Нельзя создать пустую категорию');
    };
  }

  function handleDeleteCategory(){
    const deleteIsConfirmed = window.confirm("Удаляем категорию?!");
    if(deleteIsConfirmed) {
      const copyCategoryies = [
        ...categories
      ];
      const indexForDeleted = copyCategoryies.indexOf(category);
      if(indexForDeleted !== -1) {
        copyCategoryies.splice(indexForDeleted, 1);
        setCategories(copyCategoryies);
        setCategory(categories[0]);
      }
    } 
  }

  function handlePriorityChange(event){
    const value = event.target.value;
    setPriority(value);
  }

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
          <button 
            className='margin-left-10' 
            type='button'
            onClick={handleDeleteCategory}
          >-</button>
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
        <div className='priority'>
        <label htmlFor='priority'>Приоритет </label>
          <select 
            id='priority'
            value={priority}
            onChange={handlePriorityChange}>   
            {
              priorities.map(function(selection) {
                return (
                  <option key={selection}
                  value={selection}>{selection}</option>
                )
              })
            }
          </select>
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
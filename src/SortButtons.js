import React from 'react';
import {BY_DATE, BY_CATEGORY, BY_PRIORITY, BY_EXPIRED} from './constants';


function SortButtons(props) {
  const {
    sortOrder,
    setSortOrder,
    filter,
    setFilter
  } = props;

  let dateButtonClassName = '';
  let categoryButtonClassName = '';
  let priorityButtonClassName = '';
  let expiredButtonClassName = '';

  switch(sortOrder){
    default:
    case BY_DATE:
      dateButtonClassName = 'activeSortButton';
      break;
    case BY_CATEGORY:
      categoryButtonClassName = 'activeSortButton';
      break;
    case BY_PRIORITY:
      priorityButtonClassName = 'activeSortButton';
      break;
  }

  switch(filter){
    default:
      expiredButtonClassName = '';
      break;
    case BY_EXPIRED:
      expiredButtonClassName = 'activeFilterButton';
      break;
  }

  function sortByDate(){
    setSortOrder(BY_DATE);
  }

  function sortByCategory(){
    setSortOrder(BY_CATEGORY);
  }

  function sortByPriority(){
    setSortOrder(BY_PRIORITY);
  }

  function sortByExpired(){
    if(filter === BY_EXPIRED) {
      setFilter(null);
    } else {
      setFilter(BY_EXPIRED);
    }
  }

  return(
    <div className='sortButtons'>
      <button 
        type='button' 
        onClick={sortByDate}
        className={dateButtonClassName}
      >
        По дате
      </button>
      <button 
        type='button' 
        onClick={sortByCategory}
        className={categoryButtonClassName}
      >
        По категориям
      </button>
      <button 
        type='button' 
        onClick={sortByPriority}
        className={priorityButtonClassName}
      >
        По приоритету
      </button>
      <button 
        type='button' 
        onClick={sortByExpired}
        className={expiredButtonClassName}
      >
        Просроченные
      </button>
    </div>
  )
}
export default SortButtons;
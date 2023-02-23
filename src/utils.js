export function getFromLocalStorage(key){
  return JSON.parse(localStorage.getItem(key));
}

export function syncWithLocalStorage(key, value){
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue); 
}

export function sortTasksByDate(tasks){
  const sortedTasks = tasks.sort(function(a, b){
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

export function sortTasksByCategory(tasks){
  const sortedTasks = tasks.sort(function(a, b){
    if(a.category > b.category) {
      return 1;
    }
    if(a.category < b.category) {
      return -1;
    }
    return 0;
  })
  return sortedTasks;
}

export function sortTasksByPriority(tasks){
  const highPriorityTasks = tasks.filter(function(task){
    return task.priority === 'Высокий';
  })
  const commonPriorityTasks = tasks.filter(function(task){
    return task.priority === 'Обычный';
  })
  const lowPriorityTasks = tasks.filter(function(task){
    return task.priority === 'Низкий';
  })

  const updatedTasks = [
    ...highPriorityTasks,
    ...commonPriorityTasks,
    ...lowPriorityTasks
  ]

  return updatedTasks;
}

export function filterTasksByExpired(tasks){
  return tasks.filter(function(task){
    return new Date(task.date).getTime() < new Date().getTime();
  })
}

export function searchTasksByName(tasks, name){
  return tasks.filter(function(task){
    return task.name.toLowerCase().includes(name.toLocaleLowerCase())
  })
}
export function getFromLocalStorage(key){
  return JSON.parse(localStorage.getItem(key));
}

export function syncWithLocalStorage(key, value){
  const serializedValue = JSON.stringify(value);
  localStorage.setItem(key, serializedValue); 
}
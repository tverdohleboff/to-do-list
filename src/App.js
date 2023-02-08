import './App.css';
import React from 'react';
import FormInput from './blocks/FormInput/FormInput';
import FormOutput from './blocks/FormOutput/FormOutput';

function App() {
  const [technology, setTechnology] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [authorName, setAuthorName] = React.useState('');
  const [authorSecondName, setAuthorSecondName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [managerName, setManagerName] = React.useState('');

  return (
    <div className='App'>
      <FormInput 
        technology={technology}
        setTechnology={setTechnology}
        companyName={companyName}
        setCompanyName={setCompanyName}
        authorName={authorName}
        setAuthorName={setAuthorName}
        authorSecondName={authorSecondName}
        setAuthorSecondName={setAuthorSecondName}
        date={date}
        setDate={setDate}
        managerName={managerName}
        setManagerName={setManagerName} 
      />
      <FormOutput
        technology={technology}
        companyName={companyName}
        authorName={authorName}
        authorSecondName={authorSecondName}
        date={date}
        managerName={managerName}
       />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import List from './components/List';
import './App.css';
import { PeopleDTO } from './models/PeopleDTO';

function App() {

  const [people, setPeople] = useState<PeopleDTO['people']>([
    {
      name: 'Gabriel',
      age: 12,
  }]);
  
  return (
    <div className="App">
     <List people={people}/>
    </div>
  );
}

export default App;

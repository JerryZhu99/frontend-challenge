import './App.css';
import Dropdown from './components/Dropdown';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState([]);
  return (
    <div className="App">
      Example
      <div className="content">
        <Dropdown placeholder="Test" options={["123", "345"]} value={value} onChange={v => setValue(v)} multiple>
        </Dropdown>
      </div>
    </div>
  );
}

export default App;

import "./App.css";
import Dropdown from "./components/Dropdown";
import { useMemo, useState } from "react";

function App() {
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState([]);
  const [value3, setValue3] = useState([]);
  const largeItems = useMemo(() => new Array(10000).fill(0).map((_, i) => ({ value: i, label: `${i}`})), []);
  return (
    <div className="App">
      <div className="content">
        <h1>Examples</h1>
        <h2>Single Select Dropdown</h2>
        <Dropdown
          placeholder="Select an item"
          options={["apple", "banana", "cherry", "durian", "eggplant"]}
          value={value1}
          onChange={(v) => setValue1(v)}
        />
        <code>value: {JSON.stringify(value1)}</code>
        <h2>Multiple Select Dropdown</h2>
        <Dropdown
          placeholder="Select items"
          options={["red", "green", "blue", "cyan", "magenta", "yellow", "black", "orange", "indigo", "violet"]}
          value={value2}
          onChange={(v) => setValue2(v)}
          multiple
        />
        <code>value: {JSON.stringify(value2)}</code>
        <h2>Large List</h2>
        <Dropdown
          placeholder="Select items"
          options={largeItems}
          value={value3}
          onChange={(v) => setValue3(v)}
          multiple
        />
        <code>value: {JSON.stringify(value3)}</code>
      </div>
    </div>
  );
}

export default App;

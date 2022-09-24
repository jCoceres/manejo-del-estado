import './App.css';
import ClassState from './ClassState';

import { UseState } from './UseState.js';

function App() {
  return (
    <div className="App">
      <UseState name="useState" />
      <ClassState name="ClassState" />
    </div>
  );
}

export default App;

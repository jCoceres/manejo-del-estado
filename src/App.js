import './App.css';
import ClassState from './ClassState';
import { UseReducer } from './useReducer';
import { UseState } from './UseState.js';

function App() {
  return (
    <div className="App">
      <UseState name="useState" />
      <UseReducer name="use Reducer" />
      <ClassState name="ClassState" />
    </div>
  );
}

export default App;

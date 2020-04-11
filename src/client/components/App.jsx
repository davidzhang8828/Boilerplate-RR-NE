import React, { useState } from 'react';
import { Switch } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Switch>
        <div>
          This is a silly React Hooks demo with a Counter:
          {count}
          <br />
          <br />
          <button type="button" onClick={() => setCount(count + 1)}> Click Me </button>
        </div>
      </Switch>
    </div>
  );
}

export default App;

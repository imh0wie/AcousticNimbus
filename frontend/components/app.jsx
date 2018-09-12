import React from 'react';
import GreetingContainer from "./greeting/greeting_container";

const App = () => {
  return (
    <div>
      <header>
        <h1>Acoustic Nimbus</h1>
        <GreetingContainer />
      </header>
    </div>
  );
};

export default App;

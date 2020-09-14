import React from 'react';
import './App.css';
import { Muse } from './muse/Muse';

interface IAppState {
  loading: boolean;
}

class App extends React.Component<{}, IAppState> {
  render() {
    return (
      <div className="app">
        <h2>Example B</h2>
        <Muse />
      </div>
    );
  }
}

export default App;

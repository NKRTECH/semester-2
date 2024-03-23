import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Counter from './components/Counter';

function App() {
  return (
    <Provider store={store}>
      <Counter min={3} amount={5} />
    </Provider>
  );
}

export default App;

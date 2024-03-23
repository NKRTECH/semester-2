// components/Counter.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount, decrementToMin } from '../features/counter/counterSlice';

const Counter = ({ min, amount }) => {
  const counterValue = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(amount));
  };

  const handleDecrementToMin = () => {
    dispatch(decrementToMin(min));
  };

  return (
    <div>
      <h1>Counter: {counterValue}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleIncrementByAmount}>Increment by {amount}</button>
      <button onClick={handleDecrementToMin}>Decrement to Min ({min})</button>
    </div>
  );
};

export default Counter;



















/*
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset, incrementByAmount, decrementToMin } from '../features/counter/counterSlice';

const Counter = () => {
  // Access the current counter value from the Redux store
  const counterValue = useSelector((state) => state.counter.value);

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Function to handle the increment button click
  const handleIncrement = () => {
    dispatch(increment());
  };

  // Function to handle the decrement button click
  const handleDecrement = () => {
    dispatch(decrement());
  };

  // Function to handle the reset button click
  const handleReset = () => {
    dispatch(reset());
  };

  // Function to handle the increment by amount button click
  const handleIncrementByAmount = (amount) => {
    dispatch(incrementByAmount(amount));
  };

  // Function to handle the decrement to min button click
  const handleDecrementToMin = (min) => {
    dispatch(decrementToMin(min));
  };

  return (
    <div>
      <h1>Counter: {counterValue}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={() => handleIncrementByAmount(5)}>Increment by  5</button>
      <button onClick={() => handleDecrementToMin(3)}>Decrement to Min (3)</button>
    </div>
  );
};

export default Counter;
*/
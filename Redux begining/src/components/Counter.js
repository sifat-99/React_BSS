import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';

const Counter = () => {

  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();

  const toggleCounterHandler = () => {

  };
  const IncrementHandler = () => {
    dispatch({ type: 'INCREMENT' });
  };
  const DecrementHandler = () => {
    dispatch({ type: 'DECREMENT' });
  };
  const increaseByValueHandler = () => {
    dispatch({ type: 'increase', payload: 5 });
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <button onClick={DecrementHandler}>Decrement</button>
        <button style={{ marginLeft: '10px' }} onClick={increaseByValueHandler}>Increase by 5</button>
        <button style={{ marginLeft: '10px' }} onClick={IncrementHandler}>Increment</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

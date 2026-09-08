import { useSelector, useDispatch } from 'react-redux';
import classes from './Counter.module.css';
import { decrement, increase, increment, toggleCounter } from '../store';

const Counter = () => {

  const counter = useSelector(state => state.counter.counter);
  const dispatch = useDispatch();
  const showCounter = useSelector(state => state.counter.showCounter);

  const toggleCounterHandler = () => {
    dispatch(toggleCounter());
  };
  const IncrementHandler = () => {
    dispatch(increment());
  };
  const DecrementHandler = () => {
    dispatch(decrement());
  };
  const increaseByValueHandler = () => {
    dispatch(increase(5));
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
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

import React, { useReducer } from "react";

// Reducer란?
// 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환
// function reducer(state, action) {
//   // 새로운 상태를 만드는 로직
//   // const nextState = ...
//   return nextState;
// }

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const Counter = () => {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: "INCREMENT" });
  };
  const onDecrease = () => {
    dispatch({ type: "DECREMENT" });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

// const Counter_state = () => {
//   const [val, setVal] = useState(0);
//   const onIncrease = () => setVal((v) => v + 1);
//   const onDecrease = () => setVal((v) => (v > 0 ? v - 1 : 0));

//   return (
//     <div>
//       <h1>{val}</h1>
//       <button onClick={onIncrease}>+1</button>
//       <button onClick={onDecrease}>-1</button>
//     </div>
//   );
// };

export default Counter;

import React, { useState } from "react";

const Counter = () => {
  const [val, setVal] = useState(0);
  const onIncrease = () => setVal((v) => v + 1);
  const onDecrease = () => setVal((v) => (v > 0 ? v - 1 : 0));

  return (
    <div>
      <h1>{val}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
};

export default Counter;

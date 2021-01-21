import React, { useState, useRef } from "react";

const InputSample = () => {
  // ...setInputs 하면 [function]이 되어버려서 에러남
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const nameInput = useRef();
  const { name, nickname } = inputs;
  const onChange = (e) => {
    const { value, name } = e.target;
    // setInputs를 통해서 수정해야지 inputs[name] = value 이런식으로 직접 수정하면 안됨
    // 직접 수정하면 리렌더링이 안됨 (물론 강제로 리렌더링 할 수 있음. 대신 이렇게하면 성능이 매우 떨어짐)
    setInputs({
      ...inputs,
      [name]: value, // computed property name
    });
  };
  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus();
  };
  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
};

export default InputSample;

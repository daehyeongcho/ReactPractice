import React, { useState, useRef, useMemo, useCallback } from "react";
// import Hello from "./Hello";
import Counter from "./Counter";
import InputSample from "./InputSample";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import Wrapper from "./Wrapper";
import "./App.css";

const countActiveUsers = (users) => {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
};

const App = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  }, []);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ]);

  const nextId = useRef(4); //.current의 기본 값 설정
  // Q. 왜 const nextId = {current:4}; 혹은
  //    let nextId = 4; 이렇게 하지 않는가?
  // A. useRef는 일반적인 자바스크립트 객체입니다 즉 heap 영역에 저장됩니다
  // 그래서 어플리케이션이 종료되거나 가비지 컬렉팅 될 때 까지 참조할 때 마다 같은 메모리 주소를 가지게 되고
  // 같은 메모리 주소를 가지기 때문에 === 연산이 항상 true를 반환하고, 값이 바뀌어도 리렌더링 되지 않습니다.
  // 하지만 함수 컴포넌트 내부에 변수를 선언한다면, 렌더링 될 때마다 값이 초기화 됩니다.
  // 그래서 해당 방법을 지양하는 것 같습니다 :)
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers((users) => [...users, user]);
    setInputs({
      username: "",
      email: "",
    });
    // console.log(users);
    nextId.current += 1;
  }, [username, email]);
  const onRemove = useCallback(
    (id) => {
      setUsers(users.filter((user) => user.id !== id));
    },
    [users]
  );
  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <>
      <Wrapper>
        <Counter />
        <InputSample />
      </Wrapper>

      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성사용자 수: {count}</div>
    </>
  );
};

export default App;

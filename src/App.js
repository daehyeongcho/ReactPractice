import React, { useReducer, useMemo } from "react";
import produce from "immer";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import Wrapper from "./Wrapper";
import "./App.css";

const countActiveUsers = (users) => {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
};

const reducer = (users, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return produce(users, (draft) => {
        draft.push(action.user);
      });

    case "REMOVE_USER":
      return produce(users, (draft) => {
        const index = draft.findIndex((user) => user.id === action.id);
        draft.splice(index, 1);
      });
    // users.filter((user) => user.id !== action.id);

    case "TOGGLE_USER":
      return produce(users, (draft) => {
        const index = draft.findIndex((user) => user.id === action.id);
        draft[index].active = !draft[index].active;
      });
    // users.map((user) => user.id === action.id ? { ...user, active: !user.active } : user);

    default:
      return users;
  }
};

const initialUsers = [
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
];
// initialState 내에 nextId: useRef(4) <- 이렇게는 못씀 Hook은 Component 내부나 custom React Hook 내부에서만 콜되어야 한다.

export const UserDispatch = React.createContext(null);

const App = () => {
  const [users, dispatch] = useReducer(reducer, initialUsers);

  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <Wrapper>
        <CreateUser />
        <UserList users={users} />
        <div>활성사용자 수: {count}</div>
      </Wrapper>
    </UserDispatch.Provider>
  );
};

export default App;

// const App_state = () => {
//   const [inputs, setInputs] = useState({
//     username: "",
//     email: "",
//   });
//   const { username, email } = inputs;
//   const onChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setInputs((inputs) => ({
//       ...inputs,
//       [name]: value,
//     }));
//   }, []);
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       username: "velopert",
//       email: "public.velopert@gmail.com",
//       active: true,
//     },
//     {
//       id: 2,
//       username: "tester",
//       email: "tester@example.com",
//       active: false,
//     },
//     {
//       id: 3,
//       username: "liz",
//       email: "liz@example.com",
//       active: false,
//     },
//   ]);

//   const nextId = useRef(4); //.current의 기본 값 설정
//   // Q. 왜 const nextId = {current:4}; 혹은
//   //    let nextId = 4; 이렇게 하지 않는가?
//   // A. useRef는 일반적인 자바스크립트 객체입니다 즉 heap 영역에 저장됩니다
//   // 그래서 어플리케이션이 종료되거나 가비지 컬렉팅 될 때 까지 참조할 때 마다 같은 메모리 주소를 가지게 되고
//   // 같은 메모리 주소를 가지기 때문에 === 연산이 항상 true를 반환하고, 값이 바뀌어도 리렌더링 되지 않습니다.
//   // 하지만 함수 컴포넌트 내부에 변수를 선언한다면, 렌더링 될 때마다 값이 초기화 됩니다.
//   // 그래서 해당 방법을 지양하는 것 같습니다 :)
//   const onCreate = useCallback(() => {
//     const user = {
//       id: nextId.current,
//       username,
//       email,
//     };
//     setUsers((users) => [...users, user]);
//     setInputs({
//       username: "",
//       email: "",
//     });
//     // console.log(users);
//     nextId.current += 1;
//   }, [username, email]);
//   const onRemove = useCallback(
//     (id) => {
//       setUsers(users.filter((user) => user.id !== id));
//     },
//     [users]
//   );
//   const onToggle = useCallback((id) => {
//     setUsers((users) =>
//       users.map((user) =>
//         user.id === id ? { ...user, active: !user.active } : user
//       )
//     );
//   }, []);
//   const count = useMemo(() => countActiveUsers(users), [users]);
//   return (
//     <>
//       <Counter />
//       <Wrapper>
//         <Counter />
//         <InputSample />
//       </Wrapper>

//       <CreateUser
//         username={username}
//         email={email}
//         onChange={onChange}
//         onCreate={onCreate}
//       />
//       <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
//       <div>활성사용자 수: {count}</div>
//     </>
//   );
// };

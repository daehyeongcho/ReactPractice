import { useReducer, useCallback } from "react";
import produce from "immer";

const reducer = (inputs, action) => {
  switch (action.type) {
    case "CHANGE":
      return produce(inputs, (draft) => {
        draft[action.name] = action.value;
      });
    // return {...inputs, [action.name]: action.value };
    case "RESET":
      return action.initialForm;
    default:
      return inputs;
  }
};

const useInputs = (initialForm) => {
  const [form, dispatch] = useReducer(reducer, initialForm);

  // change
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE",
      name,
      value,
    });
  }, []);
  const reset = useCallback(() => {
    dispatch({
      type: "RESET",
      initialForm,
    });
  }, [initialForm]);
  return [form, onChange, reset];
};

export default useInputs;

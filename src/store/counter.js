import { createAction, handleActions } from "redux-actions";

// ACTION CREATORS
export const increment = createAction("COUNTER/INCREMENT");
export const decrement = createAction("COUNTER/DECREMENT");


const reducers = handleActions(
  {
    [increment](state) {
      return state + 1;
    },
    [decrement](state) {
      return state - 1;
    }
  },
  0
);

export default reducers;
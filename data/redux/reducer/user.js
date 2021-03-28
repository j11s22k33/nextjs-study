const $name = "USER";

// dispatch 때문에 고유이름이여야 한다
const TYPE_UPDATE = $name + "UPDATE";

const initialState = {};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE_UPDATE:
      return {
        ...state,
        ...action.data
      };
    default:
      return state;
  }
};

const Action = {
  update: (data) => ({
    type: TYPE_UPDATE,
    data
  })
};

export { Action };

export default Reducer;

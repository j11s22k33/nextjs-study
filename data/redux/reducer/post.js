const initialState = {};

const TYPE_UPDATE = "UPDATE";

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

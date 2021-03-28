const $name = "[Reducer/user]";

const initialState = {
  user: {}
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        ...action.data
      };
    default:
      throw new Error(
        `${$name} Not found reducer.Action ${JSON.stringify(action)}`
      );
  }
};

const Action = {
  update: (data) => ({
    type: "UPDATE",
    data
  })
};

export { Action };

export default Reducer;

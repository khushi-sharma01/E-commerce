const initialState = {
  data: {},
  user: {}
};

function RootReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_USER":
      state.user[action.payload[0]] = action.payload[1];
      console.log('State after ADD_USER:', state);
      return { data: state.data, user: state.user };

    case "ADD_PRODUCT":
      state.data[action.payload[0]] = action.payload[1];
      console.log('State after ADD_PRODUCT:', state);
      return { data: state.data, user: state.user };

    case "DELETE_PRODUCT":
      delete state.data[action.payload[0]];
      console.log('State after DELETE_PRODUCT:', state);
      return { data: state.data, user: state.user };

    default:
      return { data: state.data, user: state.user };
  }
}

export default RootReducer;

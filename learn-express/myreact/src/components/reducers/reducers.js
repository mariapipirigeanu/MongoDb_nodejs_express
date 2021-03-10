const initialState={
    messages:[]
};

const messagesReducer = (state =initialState , action) => {
    switch (action.type) {
        case "GET_MESSAGES":
           // console.log(action.payload);
        return{
                ...state,
                messages:action.payload
            };
            
      default:
          return state;
    }
}

export default messagesReducer;
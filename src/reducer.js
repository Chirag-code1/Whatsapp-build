export const initialState = { // how the data layer looks before we added anything.
    user: null, 
};

export const actionTypes = {
    SET_USER: "SET_USER", // push info into data, when we signin we dispatch the action which says go ahead and push this user in data layer.
}

const reducer = (state, action) => {
    console.log(action);

    switch (action.type) {
        case actionTypes.SET_USER: //if u have dispatch the data SET_USER
            return { // how we intend to change the data.
                ...state, // keep the state of data, keep everything that was already in there.
                user: action.user, //but change the user to whatever we dispatched. or what is there in SET_USER that we dispatched.
            };                
        default:
            return state; // if it wouldn't be SET_USER, then fall back on state.
    }

};

export default reducer;

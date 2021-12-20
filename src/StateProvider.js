import React, { createContext, useContext, useReducer} from "react"; //importing the things that we need.

export const StateContext = createContext(); //preparing the data layer, reating something called Context, this is where data layer actually lives!

export const StateProvider = (
    { reducer,initialState, children} ) => ( // this is a heigher order component which takes 3 things. Childer(here) is something which is rapped in StateProvider i.e <App />
    <StateContext.Provider value={useReducer
    (reducer, initialState)}>
        {children}
    </StateContext.Provider>
); // allow us to set the data to data layer of redux (not actually redux, it is StateProvider not Redux)

export const useStateValue = () => useContext 
(StateContext); // allows us to pull the data from data layer.

// import React, { createContext, useContext, useReducer } from "react";

// export const StateContext = createContext();

// export const StateProvider = ({ reducer, initialState, children }) => (
//   <StateContext.Provider value={useReducer(reducer, initialState)}>
//     {children}
//   </StateContext.Provider>
// );

// export const useStateValue = () => useContext(StateContext);

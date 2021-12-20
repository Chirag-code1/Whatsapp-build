import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer, { initialState } from './reducer';
import { StateProvider } from './StateProvider'; //exactly like redux but simpler to implement.

// StateProvider is basically like a data layer, it raps/surrounds the app & we can basically put information in that data layer & can pull it from any component. Our goal here is.. when we signin we push user in data layer & we pull user from data layer whenever we need it.
//We have two things to it.. initialState & reducer. (study)!.

ReactDOM.render(
  <React.StrictMode>
  <StateProvider initialState={initialState} reducer={reducer}> 
  <App />
  </StateProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


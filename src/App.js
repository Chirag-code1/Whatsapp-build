// import { useEffect, useState } from 'react';
import React from "react";
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { useStateValue } from './StateProvider';
import { useState } from "react";

function App() {

  const [{ user }, dispatch] = useStateValue()
  // const [messages, setMessages] = useState([]);
  // const [user, setUser] = useState(null); 
  // alert("User is "+ user);

  return (

<div className="app">
      {!user  ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;


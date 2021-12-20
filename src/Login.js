// // import { Button } from '@material-ui/core';
// // import React from 'react'
// // import { auth, provider } from './firebase';
// // import "./Login.css";
// // import { actionTypes } from './reducer';
// // import { useStateValue } from './StateProvider';

// import React from "react";
// import { Button } from "@material-ui/core";
// import "./Login.css";
// import { auth, provider } from "./firebase";
// import { useStateValue } from "./StateProvider";
// import { actionTypes } from "./reducer";

// function Login() {
//     const [{}, dispatch] = useStateValue(); 

//     // const signIn = () => {
//     //     auth.signInWithRedirect(provider) 
//     //     .then((result) =>
//     //         {
//     //             console.log(result)
//     //             dispatch({  
//     //                 type: actionTypes.SET_USER,
//     //                 user: result.user,
//     //             });
//     //         })
//     //         .catch((error)=> alert(error.message));
//     // };
//     const signIn = () => {
//         auth
//           .signInWithRedirect(provider)
//           .then((result) => {
//             console.log(result.user);
//             dispatch({
//               type: actionTypes.SET_USER,
//               user: result.user,
//             });
//             dispatch({
//               type: actionTypes.SET_SESSION,
//               uid: result.user.uid,
//               displayName: result.user.displayName,
//               photoURL: result.user.photoURL,
//             });
//           })
//           .catch((err) => alert(err.message));
//       };

//     return (
//         <div className="login">
//           <div className="login__container">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
//               alt="whatsapp"
//             />
//             <div className="login__text">
//               <h1>Sign in to Whatsapp</h1>
//             </div>
//             <Button onClick={signIn}>Sign In with Google</Button>
//           </div>
//         </div>
//       );
//     }
    
//     export default Login;
    
import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
function Login() {
  const [{}, dispatch] = useStateValue(); //That's how we pull data from data layer. you shoot payloads from dispatch to updata data layer. 

  const signIn = () => {
    auth
      .signInWithPopup(provider) //we used, signInWithRedirect will also work & will open new whole window for selecting google accounts!
      .then((result) => {
        console.log(result.user);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        // dispatch({ // We Dispatch info that we get from user's gmail, into sort of data layer. For that, we need something called StateProvider.
        //   type: actionTypes.SET_SESSION,
        //   uid: result.user.uid,
        //   displayName: result.user.displayName,
        //   photoURL: result.user.photoURL,
        // });
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/225px-WhatsApp.svg.png"
          alt="whatsapp"
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
}

export default Login;

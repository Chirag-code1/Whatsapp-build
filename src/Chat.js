import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFile from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";

import useSound from "use-sound";
import sendSound from './send.mp3';



function Chat(){ //{ messages } was a prop!
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("Tap or add Room");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    const [issendChecked, setIssendChecked] = useState(false);
    // const sendSound = "./send.mp3"

    // alert("user is : "+ user);
    // const [playOn] = useSound(sendSound, {
    //     volume: 0.5,
    //   });
    //   const [playOff] = useSound(sendSound, {
    //     volume: 0.5,
    //   });
    const [playOn] = useSound(sendSound);
    const [playOff] = useSound(sendSound);


    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
        if (roomId) {
          db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot) => (
              setRoomName(snapshot.data().name)
            )) 
    
            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc") //asc here means accending.
            .onSnapshot((snapshot) => (
              setMessages(snapshot.docs.map((doc) => doc.data()))
             ))
        }
      }, [roomId]);

    const sendMessage = (e) => {
        if(roomId){
        e.preventDefault();
        // console.log("You Typedd >>>>",input);
        // alert(roomId);
        if (input.length > 0) {
          db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .add({
              message: input,
              name: user.displayName, //.displayName is coming from info with gmail id.
              timestamp: firebase.firestore.FieldValue.serverTimestamp(), //this is crucial, we are taking server's time here and what is this gonna do is it is gonna show the time to you, based on on servers's time but for ur geographical area.
            });
            setIssendChecked(!issendChecked);
            issendChecked ? playOff() : playOn();
            setInput("");
        }
      }
      };

      

    return (
        <div className="chat">
            
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{" "}
                    {new Date(
                        messages[messages.length - 1]?.
                        timestamp?.toDate()
                    ).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})
                    }
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                    <SearchOutlined/>
                    </IconButton>

                    <IconButton>
                    <AttachFile />
                    </IconButton>

                    <IconButton>
                    <MoreVertIcon />
                    </IconButton>

                </div>

            </div>
            {/* chat header done above */}
            
            <div className="chat__body">
                    
                {messages.map((message) => (

                    
                    <p className={`chat__message ${message.name === user.displayName
                    && "chat__reciever"}`}
                    >
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {/* {message.timestamp} */}
                        {new Date(message.timestamp?.toDate()).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})
                        }
                    </span>
                    </p>


                ))}
            
                
           {/* <p className="chat__message">
                <span className="chat__name">Chirag</span>
                Message
                <span className="chat__timestamp">
                    {new Date().toUTCString()}
                </span>
                </p>

                <p className="chat__message chat__reciever">
                <span className="chat__name">Chirag</span>
                Message
                <span className="chat__timestamp">
                    {new Date().toUTCString()}
                </span>
                </p>

                <p className="chat__message">
                <span className="chat__name">Chirag</span>
                Message
                <span className="chat__timestamp">
                    {new Date().toUTCString()}
                </span>
                </p> */}

            </div>
            
            <div className="chat__footer">
                <InsertEmoticonIcon />

                <form>
                    <input value={input} 
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message"
                    type="text" />
                    <button onClick={sendMessage} 
                    type="submit">
                    Send a sendMessage
                    </button>
                </form>

                <MicIcon />

            </div>

        </div>
    )
}

export default Chat

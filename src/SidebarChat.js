import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from './firebase';
import "./SidebarChat.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const SidebarChat = ({id, name, addNewChat}) => { //id, name as prop!
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    // alert("id is", id);
    useEffect(() => {
        if (id) {
          db.collection("rooms")
            .doc(id)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
              setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
      }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));   
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");
        if (roomName && roomName.length >= 20) {
            return alert("enter a shorter name for the room");
          }
        if(roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }
    };

    return !addNewChat ? (
        
        <Link to={`/rooms/${id}`}>
                    <div className="sidebarChat">
                    <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                    <div className="sidebarChat__info">
                        <h2>{name}</h2>                       
                        {id != "" && messages.length > 0
                        ? messages[0]?.message
                        : "Start a new chat"}

                    </div>
                </div>
        </Link>
        
    ): (
        <div onClick={createChat}
        className="sidebarChat addnew__chat"> 
            <h2>Add new Chat</h2>
           <AddCircleIcon />
        </div>
    )
}

export default SidebarChat

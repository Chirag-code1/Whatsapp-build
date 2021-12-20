import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
// uimport MessageIcon from '@mui/icons-material/Message';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import SidebarChat from "./SidebarChat";
import { useStateValue } from './StateProvider';
import db from "./firebase";

const Sidebar = () => {
    const [rooms, setRooms] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=> {
        const unsubscribe = db.collection("rooms")
        .onSnapshot((snapshot) => // snapshot sees the lists hence name and also keeps track of changes and everytime it changes we get separate snapshots.
        setRooms(
            snapshot.docs.map((doc)=> ({ //docs here, means list of elements in database.
                id: doc.id,
                data: doc.data()
            }))
        ));
        return () => { //cleanup function in useEffect. It means here, deattaching realtime listener after using it.
            unsubscribe();
        }
    }, []);

    const exitApp = () => {
        window.location.reload();
      };

    return (
        <div className="sidebar">
            <div className="sidebar__header"> 

                <Avatar src={user?.photoURL}      
                />
            

            <div className="sidebar__headerRight">
               <IconButton> 
                    <DonutLargeIcon />
                </IconButton>
                <IconButton> 
                    <ChatIcon />
                </IconButton>
                <IconButton> 
                    <MoreVertIcon />
                </IconButton>
                <IconButton>
                  <div onClick={exitApp}>
                    <ExitToAppIcon />
                  </div>
                </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new chat"
                    type="text" />
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat
                     key ={room.id} //in react, key is used for performance.
                     name = { room.data.name}
                     id = {room.id} 
                    
                     />
                ))}
                {/* {rooms.map((room) => (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
              ))} */}
                {/* <SidebarChat />
                <SidebarChat />
                <SidebarChat /> */}
            </div>
        </div>
    )
}

export default Sidebar;

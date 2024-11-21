import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000/admin'); // Node.js backend URL

const Home = () => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [socketID, setSocketID] = useState(null);
    const [Room, setRoom] = useState(null);

    const sendMessage = () => {
      if (message.trim()) {
        const data={
            id:socketID ,   
            message:message}
          socket.emit('message', data); // Send message to server
          setMessage(''); // Clear input
      }  
  };
  
 
    useEffect(() => { 
        setSocketID(socket.id)

        // Listen for incoming messages
        socket.on('message', (data) => {
            setMessageList((prev) => [...prev, data]);
        }); 


        return ()=>{
          socket.disconnect();
        }
    }, []);
 
   
    return (
        <div>
            <h1>Socket.IO Chat</h1>
        <hr />
            <h3>{socketID}</h3>
            <hr />
            <div> 
                
                {
                  messageList.map((val,ind)=>{
                    return <p key={ind}>{val}</p>
                  })
                }
                
            </div>  
            <h3>Join-Room</h3>
            <input type="text" onMouseLeave={(e)=>{
                setRoom(e.target.value);
                socket.emit('joinRoom', e.target.value);
            }} name="" id="" />
            <h3>ID</h3>
            <input type="text" onChange={(e)=>setSocketID(e.target.value)}  placeholder='socket id' id="" />
            <hr />
            <input 
                type="text" 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Home;

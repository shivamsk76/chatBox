import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import './Chat.css';

const ENDPOINT = 'http://192.168.43.231:5000';
let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    console.log('server is running');

    setRoom(room);
    setName(name);
    socket.emit('join', { name, room }, (err) => { if (err) { alert(err); } });
  }, [ENDPOINT, location.search]);
  useEffect(() => {
    socket.on('message', message => { setMessages(messages => [...messages, message]); });
    socket.on("roomData", ({ users }) => {
    setUsers(users)
        })
    }, [])


    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, ()=>setMessage(''))
        }}
     return(
            <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input messages={messages} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />

        </div>

     )}
    



export default Chat;
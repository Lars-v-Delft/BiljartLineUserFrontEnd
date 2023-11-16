'use client';
import { useState } from 'react';
import { Client } from '@stomp/stompjs';

export default function Chatbox() {
    const stompClient = new Client({
        brokerURL: 'ws://localhost:8080/billiards-chat'
    });

    const [messages, setMessages] = useState<string[]>([]);
    const [connected, setConnected] = useState(false);
    const [name, setName] = useState('anoniem');
    const [message, setMessage] = useState('');

    stompClient.onConnect = (frame) => {
        console.log('stompClient.onConnect')
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat', (greeting) => {
            const message: message = JSON.parse(greeting.body);
            messages.push(message.sender + ': ' + message.content);
        });
    };

    stompClient.onWebSocketError = (error) => {
        console.error('Error with websocket', error);
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };

    function connect() {
        console.log("Connecting...");
        try {
            stompClient.activate();
            console.log("stompClient.activate()");
        } catch (error) {
            console.error('Error while trying to connect:', error);
        }
    }

    function disconnect() {
        stompClient.deactivate();
        setConnected(false);
        console.log("Disconnected");
    }

    function changeName(e: any) {
        setName(e.target.value);
    }
    function changeMessage(e: any) {
        setMessage(e.target.value);
    }
    function postMessage() {
        stompClient.publish({
            destination: "/app/send",
            body: JSON.stringify({ 'name': name, 'message': message })
        });
        setMessage('');
    }

    return (
        <div>
            <br />
            <label>BiljartLine chat</label>
            <br />
            <button disabled={connected} onClick={connect}>Join</button>
            <button disabled={!connected} onClick={disconnect} >Leave</button>
            <br />
            <input disabled={!connected} type="text" placeholder="Jouw naam..." onChange={changeName} />
            <br /> <br />
            <table hidden={!connected} >
                <thead>
                    <tr><th>Berichten</th></tr>
                </thead>
                <tbody>
                    {messages.map((message) => (
                        <tr key={message}><td>{message}</td></tr>
                    ))}
                </tbody>
            </table>
            <input disabled={!connected} type="text" placeholder="Jouw bericht..." onChange={changeMessage} />
            <br />
            <button disabled={!connected} onClick={postMessage}>Plaats bericht</button>
        </div>
    )
}

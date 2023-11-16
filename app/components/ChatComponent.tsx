'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
    sender: string;
    content: string;
}

const ChatComponent: React.FC = () => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');

    useEffect(() => {
        // Create a connection to the WebSocket server
        const newSocket = io('ws://localhost:8080/billiards-chat');

        // Event handler for connection success
        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        // Event handler for receiving messages
        newSocket.on('/topic/chat', (message: ChatMessage) => {
            console.log('Received message:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Event handler for connection errors
        newSocket.on('error', (error: Error) => {
            console.error('WebSocket connection error:', error);
        });

        // Event handler for disconnection
        newSocket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        setSocket(newSocket);

        // Clean up the socket connection on component unmount
        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    const sendMessage = () => {
        if (socket && messageInput.trim() !== '') {
            const message: ChatMessage = {
                sender: 'User', // You can customize the sender as needed
                content: messageInput.trim(),
            };

            socket.emit('/app/send', message);
            setMessageInput('');
        }
    };

    return (
        <div>
            <div>
                <h1>Chat</h1>
                <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <strong>{msg.sender}:</strong> {msg.content}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatComponent;
import { useState, useEffect } from 'react';

type Message = {
    id: number;
    text: string;
    status: 'pending' | 'delivered' | 'failed';
};

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080');
        setSocket(ws);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'ack') {
                // Обновляем статус сообщения
                setMessages(prev => prev.map(msg =>
                    msg.id === data.id ? { ...msg, status: 'delivered' } : msg
                ));
            } else {
                // Новое сообщение от другого клиента
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    text: data.message,
                    status: 'delivered'
                }]);
            }
        };

        return () => ws.close();
    }, []);

    const sendMessage = () => {
        if (socket && input.trim()) {
            const newMessage = {
                id: Date.now(),
                text: input,
                status: 'pending' as const
            };

            setMessages(prev => [...prev, newMessage]);
            socket.send(input);
            setInput('');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Чат с подтверждением доставки</h2>
            <div style={{ height: '300px', border: '1px solid #ccc', overflowY: 'scroll' }}>
                {messages.map((msg) => (
                    <div key={msg.id}>
                        {msg.text}
                        <small style={{ color:
                                msg.status === 'pending' ? 'orange' :
                                    msg.status === 'delivered' ? 'green' : 'red'
                        }}>
                            ({msg.status})
                        </small>
                    </div>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Отправить</button>
        </div>
    );
};

export default Chat;
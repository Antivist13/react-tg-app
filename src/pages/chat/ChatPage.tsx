import {FC, useState, useEffect, MouseEvent, useRef} from "react";
import classes  from "./ChatPage.module.css";
import { Message } from "../../components/message/Message";
import { IMessage } from "../../components/models/messages";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import Navigation from "../../components/navigation/Navigation";
import {auth, db} from "../../Firebase";
import {addDoc, collection, serverTimestamp, query, onSnapshot} from "firebase/firestore";

const ChatPage: FC = () => {
    const [messagesSelector, setMessagesSelector] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const messageRef = collection(db, "chat");
    const navigate = useNavigate();
    const messagesRef = useRef('');

    const getMessages = () => {
        onSnapshot(query(messageRef), (snapshot) => {
            snapshot.forEach(message => {
                const newMessage: IMessage[] = [];
                const collection = message.data();
                if (Object.keys(collection).length) {
                    newMessage.push({
                        id: collection['id'],
                        userId: collection['userId'],
                        text: collection['text'],
                        date: collection['date'],
                        createdAt: collection['createdAt']
                    });
                }
                setMessagesSelector([...newMessage]);
            })
        });
    }
    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/auth');
        }
        getMessages()
        console.log(messagesSelector)
    }, []);



    const submitMessage = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (newMessage.trim() && localStorage.getItem('userId')) {
            const userId: string = localStorage.getItem('userId') ?? '';
            const send = await addDoc(messageRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                created: new Date(),
                userId: userId,
                userName: localStorage.getItem('user')
            });
            console.log(send)
            const message: IMessage = {
                id: userId + (new Date().getTime()+''),
                userId: userId,
                text: newMessage,
                date: new Date()
            };
            setMessagesSelector([...messagesSelector, message] as IMessage[]);
        }
        setNewMessage('');
    }

    const logOut = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        await signOut(auth);
        navigate('/auth');
    }
    return (
        <div className={classes.chat}>
            <Navigation logOut={logOut}/>
            <div className={classes.container}>
                {
                    messagesSelector.map((message: IMessage, index) => {
                        return (
                            <Message message={message} key={index} />
                        )
                    })
                }
            </div>
            <form className={classes.form}>
                <Input
                   className={classes.input}
                   type="text"
                   value={newMessage}
                   onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button
                    type="submit"
                    className={classes.button}
                    onClick={(event) => submitMessage(event)}
                >
                    Отправить
                </Button>
            </form>
        </div>
    );
}

export default ChatPage;
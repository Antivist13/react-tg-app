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
import {addDoc, collection, serverTimestamp, query, onSnapshot, getDocs, orderBy} from "firebase/firestore";

const ChatPage: FC = () => {
    const [messagesSelector, setMessagesSelector] = useState<IMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const messagesRef = collection(db, "chat");
    const navigate = useNavigate();
    const messageRef = useRef<HTMLInputElement>(null);

    const getMessages = async (): Promise<IMessage[]> => {
        const querySnapshot = await getDocs(query(messagesRef, orderBy("createdAt", "asc")));
        const newMessage: IMessage[] = [];
        if (querySnapshot) {
            querySnapshot.forEach(snapshot => {
                const collection = snapshot.data();
                let currentDate = '';
                if(collection['created']) {
                    currentDate = collection['created'].toDate();
                }
                
                if (Object.keys(collection).length) {
                    newMessage.push({
                        id: snapshot.id,
                        userId: collection['userId'],
                        text: collection['text'],
                        date: currentDate ?? '',
                        createdAt: collection['createdAt']
                    });
                }
            });
        }

        return newMessage;
    }
    useEffect(() => {
        setLoading(true);
        if (!localStorage.getItem('user')) {
            navigate('/auth');
            return;
        }
        const currentQuery = query(messagesRef, orderBy("createdAt", "asc"));

        const unsubscribe = onSnapshot(currentQuery, (querySnapshot) => {
            const messages: IMessage[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                messages.push({
                    id: doc.id,
                    userId: data.userId,
                    text: data.text,
                    date: data.created?.toDate() ?? '',
                    createdAt: data.createdAt,
                });
            });

            setMessagesSelector(messages);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const submitMessage = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const currentMessage = messageRef.current?.value ?? '';
        setNewMessage('');
        if (currentMessage.trim() && localStorage.getItem('userId')) {
            const userId: string = localStorage.getItem('userId') ?? '';
            await addDoc(messagesRef, {
                text: currentMessage,
                createdAt: serverTimestamp(),
                created: new Date(),
                userId: userId,
                userName: localStorage.getItem('user')
            });
        }
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
                loading ?
                <h2 className={classes.loading}>...Идет загрузка</h2> :
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
                   ref={messageRef}
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
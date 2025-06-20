import { FC, useState, useEffect } from "react";
import classes  from "./ChatPage.module.css";
import { Message } from "../../components/message/Message";
import { IMessage } from "../../components/models/messages";
import { messages } from '../../utils/utils';
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const ChatPage: FC = () => {
    const [messagesSelector, setMessagesSelector] = useState<IMessage[]>([]);
    const [newMessages, setNewMessages] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            navigate('/auth');
        }
        setMessagesSelector(messages);
    }, []);

    const submitMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (newMessages.trim()) {
            const message: IMessage = {
                id: 1,
                userId: 1,
                type: "Me",
                text: newMessages,
                date: new Date()
            };
            setMessagesSelector([...messagesSelector, message] as IMessage[]);
        }
        setNewMessages('');
    }
    return (
        <div className={classes.chat}>
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
                <input
                    type="text"
                    className={classes.input}
                    value={newMessages}
                    onChange={(e) => setNewMessages(e.target.value)} />
                <button type="submit" className={classes.button} onClick={(event) => submitMessage(event)}>Отправить</button>
            </form>
        </div>
    );
}

export default ChatPage;
import { FC } from "react";
import classes  from "./ChatPage.module.css";
import { Message } from "../../components/message/Message";
import { IMessage } from "../../components/models/messages";
const messages: IMessage[] = [
    {
        id: 1,
        userId: 1,
        date: new Date(),
        text: "First Text",
        type: "Me"
    },
    {
        id: 2,
        userId: 2,
        date: new Date(),
        text: "Second Text",
        type: "Other"
    },
    {
        id: 3,
        userId: 3,
        date: new Date(),
        text: "Third Text",
        type: "Other"
    }
];
console.log(messages)
const ChatPage: FC = () => {
    return (
        <div className={classes.chat}>
            <div className={classes.container}>
                {/* {
                    messages.map((message) => <Message message={message} />)
                } */}
            </div>
        </div>
    );
}

export default ChatPage;
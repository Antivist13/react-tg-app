import { FC } from "react";
import classes  from "./Message.module.css";
import { IMessage } from "../../components/models/messages";

export const Message: FC<{ message: IMessage }> = ({message} ) => {
    const rootClasses: string[] = [classes.message];
    const time: string = message?.date
        ? `${message.date.getHours()}:${message.date.getMinutes()}`
        : '';
    const userId: string = localStorage.getItem('userId') ?? '';
    if (message.userId === userId) {
        rootClasses.push(classes.Me);
    }
    return (
        <div className={rootClasses.join(' ')}>
            <div className={classes.container}>
                <span className={classes.text}>{message.text}
                    <span className={classes.time}>{time}</span>
                </span>
            </div>
        </div>
    );
}
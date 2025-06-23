import { FC } from "react";
import classes  from "./Message.module.css";
import { IMessage } from "../../components/models/messages";

export const Message: FC<{ message: IMessage }> = ({message} ) => {
    const rootClasses: string[] = [classes.message];
    const currentDate = new Date(message?.date) ?? '';
    const userId: string = localStorage.getItem('userId') ?? '';
    let time = '';
    if (!isNaN(currentDate.getHours())) {
        time = `${
            currentDate?.getHours()
        }:${
            currentDate?.getMinutes() < 10
                ? '0' + currentDate?.getMinutes()
                : currentDate?.getMinutes()
        }`;
}

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
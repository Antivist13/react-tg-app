import { FC } from "react";
import classes  from "./Message.module.css";
import { IMessage } from "../../components/models/messages";
export const Message: FC<{ message: IMessage }> = ({message} ) => {
    const rootClasses: string[] = [classes.message];
    const currentDate = new Date(message?.date) ?? '';
    const time: string = isNaN(currentDate.getHours()) 
        ? ''
        : `${currentDate?.getHours()}:${currentDate?.getMinutes() < 10 ? '0' + currentDate?.getMinutes() : currentDate?.getMinutes()}`;
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
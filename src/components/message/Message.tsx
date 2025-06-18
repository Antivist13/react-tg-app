import { FC } from "react";
import classes  from "./Message.module.css";

export const Message: FC = (...props) => {
    const rootClasses = [classes.message];

    return (
        <span className={rootClasses.join(' ')}>Message</span>
    );
}
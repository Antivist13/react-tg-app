import React from 'react';
import classes from "./button.module.css";
const Button = ({children, ...props}) => {
    return (
        <button className={classes.button} onClick={() => {}}>{children}</button>
    );
};

export default Button;
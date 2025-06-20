import {FC, ButtonHTMLAttributes} from 'react';
import classes from "../button/Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({children, ...props}) => {
    return (
        <button className={classes.button} {...props}>{children}</button>
    );
};

export default Button;
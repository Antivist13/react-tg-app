import classes from "./button.module.css";
const Button = ({children, ...props}) => {
    const rootClasses = [classes.button];
    rootClasses.push(props?.className ?? '');
    return (
        <button
            {...props}
            className={rootClasses.join(' ')}
        >
            {children}
        </button>
    );
};

export default Button;
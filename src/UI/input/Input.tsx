import {FC, InputHTMLAttributes} from 'react';
import "./Input.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: FC<InputProps> = ({...props}) => {
    return (
        <input className='input' {...props}/>
    );
};

export default Input;
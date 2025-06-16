import Input from '../../UI/input/Input';
import Button from '../../UI/button/Button';
import clases from './Auth.module.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context';

const Auth = () => {
    const [authState, setAuthState] = useContext(AuthContext);
    const state = JSON.parse(localStorage.getItem('authState'));
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    useEffect(() => {
        if (!state) {
            setAuthState(false);
        } else {
            setAuthState(true);
            nav('/main');
        }
    }, []);

    function logIn(e) {
        e.preventDefault();
        if (login.length && password.length) {
            localStorage.setItem('authState', JSON.stringify(true));
            setAuthState(true);
            nav('/main');
        }
    }

    return (
        <div className={clases.auth}>
            <h1 className={clases.title}>Войти в аккаунт</h1>
            <form>
                <Input type='text' placeholder='Логин' onChange={(e)=>setLogin(e.target.value)}></Input>
                <Input type='password' placeholder='Пароль' onChange={(e)=>setPassword(e.target.value)}></Input>
                <Button type='submit' onClick={(e) => logIn(e)}>Войти</Button>
            </form>
        </div>
    );
};

export default Auth;
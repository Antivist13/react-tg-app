import {FC, FormEvent, useEffect, useState} from "react";
import "./AuthPage.css";
import Input from "../../UI/input/Input";
import Button from "../../UI/button/Button";
import {auth} from "../../Firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const AuthPage: FC = () => {
    const [title, setTitle] = useState('Войдите или зарегистрируйтесь')
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const [type, setType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setUser(localStorage.getItem('user') ?? '');
            navigate('/chat');
        }
    }, []);

    const getError = (value: string) => {
        setTitle(value)
        setTimeout(() => {
            setTitle('Войдите или зарегистрируйтесь')
        }, 2000)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nativeEvent = event.nativeEvent as SubmitEvent;
        const submitter = nativeEvent.submitter?.innerHTML as string | null;

        try {
            if (email.trim() && fullName.trim() && password.trim()) {
                localStorage.setItem('user', fullName);
                setUser(localStorage.getItem('user') ?? '');
                const logIn = submitter === 'Вход'
                    ? await signInWithEmailAndPassword(auth, email, password)
                    : await  createUserWithEmailAndPassword(auth, email, password);
                localStorage.setItem('userId', logIn.user.uid);
                navigate('/chat');
            }
        } catch (e) {
            setUser('');
            localStorage.removeItem('user');
            getError('Ошибка, попробуйте снова!');
            console.log(e);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="title">{title}</h2>
            <Input placeholder="Введите ФИО" type="text" onChange={(e) => setFullName(e.target.value)}/>
            <Input placeholder="Введите Email" type="email" onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder="Введите Пароль" type="password" onChange={(e) => setPassword(e.target.value)}/>
            <div className="buttons">
                <Button type="submit">Вход</Button>
                <Button type="submit">Регистрация</Button>
            </div>
        </form>
    );
}

export default AuthPage;
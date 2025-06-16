import { useContext } from 'react';
import Button from '../../UI/button/Button';
import Input from '../../UI/input/Input';
import classes from './Header.module.css';
import { AuthContext } from '../context';
import { useNavigate } from 'react-router-dom';

const Header = (props) => { 
const [authState, setAuthState] = useContext(AuthContext);
const nav = useNavigate();

function logOut(e) {
    e.preventDefault();
    setAuthState(false);
    localStorage.removeItem('authState');
    nav('/auth');
}
return (
        <div className={classes.navbar}>
            <Button onClick={() => props.create("create")} children={"Создать"}/>
            <label className={classes.search}>
                <Input type="text" placeholder="Искать..." onChange={(e) => props.search(e.target.value)} />
            </label>
            <Button children={"Выйти"} onClick={(e) => logOut(e)}/>
        </div>
    );
};

export default Header;
import {FC, MouseEvent} from 'react';
import Button from "../../UI/button/Button";
import './Navigation.css';


interface NavigationProps {
    logOut: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Navigation: FC<NavigationProps> = ({logOut}) => {
    const fullName: string = localStorage.getItem('user') ?? '';
    return (
        <div className="navigation">
            <Button onClick={logOut}>Выйти</Button>
            <span className="name">{fullName}</span>
        </div>
    );
};

export default Navigation;
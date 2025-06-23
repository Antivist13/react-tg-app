import {
    FC,
    useEffect,
    useState
} from "react";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import "../navbar/Navbar.css";

const Navbar: FC = () => {
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState<string | null>(null);
    const [title, setTitile] = useState<string | null>(null);

    useEffect(() => {
        setTitile('Личный кабинет');
        
        import('../../assets/images/logo.png')
            .then(module => setLogo(module.default))
            .catch(() => console.error("Failed to load image"));

        const timeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout);
    }, [loading]);

    return (
        <nav className="navigation">
            <div className="navigationButton">
                <Tooltip title="Click to see loading">
                    <IconButton onClick={() => setLoading(true)} loading={loading}>
                        <NotificationsOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </div>
            <span className="navigationTitle">{title}</span>
            {
                logo && <img className="navigationImage" src={logo} alt="Лого"/>
            }
        </nav>
    );
}

export default Navbar;
import {
    FC,
    useEffect,
    useState,
    MouseEvent
} from "react";
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./Chart.css";

const Chart: FC = () => {
    const [title, setTitle] = useState<string | null>(null);
    const [select, setSelect] = useState<string | null>(null);
    const options = [
        'за день',
        'за неделю',
        'за месяц',
        'за год',
    ];
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: MouseEvent) => {
        console.log(event.currentTarget);
        setAnchorEl(null);
    };

    useEffect(() => {
        setTitle('Статистика');
        setSelect(options[2]);
    }, []);

    return (
        <section className="chart">
            <IconButton aria-label="chart">
                <AssessmentOutlinedIcon />
            </IconButton>
            <span className="chartTitle">{title}</span>
             <>
                <span className="chartSelect">{options}</span>
                <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                    paper: {
                        style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                        },
                    },
                    list: {
                        'aria-labelledby': 'long-button',
                    },
                    }}
                >
                    {options.map((option) => (
                    <MenuItem key={option} selected={option === 'за месяц'} onClick={() => {return handleClose}}>
                        {option}
                    </MenuItem>
                    ))}
                </Menu>
            </>
        </section>
    );
}

export default Chart;
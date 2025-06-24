import React, {FC, MouseEvent, useEffect, useRef, useState} from 'react';
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
interface SelectProps {
    items: string[];
}
const Select: FC<SelectProps> = ({items}) => {
    const [select, setSelect] = useState<string | null>(null);
    const ITEM_HEIGHT = 48;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        setSelect(items[2]);
    }, []);

    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon sx={{fontSize: 16}}/>
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
                {items.map((option) => (
                    <MenuItem key={option} selected={option === select} onClick={() => {return handleClose}}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default Select;
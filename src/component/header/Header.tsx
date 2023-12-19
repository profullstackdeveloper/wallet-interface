import { MouseEvent } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {

    const [anchorEl, setAnchorE1] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (pathName !== "/login") {
            setAnchorE1(event.currentTarget);
        }
    }

    const navigate = useNavigate()

    const pathName = useLocation().pathname

    const handleLogOut = () => {
        localStorage.clear();
        handleClose();
        navigate("/login");
    }

    const handleClose = () => {
        setAnchorE1(null);
    }

    const handleLogoClick = () => {
        navigate("/home");
    }

    return (
        <div className="w-full h-full flex flex-row justify-between items-center px-4">
            <div onClick={handleLogoClick} className='cursor-pointer'>
                <Typography fontWeight={700} fontSize={35}>Wallet</Typography>
            </div>
            <IconButton onClick={(e) => handleClick(e)} >
                <AccountCircleIcon fontSize={'large'} />
            </IconButton>
            {
                pathName !== "/login" && <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
            }

        </div>
    )
}
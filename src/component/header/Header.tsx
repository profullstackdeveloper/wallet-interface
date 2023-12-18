import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/material';

export default function Header () {
    return (
        <div className="w-full h-full flex flex-row justify-between items-center px-4">
            <Typography fontWeight={700} fontSize={35}>Wallet</Typography>
            <AccountCircleIcon fontSize={'large'}/>
        </div>
    )
}
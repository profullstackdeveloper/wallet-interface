import { Button, Paper, TextField, Typography } from "@mui/material";
import { ChangeEvent, useContext } from "react";
import { WalletContext } from "../context/walletContext";
import { Link, useNavigate } from "react-router-dom";

export default function LoginWallet() {

    const { password, setPassword, getStore } = useContext(WalletContext);

    const handlePassword = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();

    const handleLogin = async () => {
        const pwd = await getStore("password");

        if(pwd == password) {
            localStorage.setItem('pwd', pwd);
            navigate("/home");
        }
    }

    return (
        <div className="w-full flex flex-col items-center h-full justify-center">
            <Paper elevation={2} className="flex flex-col items-center justify-center p-4">
                <Typography fontSize={30} mb={2}>Sign In</Typography>
                <TextField label="Password *" value={password} type="password" onChange={handlePassword}></TextField>
                <Button variant="outlined" sx={{ marginTop: '10px' }} onClick={handleLogin}>Login</Button>
                <Typography mb={2} mt={3}><Link to={{ pathname: "/create" }} className="text-blue-600">Create</Link> a new Wallet</Typography>
            </Paper>
        </div>
    )
}
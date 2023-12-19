import { Button, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { WalletContext } from "../context/walletContext";
import { Link, useNavigate } from "react-router-dom";
import { invoke } from "@tauri-apps/api";
import { Store } from "tauri-plugin-store-api";
import { Wallet } from 'ethers'

export default function LoginWallet() {

    const [walletList, setWalletList] = useState<string[]>([]);

    const { password, setPassword, getStore, walletName, setWalletName, getWholeWallet, setAccount, setPrivateKey } = useContext(WalletContext);

    const handlePassword = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    }

    const navigate = useNavigate();

    const handleLogin = async () => {
        const credential = await getStore(walletName);
        if (credential) {
            const decryptedResult: string = await invoke("decrypt_mnemonic", { encrypted: credential.encryptedMnemonic, password });

            const hdWallet = Wallet.fromPhrase(decryptedResult);
            const account = hdWallet.address;
            const privateKey = hdWallet.privateKey;
            setAccount(account);
            setPrivateKey(privateKey);

            localStorage.setItem('account', account);
            localStorage.setItem('privateKey', privateKey);
            navigate("/home");
        }
    }

    useEffect(() => {
        const getWalletList = async () => {
            const wholeWallet = await getWholeWallet();
            setWalletList(wholeWallet);
        };

        getWalletList();
    }, [])

    return (
        <div className="w-full flex flex-col items-center h-full justify-center">
            <Paper elevation={2} className="flex flex-col items-center justify-center p-4 w-[400px]">
                <div className="w-full flex flex-row justify-center items-center mb-4">
                    <Typography noWrap className="max-w-[40%] w-full">Select Wallet :</Typography>
                    <Select
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)}
                        className="max-w-[40%] !w-full"
                    >
                        {
                            walletList && walletList.length > 0 && walletList.map((wallet, index) => {
                                return (
                                    <MenuItem value={wallet} key={index}>{wallet}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </div>
                <Typography fontSize={30} mb={2}>Sign In</Typography>
                <TextField label="Password *" value={password} type="password" onChange={handlePassword}></TextField>
                <Button variant="outlined" sx={{ marginTop: '10px' }} onClick={handleLogin}>Login</Button>
                <Typography mb={2} mt={3}><Link to={{ pathname: "/create" }} className="text-blue-600">Create</Link> a new Wallet</Typography>
            </Paper>
        </div>
    )
}
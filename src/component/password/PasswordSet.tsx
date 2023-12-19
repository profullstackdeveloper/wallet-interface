import { Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, Fragment, useContext, useEffect, useState } from "react";
import { WalletContext } from "../../context/walletContext";
import * as tauriAPI from '@tauri-apps/api';
import { useNavigate } from "react-router-dom";
import { Wallet } from "ethers";

export default function PasswordSet() {

    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [canFinish, setCanfinish] = useState(false);

    const {setPassword: setWalletPassword, mnemonic, password: walletPassword, setStore, getStore, walletName} = useContext(WalletContext)

    const navigate = useNavigate();

    useEffect(() => {
        if(password && confirmation && password === confirmation) {
            setCanfinish(true);
        } else {
            setCanfinish(false);
        }
    }, [password, confirmation]);

    const handlePassword = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(e.target.value);
    }

    const handleConfirmation = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setConfirmation(e.target.value);
    }

    const handleFinish = async () => {
        setWalletPassword(password);

        const encryptMnemonic: string = await tauriAPI.invoke("encrypt_mnemonic", {mnemonic: mnemonic.join(" "), password});
        await setStore(walletName, {encryptedMnemonic: encryptMnemonic, password: password});
        navigate("/home");
    }

    return (
        <Fragment>
            <div className="w-full flex flex-col items-center space-y-4">
                <TextField label="Password *" value={password} type="password" onChange={handlePassword}></TextField>
                <TextField label="Confirm *" value={confirmation} type="password" onChange={handleConfirmation}></TextField>
            </div>
            <Button className="!mt-4" variant="outlined" disabled={!canFinish} onClick={handleFinish}>Finish</Button>
        </Fragment>
    )
}
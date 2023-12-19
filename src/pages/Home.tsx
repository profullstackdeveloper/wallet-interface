import { Button, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import Web3 from "web3";

export default function Home() {

    const [balance, setBalance] = useState('0');
    const [targetAddress, setTargetAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`)
    const web3 = new Web3(provider);

    const getEthBalance = async () => {
        const account = localStorage.getItem('account');
        if(account) {
            const balance = await web3.eth.getBalance(account);
            if(balance) {
                setBalance(balance.toString());
            }
        }
    }

    const sendEth = async () => {
        const privateKey = localStorage.getItem('privateKey');
        const account = localStorage.getItem('account');
        if(privateKey && account) {
            try {
                if(amount < Number(parseInt(Web3.utils.fromWei(balance, 'ether')).toFixed(2))) {
                    const result = await web3.eth.accounts.signTransaction({
                        to: targetAddress,
                        value: web3.utils.toWei(`${amount}`, 'ether'),
                        from: account
                    }, privateKey);
                } else {
                    setShowError(true);
                    setErrorMessage("Current balance is smaller than sending value.");
                }
            } catch (err) {
                setShowError(true);
                setErrorMessage(JSON.stringify(err));
            }
            
        } else {
            setShowError(true);
            setErrorMessage("Your account is not connected!");
        }
    }

    const handleSendValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAmount(Number(e.target.value));
        setShowError(false);
    }

    const handleTargetAddress = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTargetAddress(e.target.value);
        setShowError(false);
    }

    useEffect(() => {
        getEthBalance();
        const realTimeUpdate = setInterval(getEthBalance, 10000);
        return () => clearInterval(realTimeUpdate);
    }, [])

    return (
        <div className="w-screen h-full flex flex-col items-center justify-center">
            <div>
                {
                    "Current Balance: " + parseInt(Web3.utils.fromWei(balance, 'ether')).toFixed(2) + " ETH"
                }
            </div>
            <div className="flex flex-row items-center mt-5">
                <Typography>Send  &nbsp;</Typography>
                <TextField type="number" onChange={handleSendValue}></TextField>
                <Typography>&nbsp;&nbsp;ETH to:&nbsp;&nbsp;&nbsp;</Typography>
                <TextField title="Address" onChange={handleTargetAddress}></TextField>
            </div>
            <Button variant="outlined" className="!mt-5" onClick={sendEth}>Send</Button>
            {
                showError && <Typography color={'red'}>{errorMessage}</Typography>
            }
            
        </div>
    )
}
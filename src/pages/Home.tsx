import { Button } from "@mui/material";
import { hdkey } from 'ethereumjs-wallet'
import { useContext, useEffect, useState } from "react";
import * as bip39 from 'bip39';
import * as tauriAPI from '@tauri-apps/api';
import { ethers } from 'ethers'
import { WalletContext } from "../context/walletContext";
import Web3 from "web3";

export default function Home() {

    const [balance, setBalance] = useState('0');

    const {account, web3} = useContext(WalletContext);

    const getEthBalance = async () => {

        if(web3) {
            const balance = await web3.eth.getBalance("0x388C818CA8B9251b393131C08a736A67ccB19297");
    
            setBalance(balance.toString());
        }
    }

    useEffect(() => {
        getEthBalance();
        const realTimeUpdate = setInterval(getEthBalance, 10000)
        return () => clearInterval(realTimeUpdate);
    }, [])

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            {
                balance
            }
        </div>
    )
}
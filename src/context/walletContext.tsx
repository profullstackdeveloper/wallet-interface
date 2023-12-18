import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Store } from 'tauri-plugin-store-api';
import Web3, { HttpProvider } from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

interface WalletContextProp {
    mnemonic: string[],
    setMnemonic: Dispatch<SetStateAction<string[]>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    account: string,
    setAccount: Dispatch<SetStateAction<string>>,
    setStore: (key: string, data: string) => Promise<void>
    getStore: (key: string) => Promise<any>
    web3: Web3<RegisteredSubscription> | undefined
    setWeb3: Dispatch<SetStateAction<Web3<RegisteredSubscription> | undefined>>
}

type SetStoreArgs = {
    mnemonic: string,
    password: string
}

export const WalletContext = createContext({} as WalletContextProp);

export default function WalletContextProvider ({children}: {children: ReactNode}) {

    const [mnemonic, setMnemonic] = useState<string[]>([]);
    const [password, setPassword] = useState<string>("");
    const [account, setAccount] = useState<string>("");
    const [web3, setWeb3] = useState<Web3>();

    const store = new Store(".settings.dat");

    const setStore = async (key: string, data: string) => {
        await store.set(key, data);
        await store.save();
    }

    const getStore = async (key: string) => {
        return await store.get(key);
    }

    useEffect(() => {
        const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`)
        setWeb3(new Web3(provider));
    }, [])

    return (
        <WalletContext.Provider
            value={{
                mnemonic,
                setMnemonic,
                password,
                setPassword,
                account, 
                setAccount,
                setStore,
                getStore,
                web3,
                setWeb3
            }}
        >
            {
                children
            }
        </WalletContext.Provider>
    )
}
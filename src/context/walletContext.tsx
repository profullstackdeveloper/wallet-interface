import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";
import { Store } from 'tauri-plugin-store-api';
import Web3, { EthExecutionAPI, HttpProvider, Web3BaseProvider } from "web3";
import { RegisteredSubscription } from "web3/lib/commonjs/eth.exports";

interface WalletContextProp {
    mnemonic: string[],
    setMnemonic: Dispatch<SetStateAction<string[]>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    account: string,
    setAccount: Dispatch<SetStateAction<string>>,
    setStore: (key: string, data: SetStoreArgs) => Promise<void>
    getStore: (key: string) => Promise<any>
    provider: Web3BaseProvider<EthExecutionAPI> | undefined
    setProvider: Dispatch<SetStateAction<Web3BaseProvider<EthExecutionAPI> | undefined>>,
    walletName: string,
    setWalletName: Dispatch<SetStateAction<string>>,
    getWholeWallet: () => Promise<string[]>,
    privateKey: string,
    setPrivateKey: Dispatch<SetStateAction<string>>
}

type SetStoreArgs = {
    encryptedMnemonic: string,
    password: string
}

export const WalletContext = createContext({} as WalletContextProp);

export default function WalletContextProvider ({children}: {children: ReactNode}) {

    const [mnemonic, setMnemonic] = useState<string[]>([]);
    const [password, setPassword] = useState<string>("");
    const [account, setAccount] = useState<string>("");
    const [privateKey, setPrivateKey] = useState<string>("");
    const [provider, setProvider] = useState<Web3BaseProvider>();
    const [walletName, setWalletName] = useState<string>("");

    const store = new Store(".settings.dat");

    const setStore = async (key: string, data: SetStoreArgs) => {
        await store.set(key, data);
        await store.save();
    }

    const getStore = async (key: string) => {
        return await store.get(key);
    }

    const getWholeWallet = async () => {
        return await store.keys();
    }

    useEffect(() => {
        const provider = new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`)
        setProvider(provider);
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
                provider,
                setProvider,
                walletName,
                setWalletName,
                getWholeWallet,
                privateKey,
                setPrivateKey
            }}
        >
            {
                children
            }
        </WalletContext.Provider>
    )
}
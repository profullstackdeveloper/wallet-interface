import { Button, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import NewMnemonic from "../component/mnemonic/NewMnemonic";
import PasswordSet from "../component/password/PasswordSet";

export const Main = () => {

    const navigate = useNavigate();

    return (
        <Fragment>
            <Button variant="outlined" onClick={() => navigate("/create/new")}>Create New</Button>
            <Button variant="outlined" onClick={() => navigate("/create/import")}>Import Wallet</Button>
        </Fragment>
    )
}

export const CreateNew = () => {

    return (
        <div className="flex flex-col items-center w-1/3 max-w-[500px] ">
            <NewMnemonic isCustom={false} />
        </div>
    )
}

export const ImportWallet = () => {
    return (
        <div className="flex flex-col items-center w-1/3 max-w-[500px] ">
            <NewMnemonic isCustom={true} />
        </div>
    )
}

export const SetPassword = () => {
    return (
        <div>
            <PasswordSet />
        </div>
    )
}

export default function CreateWallet() {


    return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-5">
            <Typography fontSize={42} fontFamily={'revert'} letterSpacing={'3px'} fontWeight={700}>Wallet</Typography>
            <Outlet />
        </div>
    )
}
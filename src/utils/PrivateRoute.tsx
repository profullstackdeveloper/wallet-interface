import { Fragment, ReactNode, useContext, useEffect, useState } from "react"
import { WalletContext } from "../context/walletContext"
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({children}: {children: ReactNode}) {
    const account = localStorage.getItem("account");
    return (
        !account ? <Navigate to={"/login"} /> : <Fragment>{children}</Fragment>
    )
}
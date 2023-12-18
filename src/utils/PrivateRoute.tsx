import { Fragment, ReactNode, useContext, useEffect, useState } from "react"
import { WalletContext } from "../context/walletContext"
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({children}: {children: ReactNode}) {
    const pwd = localStorage.getItem("pwd");

    return (
        !pwd ? <Navigate to={"/login"} /> : <Fragment>{children}</Fragment>
    )
}
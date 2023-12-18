import { ReactNode } from "react";
import Header from "../component/header/Header";

export default function Layout ({children}: {children: ReactNode}) {
    return (
        <div className="w-screen h-screen flex flex-col overflow-hidden">
            <div className="w-full flex-grow-0 flex-shrink-0 h-20 shadow-md">
                <Header />
            </div>
            <div className="w-full flex-grow flex-shrink overflow-auto">
                {
                    children
                }
            </div>
        </div>
    )
}
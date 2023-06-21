import { Outlet } from "react-router-dom";
import { NavBar } from "../navbar/NavBar";
import './root.css';

export default function Root() {
    return (
        <>
            <nav>
                <NavBar />
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}
import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
// import LayoutCSS from "./Layout.module.css"

function RoomLayout() {

    return (
        <>
            
            
            <Navbar />
            <Header />
            <main>
                <Outlet />
             </main>
        </>
    );
}

export default RoomLayout;
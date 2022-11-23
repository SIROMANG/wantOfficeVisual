import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
// import CalendarLayoutCSS from "./CalendarLayout.module.css"

function CalendarLayout() {

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

export default CalendarLayout;
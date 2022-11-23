import { NavLink } from 'react-router-dom';
import RoomHeaderCSS from "./RoomHeader.module.css";


function Header() {

    return (
        <>
            <div className={ RoomHeaderCSS.HeaderDiv }>
                <ul>
                    <li><NavLink to="/room" style={{ textDecoration: "none", color: "#8D8D8D" }}>회의실 조회</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none", color: "#8D8D8D" }}>회의실 예약 조회</NavLink></li>
                </ul>

            </div>

            <div className={RoomHeaderCSS.SubmenuDiv}>
                <p>회의실 조회</p>
                <ul>
                    <li><NavLink to="/room" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 회의실 조회</NavLink></li>
                </ul>

                <p>회의실 예약 조회</p>
                <ul>
                    <li><NavLink to="/" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 회의실 예약 조회</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 회의실 예약 등록</NavLink></li>
                    <li><NavLink to="/" style={{ textDecoration: "none", color: "#8D8D8D" }}>&#9654; 회의실 예약 수정</NavLink></li>
                </ul>
            </div>
        </>
    );

}

export default Header;
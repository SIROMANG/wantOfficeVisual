import { useDispatch, useSelector } from "react-redux";
import { callInOutAPI, callInRegistAPI, callOutRegistAPI } from "../../apis/AttendanceAPICalls";
import Clock from "./Clock";
import AttendanceCSS from './Attendance.module.css';
import { useEffect } from "react";


function Attendance() {

    const dispatch = useDispatch();
    const attendance = useSelector(state => state.attendanceReducer);
    const attendanceDetail = attendance.data;

    const onClickInHandler = () => {
        dispatch(callInRegistAPI());
    }

    const onClickOutHandler = () => {
        dispatch(callOutRegistAPI({

        }));
    }

    useEffect(() => {
        dispatch(callInOutAPI());
    }, [attendanceDetail]);

    return (
        <>
            <div><Clock/></div>
            <div>
                {
                    <button className={ AttendanceCSS.InOutButton }
                        onClick={ onClickInHandler }
                        disabled={ attendance.attIn != null }
                    >
                        출근하기
                    </button>
                }
                {
                    <button className={ AttendanceCSS.InOutButton }
                        onClick={ onClickOutHandler }
                        disabled={ attendance.attIn == null || attendance.attOut != null }
                    >
                        퇴근하기
                    </button>
                }
            </div>
            <h3>{ attendance.attIn || ''}</h3>
            <h3>{ attendance.attOut || '' }</h3>
        </>
    );

}

export default Attendance;
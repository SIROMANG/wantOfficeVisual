import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callMyAttListAPI } from "../../apis/AttendanceAPICalls";

function MyAttList() {

    const dispatch = useDispatch();
    const attendances = useSelector(state => state.attendanceReducer);

    const now = new Date();
    let y = now.getFullYear();
    let m = 1 + now.getMonth();

    const [selectedYear, setSelectedYear] = useState(y);
    const [selectedMonth, setSelectedMonth] = useState(m);

    const handleSelectYear = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleSelectMonth = (e) => {
        setSelectedMonth(e.target.value);
    };

    const onClickSelectHandler = (selectedYear, selectedMonth) => {
        
    }

    useEffect(
        () => {
            dispatch(callMyAttListAPI({year : selectedYear, month : selectedMonth}));
        }, [selectedYear, selectedMonth]
    );

    return (
        <>
            <div>
                <h2>내 근태 조회</h2>
                <select value={selectedYear} onChange={handleSelectYear}>
                    <option value="2022">2022년</option>
                    <option value="2021">2021년</option>
                    <option value="2020">2020년</option>
                    <option value="2019">2019년</option>
                    <option value="2018">2018년</option>
                    <option value="2017">2017년</option>
                    <option value="2016">2016년</option>
                    <option value="2015">2015년</option>
                </select>
                <select value={selectedMonth} onChange={handleSelectMonth}>
                    <option value="12">12월</option>
                    <option value="11">11월</option>
                    <option value="10">10월</option>
                    <option value="09">9월</option>
                    <option value="08">8월</option>
                    <option value="07">7월</option>
                    <option value="06">6월</option>
                    <option value="05">5월</option>
                    <option value="04">4월</option>
                    <option value="03">3월</option>
                    <option value="02">2월</option>
                    <option value="01">1월</option>
                </select>
                <button onClick={onClickSelectHandler}
                >
                    검색
                </button>
            </div>
            <table>
                <colgroup>
                    <col width="10%"/>
                    <col width="30%"/>
                    <col width="30%"/>
                    <col width="30%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>날짜</th>
                        <th>출근시간</th>
                        <th>퇴근시간</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(attendances) && attendances.map(
                            (attendance) => (
                                <tr
                                    key={ attendance.attNo }
                                >
                                   <td>{ attendance.attNo }</td> 
                                   <td>{ attendance.attDate }</td> 
                                   <td>{ attendance.attIn }</td> 
                                   <td>{ attendance.attOut }</td> 
                                </tr>
                            )
                        )        
                    }
                </tbody>
            </table>
        </>
    );

}

export default MyAttList;
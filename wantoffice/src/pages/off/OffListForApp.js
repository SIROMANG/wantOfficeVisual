import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callOffListForAppAPI } from "../../apis/OffAPICalls";
import { NavLink } from "react-router-dom";
import { decodeJwt } from "../../utils/tokenUtils";
import AttAndOffCSS from "../attendance/AttAndOff.module.css";

function OffListForApp() {

    const dispatch = useDispatch();
    const offs = useSelector(state => state.offReducer);
    const offList = offs.data;
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedResult, setSelectedResult] = useState("대기");

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }
    
    const handleSelectResult = (e) => {
        setSelectedResult(e.target.value);
    };

    useEffect(
        () => {
            dispatch(callOffListForAppAPI({offResult : selectedResult, currentPage : currentPage}));
        }, [selectedResult ,currentPage]
    );

    const pageBtn = offs.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }
    
    return (
        <>
            <div>
                <section className={AttAndOffCSS.submenu}>
                    <br></br>
                    <h3>Attendance</h3>
                    <div className={AttAndOffCSS.submenuDiv}>
                        <h4>근태</h4>
                        <ul className={AttAndOffCSS.submenuUl} >
                            { decoded === "ROLE_MEMBER" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_APP_AUTH" && <li> <NavLink to="/attendance/my" style={{ textDecoration: "none", color: "#505050" }}>내 근태 월별 조회</NavLink></li> }
                            { decoded === "ROLE_ADMIN" && <li> <NavLink to="/attendance/manage-list" style={{ textDecoration: "none", color: "#505050" }}>날짜별 근태 조회</NavLink></li> }
                        </ul>
                    </div>
                    <br></br>
                    <h3>Off</h3>
                    <div className={AttAndOffCSS.submenuDiv}>
                        { decoded === "ROLE_MEMBER" &&<h4>연차</h4> }
                        { decoded === "ROLE_MEMBER" && <ul className={AttAndOffCSS.submenuUl} >
                            <li><NavLink to="/off" style={{ textDecoration: "none", color: "#505050" }}>연차 신청 조회</NavLink></li>
                            <li><NavLink to="/off/regist" style={{ textDecoration: "none", color: "#505050" }}>연차 신청</NavLink></li>
                        </ul> }{ decoded === "ROLE_MEMBER" && <br></br> }
                        { decoded === "ROLE_APP_AUTH" && <h4>연차 관리</h4> }
                        { decoded === "ROLE_APP_AUTH" && <ul className={AttAndOffCSS.submenuUl} >
                            <li><NavLink to="/off/result" style={{ textDecoration: "none", color: "#505050" }}>결과별 연차 신청 조회</NavLink></li>
                        </ul>
                        }
                    </div>
                </section>
            </div>
            <div className={AttAndOffCSS.OffListForAdminDiv}>
                <span>연차 신청 조회</span>
                <select value={selectedResult} onChange={handleSelectResult} className={AttAndOffCSS.resultSelect}>
                    <option value="대기">대기</option>
                    <option value="승인">승인</option>
                    <option value="반려">반려</option>
                </select>
                <div>
                    <table className={AttAndOffCSS.OffListForAdminTable}>
                        <colgroup>
                            <col width="10%"/>
                            <col width="20%"/>
                            <col width="25%"/>
                            <col width="15%"/>
                            <col width="15%"/>
                            <col width="15%"/>
                        </colgroup>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>연차기간</th>
                                <th>부서</th>
                                <th>직책</th>
                                <th>이름</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.isArray(offList) && offList.map(
                                    (off) => (
                                        <tr
                                            key={ off.offNo }
                                        >
                                            <td>{ off.offNo }</td>
                                            <td>{ off.offTitle }</td>
                                            <td>{ off.offStart }　~　{ off.offEnd }</td>
                                            <td>{ off.member.dept.deptName }</td>
                                            <td>{ off.member.position.positionName }</td>
                                            <td>{ off.member.memberName }</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <div className={AttAndOffCSS.adminPageDiv}>
                    {
                        Array.isArray(offList) &&
                        <button
                            onClick={ () => setCurrentPage(currentPage - 1) }
                            disabled={ currentPage === 1 }
                            className={AttAndOffCSS.pagingBtn}
                        >
                            &lt;
                        </button>
                    }
                    {
                        pageNumber.map((num) => (
                                <button
                                    onClick={ () => setCurrentPage(num) }
                                    className={AttAndOffCSS.num}
                                >
                                    {num}
                                </button>
                        ))
                    }
                    {
                        Array.isArray(offList) &&
                        <button
                            onClick={ () => setCurrentPage(currentPage + 1) }
                            disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                            className={AttAndOffCSS.pagingBtn}
                        >
                            &gt;
                        </button>
                    }
                </div>
            </div>
        </>
    );

}

export default OffListForApp;
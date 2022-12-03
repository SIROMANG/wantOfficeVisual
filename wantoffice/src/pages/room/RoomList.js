import RoomListCSS from "./RoomList.module.css";
import Room from "../../components/room/Room";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callRoomListAPI } from '../../apis/RoomAPICalls';
import { Navigate, useNavigate } from "react-router-dom";
import { decodeJwt } from '../../utils/tokenUtils';


function RoomList(){

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rooms = useSelector(state => state.roomReducer);
    const roomList = rooms.data;
    const [currentPage, setCurrentPage] = useState(1);

    console.log(rooms, roomList);

    const isLogin = window.localStorage.getItem('accessToken');
    let decoded = null;

    if(isLogin) {
        const temp = decodeJwt(isLogin);
        decoded = temp.auth[0].authName;
    }console.log(decoded);


    useEffect(
        () => {

            console.log('useEffect 동작 확인');
            dispatch(callRoomListAPI({
                currentPage : currentPage
            }));
        },
        [currentPage]
    );

    const onClickRoomMInsert = () =>{
        console.log('[RoomList] onClickRoomMInsert');
        navigate(`/room/room-managements`, { replace : false })
    }

    /* 페이징 */
    const pageBtn = rooms.pageBtn;
    const pageNumber = [];
    if(pageBtn){
        for(let i = pageBtn.startPage; i <= pageBtn.endPage; i++) {
            pageNumber.push(i);
        }
    }

    return(
        <>
           
            <div className={RoomListCSS.roomListDiv}>
                <h2>회의실 시설 안내</h2>
                { 
                    Array.isArray(roomList)
                    && roomList.map((room) => (<Room key={ room.roomNo } room={ room }/>))
                }
                
            <div className={ RoomListCSS.roomPgs }>
                {
                    Array.isArray(roomList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage - 1) }
                        disabled={ currentPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &lt;
                    </button>
                }
                {
                    pageNumber.map((num) => (
                        <li key={num} onClick={ () => setCurrentPage(num) }>
                            <button
                                onClick={ () => setCurrentPage(num) }
                                className= { RoomListCSS.num }
                            >
                                {num}
                            </button>
                        </li>
                    ))
                }
                {
                    Array.isArray(roomList) &&
                    <button
                        onClick={ () => setCurrentPage(currentPage + 1) }
                        disabled={ currentPage === pageBtn.maxPage || pageBtn.endPage === 1 }
                        className={ RoomListCSS.pagingBtn }
                    >
                        &gt;
                    </button>
                }
                </div>
            </div>
            { decoded === "ROLE_ADMIN" && 
                <button
                        onClick={ onClickRoomMInsert }
                        className={ RoomListCSS.rmInsertBtn }
                    >
                        등록하기</button>
                         } 
        </>
    );

}
export default RoomList;
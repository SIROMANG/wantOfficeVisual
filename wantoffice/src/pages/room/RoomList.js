import RoomListCSS from "./RoomList.module.css";
import Room from "../../components/room/Room";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { callRoomListAPI } from '../../apis/RoomAPICalls';

function RoomList(){

    const dispatch = useDispatch();
    const rooms = useSelector(state => state.roomReducer);
    const roomList = rooms.data;
    const [currentPage, setCurrentPage] = useState(1);



    useEffect(
        () => {
            dispatch(callRoomListAPI({
                currentPage : currentPage
            }));
        },
        [currentPage]
    );

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
                                style={ currentPage === num ? { backgroundColor : 'red' } : null }
                                className= { RoomListCSS.pagingBtn }
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
            
        </>
    );

}
export default RoomList;
// import roomReducer from "../../modules/roomModule";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import RoomDetailCSS from './RoomDetail.module.css';
import { callRoomDetailAPI } from '../../apis/RoomAPICalls';

function RoomDetail(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const room = useSelector(state => state.roomReducer);
    const params = useParams();
    const roomNo = params.roomNo;
    // const [loginModal, setLoginModal] = useState(false);

    useEffect(
        () => {
            dispatch(callRoomDetailAPI({
                roomNo : roomNo
            }));
        },
        []
    );

    /* 예약신청 버튼 이벤트 */    
    // const onClickReservationHandler = () => {

    //     // 로그인 상태 확인
    //     const token = decodeJwt(window.localStorage.getItem("accessToken"));
    //     console.log('[onClickReservationHandler] token : ', token);

    //     if(!token) {
    //         alert("신청 전 로그인 확인이 필요합니다.");
    //         setLoginModal(true);
    //         return;
    //     }

    //     // 토큰 만료시 재 로그인
    //     if(token.exp * 1000 < Date.now()) {
    //         setLoginModal(true);
    //         return;
    //     }
    //    navigate("/rooms${room.roomNo}", { replace : true });
    // }

    return(
        <>
            {/* { loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null } */}
            <div className={ RoomDetailCSS.DetailDiv }>
                <div className={ RoomDetailCSS.imgsDiv }>
                    <img src={ room.roomFileUrl } alt="테스트"/>
                    <p className={ RoomDetailCSS.imgName }
                    >
                        { room.roomName }
                    </p>
                </div>
            </div>
            <div className={ RoomDetailCSS.editDiv }>
                <table className={ RoomDetailCSS.editTable }>
                    <tbody>
                        <tr>
                            <th>회의실 번호</th>
                            <td>{ room.roomNo || '' }</td>
                        </tr>
                        <tr>
                            <th>회의실 명</th>
                            <td>{ room.roomName || '' }</td>
                        </tr>
                        <tr>
                            <th>회의실 위치</th>
                            <td>{ room.roomLocation || '' }</td>
                        </tr>
                        <tr>
                            <th>회의실 수용 인원</th>
                            <td>{ room.roomCapacity || '' }</td>
                        </tr>
                    </tbody>
                </table>
                <button
                    className={ RoomDetailCSS.roomResBtn }
                    // onClick={ onClickReservationHandler }
                >
                    예약 신청 하기
                </button>
            </div>
        </>
    );

}

export default RoomDetail;
import RoomCSS from "./Room.module.css";
import { useNavigate } from 'react-router-dom';


function Room({ room : {roomNo, roomName, roomLocation, roomCapacity, roomFileUrl, roomImage} }){

    const navigate = useNavigate();

    const onClickRoomHandler = (roomNo) => {
        navigate(`/api/room/room${roomNo}`, { replace : false });
    }

    return(
        <div
            className={ RoomCSS.roomDiv }
            onClick={ () => onClickRoomHandler(roomNo) }
        >
            <img src={ roomImage } alt="예시"/>
            <h6>{ roomName }</h6>
        </div>
    );

} 

export default Room;
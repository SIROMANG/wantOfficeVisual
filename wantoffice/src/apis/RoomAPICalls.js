import { GET_ROOM, GET_ROOMS } from "../modules/roomModule";

export const callRoomListAPI = ({currentPage = 1}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rooms?page=${currentPage}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RoomAPICalls] callRoomListAPI result : ', result);
            dispatch({ type: GET_ROOMS, payload: result.data });
        }
    }
}

export const callRoomDetailAPI = ({roomNo}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8001/api/room/rooms/${roomNo}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                "Accept": "*/*"
            }
        })
        .then(response => response.json());

        if(result.status === 200) {
            console.log('[RoomAPICalls] callRoomDetailAPI result : ', result);
            dispatch({ type: GET_ROOM, payload: result.data });
        }
    }

}
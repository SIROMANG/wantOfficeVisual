import queryString from 'query-string';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function Search(){

    const { Search } = useLocation();
    const { value } = queryString.parse(search);
    console.log('value', value);

    const dispatch = useDispatch();
    const rooms = useSelector(state => state.roomReducer);
    const roomList = rooms.data;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(
        () => {
            dispatch(callSearchListAPI({
                search : value,
                currentPage : currentPage
            }));
        },
        [currentPage, value]
    );


}

export default Search;
// import { log } from 'console';
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = [], action) => {
    switch (action.type) {
        case UPDATE:
            return {...state,posts:state.posts.map((post) => post._id === action.payload._id ? action.payload : post)}
        case FETCH_ALL:
            return {
                ...state,
                posts:action.payload.data,
                currentPage:action.payload.currentPage,
                numberOfPages:action.payload.numberOfPages,
            };
        case CREATE:
             state.posts.unshift(action.payload);
            return {...state};
        case LIKE:
            return {...state,posts:state.posts.map((post) => (post._id === action.payload._id ? action.payload : post))}
        case DELETE:
            return {...state,posts:state.posts.filter((post) => post._id !== action.payload)};
        case FETCH_BY_SEARCH:
             return {...state,posts:action.payload};
        default:
            return true;
    }
}           
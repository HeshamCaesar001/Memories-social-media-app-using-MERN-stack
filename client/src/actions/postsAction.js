import { FETCH_ALL,FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api';

//Action creators

export const getPosts = (page)=> async(dispatch)=>{

    try {
        const {data} = await api.fetchPosts(page);
        dispatch({type: FETCH_ALL,payload:data});
    } catch (error) {
        console.error(error);
    }
}
export const createPost = (post)=> async(dispatch)=>{

    try {
        const {data} = await api.createPost(post);
        dispatch({type: CREATE,payload:data})
    } catch (error) {
        console.error(error);

    }
}
export const updatePost = (id,post)=> async (dispatch)=>{
    try {
        const {data} = await api.updatePost(id,post);
        dispatch({type: UPDATE,payload:data});
    } catch (error) {
        console.error(error);
    }
}
export const deletePost = (id)=> async (dispatch)=>{
    try {
        await api.deletePost(id);
        dispatch({type: DELETE,payload:id});
    } catch (error) {
        console.error(error);
    }
}
export const likePost = (id)=> async(dispatch)=>{
    try {
        const {data} = await api.likePost(id);
        dispatch({type: LIKE,payload:data})
    } catch (error) {
        console.error(error);
    }
}
export const getPostBySearch = (search)=> async(dispatch)=>{
    try {
        const {data:{data}} = await api.fetchPostsBySearch(search);
        dispatch({type:FETCH_BY_SEARCH,payload:data});
    } catch (error) {
        console.error(error);
    }
}
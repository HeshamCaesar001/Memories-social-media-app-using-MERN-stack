import { AUTH,LOGOUT } from "../constants/actionTypes";
import * as api from '../api';
export const signIn = (formData,navigation)=> async(dispatch)=>{

    try {
        const {data} = await api.signIn(formData);
        dispatch({type:AUTH,payload:data});
        navigation('/')
    } catch (error) {
        console.log(error.message);
    }
}
export const signUp = (formData,navigation)=> async(dispatch)=>{

    try {
        //signUpthe user, then push to home page
        const {data} = await api.signUp(formData);
        dispatch({type:AUTH,payload:data});
        navigation('/')
    } catch (error) {
        console.log(error);
    }
}
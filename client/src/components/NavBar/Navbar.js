import React,{useState,useEffect} from 'react';
import {AppBar ,Typography,Toolbar,Avatar,Button } from '@material-ui/core';
import useStyle from './syles';
import memories from'../../images/memories-Text.png';
import logo from '../../images/memories-Logo.png';
import { Link ,useNavigate ,useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';
const Navbar = () => {
    const classes = useStyle();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useNavigate ();
    const location = useLocation();

    useEffect(()=>{
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    function logout(){
        dispatch({type:'LOGOUT'});
        history('/');
    }
  return (
    <AppBar className={classes.appBar} position='static' color="inherit">
         <Link to ="/" className={classes.brandContainer}>
            <img className={classes.image} src={memories} alt="memories"  height="60px" />
            <img className={classes.image} src={logo} alt="memories"  height="40px" />
         </Link>
         <Toolbar className={classes.toolbar} >
            { 
                user ? (
                    <div className={classes.profile} >
                        <Avatar className={classes.purple} alt={user.result.name}  src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary"  onClick={logout}>Logout</Button>
                    </div>
                ):(
                    <Button component={Link} to="/auth" variant="contained" color="primary">SignIn</Button>
                )
            }
         </Toolbar>
    </AppBar>
  )
}

export default Navbar
import React, { useState } from 'react'
import useStyle from './style';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import {useDispatch} from 'react-redux';
import {useNavigate } from 'react-router-dom';
// import Icon from './Icon';
// import { GoogleLogin } from '@react-oauth/google';
import { signIn,signUp } from '../../actions/authAction';
const Auth = () => {
  const initialState = {firstName:"",lastName:"",email:"",password:"",confirmPassword:""};
  const dispatch = useDispatch();
  const classes = useStyle();
  const [isSignUp, setIsSignUP] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData,setFormData] = useState(initialState);
  const navigation = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    if(isSignUp){
      dispatch(signUp(formData,navigation))
    }else{
      dispatch(signIn(formData,navigation))

    }
  }
  function handleChange(event) {
    const {name,value} = event.target;
    setFormData((prevData)=>({
        ...prevData,
        [name] : value
    }))
  }
  function handleShowButton() {
    setShowPass((prevState) => !prevState)
  }
  function switchMode() {
    setIsSignUP((prevState) => !prevState)
  }
 // TODO//Google signin button
  // async function googleSuccess(res) {
  //   const result = res?.profileObj;
  //   // const token
  //   console.log(res);
  // }
  // function googleFailure(error) {
  //   console.log(error);
  // }
  return (
    <Container component="main" maxWidth="xs"  >
      <Paper className={classes.paper} elevation={3} >
        <Avatar className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" >{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form onSubmit={handleSubmit} className={classes.form} >
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input
                    name="firstName"
                    label="FirstName"
                    value=''
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="LastName"
                    value=''
                    handleChange={handleChange}
                    half
                  />
                </>
              )
            }
            <Input name='email' label="Email Address" handleChange={handleChange} type="email" />
            <Input name='password' label="Password" handleChange={handleChange} type={showPass ? 'text' : 'password'} handleShowButton={handleShowButton} />
            {
              isSignUp && (
                <Input name="confirmPassword" label="Repeate Password" handleChange={handleChange} type='password' />
              )
            }
          </Grid>
            {/* submit the form  */}
          <Button variant="contained" color="primary" className={classes.submit} type='submit' fullWidth>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </Button>

          {/* check if has account or not  */}
          <Grid>
            <Grid item >
              <Button variant="contained" color="secondary"  fullWidth  onClick={switchMode}>
                {isSignUp ? 'Already have account? Sign In' : "Don't have account? sign Up"}
              </Button>
            </Grid>
          </Grid>
          {/* //TODO */}
          {/* <div style={myStyle}>
            <GoogleLogin onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy='single_host_origin' />
          </div> */}
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
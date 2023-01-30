import React,{useState,useEffect} from 'react';
import {Button,Typography,Paper,TextField } from '@material-ui/core';
import useStyles from './styles'
import FileBase from 'react-file-base64';
import { useDispatch,useSelector } from 'react-redux';
import { createPost , updatePost } from '../../actions/postsAction';
import { useLocation } from 'react-router-dom';
function Form({currentId,setCurrentId}){
    const classes = useStyles();
    const [postData,setPostData] = useState({title:'',message:'',tags:'',selectedFile:'' });
    const dispatch = useDispatch();
    const post = useSelector((state)=> currentId ? state.posts.posts.find((p)=>p._id === currentId): null);
    const user = JSON.parse(localStorage.getItem('profile'));
    const location = useLocation();
    useEffect(()=>{
        if(post) setPostData(post)
    },[location,post]);
    
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(currentId===null){

            dispatch(createPost({...postData,name: user?.result?.name}));

        }else{
            dispatch(updatePost(currentId,{...postData,name: user?.result?.name}))
        }
        clear();
    }
  
    const changeData= (event)=>{
        const {name,value} = event.target;
        setPostData((prevData)=>({
            ...prevData,
            [name]:name==='tags'? value.split(',') : value
        }))
    }
   const clear = ()=> {
        setCurrentId(null);
        setPostData({title:'',message:'',tags:'',selectedFile:''});
    }
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper} >
                <Typography variant="h6" align='center' >
                    Please Sign In to create Your own memories and like other's memories.
                </Typography>
            </Paper>
        )
    }
    return(
        <Paper className={classes.paper}>
            <form onSubmit={handleSubmit} autoComplete="off"  noValidate className={classes.form} >
                <Typography variant='h6'>{currentId?'Editing':'Creating'} a Memory</Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={changeData}  style={{margin:'5px'}} />
                <TextField name='message' variant='outlined' label='Message' fullWidth  multiline value={postData.message} onChange={changeData}   style={{margin:'5px'}}/>
                <TextField name='tags' variant='outlined' label='Tags (coma seprated)' fullWidth  value={postData.tags} onChange={changeData}  style={{margin:'5px'}} />
                
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})} />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size="large" fullWidth type="submit">Submit</Button>
                <Button variant='contained' color='secondary' size="small" fullWidth onClick={clear} >Clear</Button>
            </form>

        </Paper>
    );
}

export default Form;
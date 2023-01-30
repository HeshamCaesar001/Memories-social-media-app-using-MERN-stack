import React ,{useEffect,useState}from 'react';
import {Container,Grow,Grid,Paper,AppBar,TextField,Button} from '@material-ui/core';
import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/Posts';
import { useDispatch } from 'react-redux';
import { getPosts , getPostBySearch } from '../../actions/postsAction';
import Paginate from '../Pagination';
import { useLocation,useNavigate } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import useStyles from './styles';
function useQuery(){
    return new URLSearchParams(useLocation().search)
}
const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const query = useQuery();
    const page = query.get('page') ||1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles(); 

    const [currentId,setCurrentId] = useState(null);
    const [search,setSearch] = useState('')
    const [tags,setTags] = useState([])
    

    
    function searching(e){
        setSearch(e.target.value);
    }
    function handleKeyPress(e){
        if(e.keyCode === 13){
            searchPost();
        }
    }
    function addTag(tag){
        setTags([...tags,tag])
    }
    function deleteTag(tagToDelete){
        setTags(tags.filter((tag)=> tag !== tagToDelete));
    }
    function searchPost (){
        if(search.trim()||tags){
            dispatch(getPostBySearch({search , tags:tags.join(',')}));
            navigate(`/posts/search?search=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
            navigate('/')
        }
    }
  return (
    <Grow in>
    <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems='stretch' spacing={3} className={classes.gridContainer} >
            <Grid item xs={12} sm={6}  md={9} >
                <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
                <AppBar position="static" color="inherit"className={classes.appBarSearch}  >
                  <TextField
                    name="search"
                    label="Search Memories"
                    value={search}
                    onChange={searching}
                    variant='outlined'
                    fullWidth
                    onKeyPress={handleKeyPress}
                  />
                  <ChipInput style={{margin:"10px 0"}} value={tags} onAdd={addTag} onDelete={deleteTag} label="Search Tags" variant='outlined'/>
                   <Button variant="contained" color="primary" onClick={searchPost}  >
                     Search
                   </Button> 
                </AppBar>
                <Form currentId = {currentId} setCurrentId={setCurrentId} />
                <Paper elevation={6}  >
                    <Paginate page={page} />
                </Paper>
            </Grid>
        </Grid>
    </Container>
</Grow>
  )
}

export default Home
import express from "express";
import {getPostsBySearch,getPosts,createPost,updatePost,deletePost,likePost} from "../controllers/PostController.js";
import auth from "../middlerware/authMiddlerware.js";
const router = express.Router();

router.get('/',getPosts);
router.get('/search',getPostsBySearch);
router.post('/',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)
export default router;
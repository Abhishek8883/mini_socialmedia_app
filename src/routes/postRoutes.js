const router = require('express').Router();
const {auth} = require('../middlewares/auth')
const {upload} = require('../middlewares/multer')

const {
    createPost,
    deletePost,
    editPostPage,
    editPost,
    createComment,
    deleteComment,
    editComment,
    editCommentPage
} = require('../controllers/postController')


/**
* @desc creates Post
* @route POST /api/v1/post/create
* @access private   
*/
router.post('/create',[auth,upload.single('image')],createPost)


/**
* @desc delete Post
* @route get /api/v1/post/delete
* @access private   
*/
router.get('/delete/:postid',auth,deletePost)


/**
* @desc shows form to edit post
* @route get /api/v1/post/edit
* @access private   
*/
router.get('/edit/:postid',auth,editPostPage)

/**
* @desc edit post
* @route POST /api/v1/post/editPost/:postid
* @access private   
*/
router.post('/editPost/:postid',[auth,upload.single('image')],editPost)

/**
* @desc create comment
* @route get /api/v1/post/createComment
* @access private   
*/
router.post('/createComment/:postid',auth,createComment)
/**
* @desc create comment
* @route get /api/v1/post/createComment
* @access private   
*/
router.get('/deleteComment/:commentid',auth,deleteComment)


/**
* @desc get edit comment page
* @route get /api/v1/post/editCommentPage/:commentid
* @access private   
*/
router.get('/editCommentPage/:commentid',auth,editCommentPage)


/**
* @desc  edit comment 
* @route get /api/v1/post/editComment/:commentid
* @access private   
*/
router.post('/editComment/:commentid',auth,editComment)



module.exports = router 
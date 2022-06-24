const router = require('express').Router();
const {auth} = require('../middlewares/auth')



const {
    getHomepage,
    createUser,
    login,
    logout,
    getProfilePage,
    getLoginPage
} = require('../controllers/userController')


/**
 * @desc Opens the user homepage
 * @route GET /api/v1/user/home
 * @access Public   
 */
router.get('/home',auth, getHomepage)


/**
 * @desc Opens the user login page
 * @route GET /api/v1/user
 * @access Public   
 */
router.get('/', getLoginPage)

/**
 * @desc creates user
 * @route GET /api/v1/user/create
 * @access private   
 */
router.post('/create',createUser)

/**
 * @desc Opens the user profile page
 * @route GET /api/v1/user/profile
 * @access Public   
 */
 router.get('/profile',auth, getProfilePage)


/**
* @desc login
* @route POST /api/v1/user/login
* @access private   
*/
router.post('/login', login)



/**
* @desc Opens the user homepage
* @route GET /api/v1/user/logout
* @access Public   
*/
router.get('/logout', logout)


module.exports = router;

const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    logout,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser

} = require('../controllers/authController');


const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.post('/register', (req, res) => registerUser(req,res));

router.post('/login', (req, res) => loginUser(req,res));
router.post('/password/forgot', (req, res) => forgotPassword(req,res));
router.put('/password/reset/:token', (req, res) => resetPassword(req,res));
router.get('/logout', (req, res) => logout(req,res));

router.get('/me', isAuthenticatedUser, (req, res) => getUserProfile(req,res));
router.put('/password/update', isAuthenticatedUser, (req, res) => updatePassword(req,res));
router.put('/me/update', isAuthenticatedUser, (req, res) => updateProfile(req,res));

router.get('/admin/users', isAuthenticatedUser, authorizeRoles('admin'), (req, res) => allUsers(req,res));

router.get('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), (req, res) => getUserDetails(req,res));
router.put('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), (req, res) => updateUser(req,res));
router.delete('/admin/user/:id', isAuthenticatedUser, authorizeRoles('admin'), (req, res) => deleteUser(req,res));

module.exports = router;
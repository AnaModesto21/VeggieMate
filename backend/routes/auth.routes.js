const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

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


const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.post("/register", (req, res) => registerUser(req,res));
router.post("/login", (req, res) => loginUser(req,res));

router.post("/password/forgot", (req, res) => forgotPassword(req,res));
router.put("/password/reset/:token", (req, res) => resetPassword(req,res));

router.get("/logout", (req, res) => logout(req,res));

router.get("/me", (req, res) => (isAuthenticatedUser, getUserProfile)(req,res));
router.get("/password/update", (req, res) => (isAuthenticatedUser, updatePassword)(req,res));
router.get("/me/update", (req, res) => (isAuthenticatedUser, updateProfile)(req,res));

router.get("/admin/users", (req, res) => (isAuthenticatedUser, authorizeRoles('admin'), allUsers) (req,res));

router.get("/admin/user/:id", (req, res) => (isAuthenticatedUser, authorizeRoles('admin'), getUserDetails) (req,res));
router.get("/admin/user/:id", (req, res) => (isAuthenticatedUser, authorizeRoles('admin'), updateUser) (req,res));
router.get("/admin/user/:id", (req, res) => (isAuthenticatedUser, authorizeRoles('admin'), deleteUser) (req,res));

// router.post("/signup", async (req, res) => {
//     try {
//         const { email, password, username } = req.body;

//         if (!email || !password || !username) {
//             res.status(400).json({ message: "missing fields" });
//             return;
//         }

//         const foundUser = await User.findOne({ username });
//         if (foundUser) {
//             res.status(400).json({ message: "user already exists" });
//             return;
//         }

//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(password, salt);

//         const createdUser = await User.create({ email, username, password: hashedPassword });

//         res.status(200).json({ email: createdUser.email, username: createdUser.username, _id: createdUser._id });
//     }

//     catch (e) {
//         res.status(500).json({ message: e.message })
//     }
// });

// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         res.status(400).json({ message: "missing fields" })
//         return;
//     }

//     const foundUser = await User.findOne({ username });
//     if (!foundUser) {
//         res.status(401).json({ message: "invalid login" });
//         return;
//     }

//     const correctPassword = bcrypt.compareSync(password, foundUser.password);

//     if (!correctPassword) {
//         res.status(401).json({ message: "invalid login" });
//         return;
//     }

//     //delete foundUser.password;
//     const authToken = jwt.sign(
//         { _id: foundUser._id, email: foundUser.email, username: foundUser.username },
//         process.env.TOKEN_SECRET,
//         { algorithm: "HS256", expiresIn: "6h" }
//     )

//     res.status(200).json({ authToken });



// });


// router.get("/verify", isAuthenticated, (req, res) => { 
// res.status(200).json(req.payload)
// });

module.exports = router;
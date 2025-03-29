const express = require('express');

const router = express.Router()

const userRegisterController= require('../controller/userRegister');
const userLoginController = require('../controller/userLogin');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');
const createBlog = require('../controller/createBlog');
const blogDetailsController = require('../controller/blogDetails');
const blogUser = require('../controller/blogUser');
const aboutusDetails = require('../controller/aboutusDetails');
const addJob = require('../controller/addJob');
const deleteJob = require('../controller/deleteJob');
const jobDetailsController = require('../controller/jobDetails');
const allUsers = require('../controller/allUsers');
const updateUser = require('../controller/updateUser');
const allQueries = require('../controller/allQueries');

router.post("/Register",userRegisterController);
router.post("/Login",userLoginController);
router.get("/user-details",authToken,userDetailsController);
router.get("/userLogout",userLogout);
router.post("/create-blog",createBlog);
router.get("/blogdetails",blogDetailsController);
router.get("/blog-user",blogUser);
router.post("/aboutusdetail",aboutusDetails);
router.post("/addjob",addJob);
router.post("/deletejob",deleteJob);
router.get("/jobdetails",jobDetailsController);
router.get("/AllUser",allUsers);
router.get("/UpdateUser",updateUser);
router.get("/AllQueries",allQueries);




module.exports = router;
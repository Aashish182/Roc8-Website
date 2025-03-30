
const backendDomain = "http://localhost:8080";

const SummaryApi = {
    register :{
        url: `${backendDomain}/api/Register`,
        method : "post"
    },
    login :{
        url: `${backendDomain}/api/Login`,
        method : "post"
    },
    current_user :{
        url: `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user :{
        url: `${backendDomain}/api/userLogout`,
        method : "get"
    },
    createBlog :{
        url: `${backendDomain}/api/create-blog`,
        method : "post"
    },
    bloguser :{
        url: `${backendDomain}/api/blog-user`,
        method : "post"
    },
    blogDetails :{
        url: `${backendDomain}/api/blogdetails`,
        method : "get"
    },
    salaryDetails :{
        url: `${backendDomain}/api/salarydetails`,
        method : "post"
    },
    aboutusDetail :{
        url: `${backendDomain}/api/aboutusdetail`,
        method : "post"
    },
    addJob :{
        url: `${backendDomain}/api/addjob`,
        method : "post"
    },
    DeleteJob :{
        url: `${backendDomain}/api/deletejob`,
        method : "post"
    },
    jobDetails :{
        url: `${backendDomain}/api/jobdetails`,
        method : "get"
    },
    allUser :{
        url: `${backendDomain}/api/AllUser`,
        method : "get"
    },
    updateUser :{
        url: `${backendDomain}/api/UpdateUser`,
        method : "get"
    },
    allQueries :{
        url: `${backendDomain}/api/AllQueries`,
        method : "get"
    },
    viewblogDetails :{
        url: `${backendDomain}/api/ViewblogDetails`,
        method : "post"
    },
}


export default SummaryApi;

import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import Context from './context';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserDetails } from './store/userSlice';
import Blog from './pages/Blog';
import Aboutus from './pages/Aboutus';
import Services from './pages/Services';
import CareerInsights from './components/CareerInsights';
import JobTrends from './components/JobTrends';
import AdminPanel from './pages/AdminPanel';
import AllUsers from './components/AllUsers';
import AllQueries from './components/AllQueries';
import AllBlogs from './components/AllBlogs';
import ViewBlog from './components/ViewBlog';
import ViewQuery from './components/ViewQuery';
import AllJobTrends from './components/AllJobTrends';
import Profile from './pages/Profile';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserDetails()); 
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/Home',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/Login',
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: '/Register',
      element: (
        <>
          <Navbar />
          <Register />
        </>
      ),
    },
    {
      path: '/Blog',
      element: (
        <>
          <Navbar />
          <Blog />
        </>
      ),
    },
    {
      path: '/Aboutus',
      element: (
        <>
          <Navbar />
          <Aboutus />
        </>
      ),
    },
    {
      path: '/Services',
      element: (
        <>
          <Navbar />
          <Services />
        </>
      ),
    },
    {
      path: '/CareerInsights',
      element: (
        <>
          <Navbar />
          <CareerInsights />
        </>
      ),
    },
    {
      path: '/JobTrends',
      element: (
        <>
          <Navbar />
          <JobTrends />
        </>
      ),
    },
    {
      path: '/Profile',
      element: (
        <>
          <Navbar />
          <Profile />
        </>
      ),
    },
    {
      path: '/ForgotPassword',
      element: (
        <>
          <Navbar />
          <ForgotPassword />
        </>
      ),
    },
    {
      path: '/ViewBlog/:id',
      element: (
        <>
          <Navbar />
          <ViewBlog />
        </>
      ),
    },
    {
      path: '/ViewQuery/:id',
      element: (
        <>
          <Navbar />
          <ViewQuery />
        </>
      ),
    },
    {
      path:"/AdminPanel",
      element:<><Navbar /><AdminPanel/></>,
      children:[
        {
          path:"AllUsers",
          element:<AllUsers/>
        },
        {
          path:"AllBlogs",
          element:<AllBlogs/>
        },
        {
          path:"AllQueries",
          element:<AllQueries/>
        },
        {
          path:"AllJobTrends",
          element:<AllJobTrends/>
        }
      ]
    },
  ]);

  return (
    <>
      <Context.Provider value={{fetchUserDetails}}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Context.Provider>
    </>
  );
}

export default App;

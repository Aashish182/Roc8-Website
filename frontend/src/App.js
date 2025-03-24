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

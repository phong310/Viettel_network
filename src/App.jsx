import AdminPage from './components/Admin/AdminPage';
import { Login } from './components/Login';
import HomePage from './components/Page/HomePage'
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Register } from './components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import DataPage from './components/Admin/DataPage';
function App() {
  const navigate = useNavigate();
  const dataUser = useSelector((state) => state.auth.login?.currentUser)

  useEffect(() => {
    if (!dataUser && window.location.pathname === "/admin") {
      navigate('/login');
    }
  }, [dataUser, navigate])



  return (
    <>
      <ToastContainer autoClose={1500} theme="colored" />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        {dataUser && <Route path='/admin/*' element={<AdminPage />} />}
      </Routes>
    </>


  )
}

export default App

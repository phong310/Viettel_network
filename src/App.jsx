import AdminPage from './components/Admin/AdminPage';
import { Login } from './components/Login';
import HomePage from './components/Page/HomePage'
import { Route, Routes } from 'react-router-dom';
import { Register } from './components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css'

function App() {

  return (
    <>
      <ToastContainer autoClose={1500} theme="colored" />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>
    </>


  )
}

export default App

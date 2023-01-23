
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './booking/Home';
import Topnav from './components/Topnav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
   <Topnav />
   <ToastContainer />
    <Routes>
        <Route index element={<App />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='home' element={<Home />} />
    </Routes>
</BrowserRouter>
  );
}

export default App;

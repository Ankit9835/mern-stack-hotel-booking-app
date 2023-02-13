
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './booking/Home';
import Topnav from './components/Topnav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './user/Dashboard';
import DashboardSeller from './user/DashboardSeller';
import NewHotel from './hotels/NewHotel';
import StripeCallBack from './stripe/StripeCallBack';
import EditHotel from './hotels/EditHotel';
import ViewHotel from './hotels/ViewHotel';


function App() {
  return (
    <BrowserRouter>
   <Topnav />
   <ToastContainer />
    <Routes>
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='home' element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path='dashboard' element={<ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>} />
        <Route path='dashboard/seller' element={<ProtectedRoute>
          <DashboardSeller />
        </ProtectedRoute>} />
        <Route path='hotels/new' element={<ProtectedRoute>
          <NewHotel />
        </ProtectedRoute>} />
        <Route path='stripe/callback' element={<ProtectedRoute>
          <StripeCallBack />
        </ProtectedRoute>} />
        <Route path='hotel/edit/:hotelId' element={<ProtectedRoute>
          <EditHotel />
        </ProtectedRoute>} />
        <Route path='view/hotel/:hotelId' element={<ProtectedRoute>
          <ViewHotel />
        </ProtectedRoute>} />
    </Routes>
</BrowserRouter>
  );
}

export default App;

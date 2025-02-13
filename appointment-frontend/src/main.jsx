import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/Login';
import Home from './pages/Home';
import MyAppointments from './pages/MyAppointments';
import ProtectedRoute from './components/ProtectedRoute';
import BookAppointment from './pages/BookAppointment';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import AdminProtectedRoute from './pages/AdminProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
              <Route path='/home' element={<Home />} />
              <Route path="my-appointments" element={<MyAppointments />} />
              <Route path="book-appointment" element={<BookAppointment />} />
            </Route>
          
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminPanel />} />
          </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
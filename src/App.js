import React from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './contexts/AuthContext';
import Navigation from './Components/Navigation';
import Home from './Components/Home/Home';
import Todos from './Components/Todos/Todos';
import Categories from './Components/Categories/Categories';
import Login from './Components/Auth/Login';
import NotFound from './Components/NotFound';
import Footer from './Components/Footer';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/todos' element={<ProtectedRoute><Todos /></ProtectedRoute>} />
            <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;

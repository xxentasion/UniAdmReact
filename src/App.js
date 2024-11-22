import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Login from './pages/Login';
import Courses from './pages/Courses';
import Applications from './pages/Applications';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import Faculties from './pages/Faculties';
import Student from './pages/Student';
import ApplicationForm from './components/ApplicationForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Страница входа */}
          <Route path="/login" element={<Login />} />

          {/* Защищенный маршрут */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Applications />} />
            <Route path="programs" element={<Courses />} />
            <Route path="faculties" element={<Faculties />} />
            <Route path='new-application' element={<ApplicationForm />} />
            <Route path="profile" element={<Profile />} />
            <Route path="students/:studentId" element={<Student />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

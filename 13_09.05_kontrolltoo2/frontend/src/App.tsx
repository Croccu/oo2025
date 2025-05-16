import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import UserDetail from './pages/UserDetail';
import UserForm from './pages/UserForm';
import LoginPage from './pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<MainPage />} />
        <Route path="/new" element={<UserForm />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
};

export default App;

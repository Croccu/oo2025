import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import WordDetail from './pages/WordDetail';
import EditWord from './pages/EditWord';
import Managers from './pages/Managers';
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/word/:id" element={<WordDetail />} />
        <Route path="/word/edit/:id" element={<EditWord />} />
        <Route path="/managers" element={<Managers />} />
      </Routes>
    </Router>
  );
}

export default App;

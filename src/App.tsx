import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ListPage from './pages/ListPage';
import ArticlePage from './pages/ArticlePage';
import DoomPage from './pages/DoomPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container"> 
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/article" element={<ListPage />} /> 
            <Route path="/doom" element={<DoomPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
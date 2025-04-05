import logo from './logo.svg';
import './App.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EmailProvider } from './Components/Utils/EmailContext';

function App() {
  return (
    <EmailProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} /> {/* Default route to login */}
      </Routes>
    </Router>
    </EmailProvider>
  );
}

export default App;

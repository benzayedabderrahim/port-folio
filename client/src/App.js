import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Contact from './contact';

function App() {
  return (
    <div className="App">
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contactme' element={<Contact />} />
    </Routes>
  </Router>
    </div>
  );
}

export default App;

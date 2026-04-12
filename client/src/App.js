import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Contact from './contact';
import CurrencyConverter from './convertor';
import WeatherApp from './weather';

function App() {
  return (
    <div className="App">
  <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/contacting' element={<Contact />} />
      <Route path='/currency-converter' element={<CurrencyConverter />} />
    </Routes>
  </Router>
    </div>
  );
}

export default App;

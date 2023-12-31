import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

function App() {
  return (
    <>
      <Router>
        <div>
          <Header/>
          <Routes>
            <Route path='/' element={<Dashboard /> } />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

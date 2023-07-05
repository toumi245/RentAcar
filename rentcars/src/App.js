import './App.css';
import { BrowserRouter as Router, Route, Routes ,Redirect, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
function App() {


  return (
<div>

<Router>

  <Routes>
    
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register/>} />
    <Route path='/booking/:carid' element={<BookingCar/>} />
  </Routes>
</Router>
</div>
  );
}

export default App;

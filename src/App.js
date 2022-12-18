import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import Auth from './pages/Auth/Auth';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Auth/>}
        />
        <Route
          path="/home"
          element={<Home/>}
        />

      </Routes>
      


      {/* <Auth/> */}
      
    </>
  );
}

export default App;

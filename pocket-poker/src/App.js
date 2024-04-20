import './App.css';
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import SB from './pages/SB';
import Report from './pages/Report'

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path ="/" element={<Home />}/>
          <Route path ="/Login" element={<Login />}/>
          <Route path ="/Register" element={<Register />}/>
          <Route path ="/SB" element={<SB />}/>
          <Route path ="/Report" element={<Report />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

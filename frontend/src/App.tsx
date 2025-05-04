import './App.css';
import Navbar from './components/layout/NavBar';
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <div className="App">
    <Navbar />
    <ToastContainer />
  <div className="container">
  <Outlet />
  </div>
  </div>
  );
};

export default App;
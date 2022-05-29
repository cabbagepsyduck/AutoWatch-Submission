import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Price from "./components/Price";


var sectionStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL + 'assets/background.jpg'})`
}

function App() {
  return (
    <div className="container-fluid">
      <div style= {sectionStyle}  class="overlay">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/price" element={<Price/>} />


        </Routes>
      </Router>
      </div>
    </div>
  );
}

export default App;

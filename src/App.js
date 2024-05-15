import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Login/Register/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { useEffect, useState } from "react";

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/" element={<PrivateRoute />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

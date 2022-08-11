import { Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './dashboard/Dashboard';
import SignInSide from "./pages/SignInSide";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/SignIn" element={<SignInSide />} />
        <Route path="/Dashboard" element={<Dashboard selectedItem="Dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;

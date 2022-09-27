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
        <Route path="/Test" element={<Dashboard selectedItem="Test" />} />
        <Route path="/Problems" element={<Dashboard selectedItem="Problems" />} />
        <Route path="/Problems/Create" element={<Dashboard selectedItem="Problems" />} />
        <Route path={`/Problems/:pid`} element={<Dashboard selectedItem="Problems" />} />
      </Routes>
    </div>
  );
}

export default App;

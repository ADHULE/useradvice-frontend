import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./assets/components/Homepage/Navbar";
import Login from "./assets/components/Login/Login";
import Homepage from "./assets/components/Mainpage/HomePage";
import Basegames from "./assets/components/BaseGames/Basegames";
import Register from "./assets/components/Register/Register";


const App = () => {
  return (
    <Router>
      <MainLayout /> {/* Renders the MainLayout component */}
    </Router>
  );
};

// Separate function to handle Navbar visibility
const MainLayout = () => {
  const location = useLocation(); // ✅ Gets the current route path

  return (
    <div>
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route page="/Register" element={<Register/>}/>
        <Route path="/game/:id" element={<Basegames />} />
      </Routes>

    </div>
  );
};

export default App;

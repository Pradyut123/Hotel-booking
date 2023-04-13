import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import HotelList from './pages/hotelList/HotelList';
import SingleHotel from './pages/singleHotel.js/SingleHotel';
import Login from "./pages/login/Login";

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/hotels" element={<HotelList />} />
    <Route path="/singlehotel/:id" element={<SingleHotel />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;

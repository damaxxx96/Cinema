import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Repertoire from "./pages/Repertoire/Repertoire";
import Home from "./pages/Home/Home";
import Movie from "./pages/Movie/Movie";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";

const App: React.FC = () => {
  const [user, setUser] = useState<string>("");

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/repertoire/venue/:venueId" element={<Repertoire />} />
          <Route path="/repertoire/movie/:movieId" element={<Movie />} />
          <Route
            path="/login/"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route path="/admin/" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

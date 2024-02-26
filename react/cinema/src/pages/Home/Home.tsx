import React from "react";
import "./Home.css";
import myImage from "../../assets/123.jpg";
import myImage2 from "../../assets/321.jpg";
import myImage3 from "../../assets/3131.jpg";

import { Link } from "react-router-dom";
interface HomeProps {
  user: string;
}
const Home = ({ user }: HomeProps) => {
  return (
    <div className="home">
      <div className="loginwrapper">
        {user === "" ? (
          <Link to="/login">
            <button className="buttonlogin">Login</button>
          </Link>
        ) : (
          user && (
            <>
              <Link to="/admin">
                <button className="buttonadmin">Admin</button>
              </Link>
              <span> {user}</span>
            </>
          )
        )}
      </div>
      <h1 className="home__header">WELCOME TO CINEDAMAX</h1>
      <div className="container">
        <Link to="/repertoire/venue/1" className="box">
          Venue 1
          <img src={myImage} alt="Venue 1" />
        </Link>

        <Link to="/repertoire/venue/2" className="box">
          Venue 2
          <img src={myImage2} alt="Venue 2" />
        </Link>

        <Link to="/repertoire/venue/3" className="box">
          Venue 3
          <img src={myImage3} alt="Venue 3" />
        </Link>
      </div>
    </div>
  );
};

export default Home;

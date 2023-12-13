import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header id="header">
            <h1>webs ai</h1>
            <div className="left">
                <nav className="nav">
                    <ul>
                        <li>
                            {" "}
                            <Link to={"/"}>home</Link>{" "}
                        </li>
                        <li>
                            {" "}
                            <Link to={"/list"}>list</Link>{" "}
                        </li>
                        <li>
                            {" "}
                            <Link to={"/write"}>write</Link>{" "}
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="right">
                <ul className="login__menu">
                    <li>
                        {" "}
                        <Link to={"/login"}>login</Link>{" "}
                    </li>
                    <li>
                        {" "}
                        <Link to={"/logout"}>logout</Link>{" "}
                    </li>
                    <li>
                        {" "}
                        <Link to={"/join"}>sign</Link>{" "}
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;

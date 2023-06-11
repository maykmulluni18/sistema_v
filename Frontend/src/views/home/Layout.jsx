import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./everybody.scss"
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "./auth/Authen"
const Layout = ({ children }) => {

    return (
        <React.Fragment>
            <div className="home">
                <Sidebar />
                <div className="homecontainer">
                    <Navbar />
                    <div className="Con">
                        <main>{children}</main>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout;
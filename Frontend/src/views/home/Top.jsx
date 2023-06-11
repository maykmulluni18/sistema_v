import React from "react";
import './everybody.scss'
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "./auth/Authen";
const Top = () => {
    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder="Search      " />
                    <SearchOutlinedIcon className="icons" />
                </div>
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className="icon" />
                        Lenguaje
                    </div>
                    <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon" />
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <img
                            src="https://data.whicdn.com/images/356814382/original.jpg"
                            alt=""
                            className="userimg"
                        />
                        Admin
                    </div>
                    <div className="item">
                        <LogoutRoundedIcon
                            //onClick={logout}
                            className="icons"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Top;
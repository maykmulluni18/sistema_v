import React from "react";
import { useSelector } from "react-redux";
import "./everybody.scss";
import "./welcome.css"
const Welcome = () => {
    const { user } = useSelector((state) => state.auth);
    console.log(process.env.RACT_APP_ENV)
    return (
        <div className="Container">
            <div className="listtitle">
               <h1> Bienvenido al Sub - Almacen central </h1> 
            </div>
            <div className="listtitle_1">
                <p><strong>{user && user.nombre}</strong></p> 
            </div>
        </div>
        
    )
}

export default Welcome;

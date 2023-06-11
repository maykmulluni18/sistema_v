import { Link } from "react-router-dom"
import "./notfound404.scss"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../auth/Authen"
import React, { useEffect } from 'react';

const Not_found_404 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError } = useSelector((state) => state.auth);


    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);


    useEffect(() => {
        if (isError) {
            navigate("/");
        }
    }, [isError, navigate]);

    return (

        <div className="not">
            {/*<div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>*/}
            <div className="esfera">
                <div className="refelction"></div>
                <div className="inner-glow"></div>
                <div className="outer-shadow"></div>
            </div>
            <div className="esfera">
                <div className="refelction"></div>
                <div className="inner-glow"></div>
                <div className="outer-shadow"></div>
            </div>
            <div className="esfera">
                <div className="refelction"></div>
                <div className="inner-glow"></div>
                <div className="outer-shadow"></div>
            </div>
            <div className="esfera">
                <div className="refelction"></div>
                <div className="inner-glow"></div>
                <div className="outer-shadow"></div>
            </div>



            <div className="main">
                <h1>404</h1>
                <p>Surguio un Problema Pagina No encontrada.</p>
                <Link to={'../home'}>
                    <button type="button">Go back</button>
                </Link>
            </div>
        </div>
    )
}

export default Not_found_404

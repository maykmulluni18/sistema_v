import React, { useState, useEffect } from 'react';
import Layout from "../../../../Layout";
import CrearNeasEntradas_cont from './CrearNeasEntradas_cont';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../../auth/Authen"

const CrearNeasEntradas = () => {
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

    return(
        <Layout>
            <CrearNeasEntradas_cont />
        </Layout>
    )
}

export default CrearNeasEntradas

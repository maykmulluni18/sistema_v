import React, { useState, useEffect } from 'react';
import Layout from "../../../../Layout";
import CrearPecosaBienes_cont from './CrearPecosaBienes_cont';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../../auth/Authen"

const CrearPecosaBienes = () => {
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
            <CrearPecosaBienes_cont/>
        </Layout>
    )
}

export default CrearPecosaBienes

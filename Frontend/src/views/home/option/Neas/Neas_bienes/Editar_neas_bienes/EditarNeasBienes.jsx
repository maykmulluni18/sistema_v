import React, { useState, useEffect } from 'react';
import Layout from "../../../../Layout";
import EditarNeasBienes_cont from './EditarNeasBienes_cont';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../../auth/Authen"

const EditarNeasBienes = () => {
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
        <Layout>
            <EditarNeasBienes_cont />
        </Layout>
    )
}

export default EditarNeasBienes

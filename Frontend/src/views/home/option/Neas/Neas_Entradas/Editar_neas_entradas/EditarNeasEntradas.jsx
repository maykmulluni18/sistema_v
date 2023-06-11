import React, { useState, useEffect } from 'react';
import Layout from "../../../../Layout";
import EditarNeasEntradas_cont from './EditarNeasEntradas_cont';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../../auth/Authen"

const EditarNeasEntradas = () => {
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
            <EditarNeasEntradas_cont />
        </Layout>
    )
}

export default EditarNeasEntradas

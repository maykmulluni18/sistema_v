import Layout from "../../../../Layout";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../../auth/Authen"
import DetallesPecosa_cont from "./DetalesPecosa_cont";

const  DetalesPecosa = () => {
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
            <DetallesPecosa_cont />
        </Layout>
    )
}

export default DetalesPecosa


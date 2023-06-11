import React, { useState, useEffect } from 'react';
import Layout from "../../../../Layout";
import PdfNeas_cont from './PdfNeas_cont';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../../auth/Authen"

const PdfNeas = () => {
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
            <PdfNeas_cont />
        </Layout>
    )
}

export default PdfNeas

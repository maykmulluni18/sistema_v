import React, { useState, useEffect } from 'react';
import Layout from "../../../Layout";
import CreateSedes_cont from './CreateSedes_cont';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../auth/Authen"

const CreateSedes = () => {
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
            <CreateSedes_cont />
        </Layout>
    )
}

export default CreateSedes

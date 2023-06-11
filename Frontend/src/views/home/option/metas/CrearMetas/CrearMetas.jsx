import React, { useEffect } from 'react';
import Layout from "../../../Layout";
import CrearMetas_cont from './CrearMetas_cont';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../auth/Authen"

const CrearMetas = () => {
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
            <CrearMetas_cont />
        </Layout>
    )
}

export default CrearMetas

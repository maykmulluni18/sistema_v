import React, { useEffect } from 'react';
import Layout from "../../../Layout";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../auth/Authen"
import Con_MetasExcel from './Con_MetasExcel';

const ImportBienesExcel = () => {
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
            <Con_MetasExcel />
        </Layout>
    )
}

export default ImportBienesExcel

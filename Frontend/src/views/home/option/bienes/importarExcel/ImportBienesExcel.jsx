import React, { useEffect } from 'react';
import Layout from "../../../Layout";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../auth/Authen"
import ImportBienesExcel_cont from './ImportBienesExcel_cont';

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
            <ImportBienesExcel_cont />
        </Layout>
    )
}

export default ImportBienesExcel

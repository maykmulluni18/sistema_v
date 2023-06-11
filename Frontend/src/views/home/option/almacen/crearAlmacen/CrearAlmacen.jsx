import React, { useEffect } from 'react';
import Layout from "../../../Layout";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../auth/Authen"
import CrearAlmacen_cont from './CrearAlmacen_cont';

const CrearAlmacen = () => {
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
            <CrearAlmacen_cont />
        </Layout>
    )
}
export default CrearAlmacen

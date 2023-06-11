import React, { useEffect } from 'react';
import Layout from "../../../Layout";
import CrearInventariado_con from './CrearInventariado_con';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../../auth/Authen"

const CreatedInventarido = () => {
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
            <CrearInventariado_con />
        </Layout>
    )
}

export default CreatedInventarido

import React, { useEffect } from 'react';
import "./tabladata.scss"
import TableData from "./TableData";
import Layout from "../../Layout";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../auth/Authen"

const Listinfo = () => {
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
            <TableData />
        </Layout>
    )
}

export default Listinfo;


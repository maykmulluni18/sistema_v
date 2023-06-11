import "./tableB.scss"
import TableData from "./Table";
import Layout from "../../Layout";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../../auth/Authen"
import React, { useEffect } from 'react';

const Listinfobienes = () => {

    return (
        <Layout>
            <TableData />
        </Layout>
    )
}

export default Listinfobienes


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';

const URI3 = DB_URL + 'neasbienes/'

export const FilterNea_des = () => {

    const [bienes, setBienes] = useState([])
    const getBienes = async () => {
        const res = await axios.get(URI3)
        setBienes(res.data.reverse())
    }
    useEffect(() => {
        getBienes()
    }, [])

    return(
        <>
        {
            bienes.map(res =>
                <option key={res.id} value={res.id}>{res.biene.description}</option>)
        }
        </>
    )
}
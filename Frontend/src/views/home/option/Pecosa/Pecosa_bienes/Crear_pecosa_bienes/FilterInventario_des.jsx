import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';

const URI2 = DB_URL + 'invetinicial/'

export const FilterInventario_des = () => {

    const [bienes, setBienes] = useState([])
    const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data.reverse())
    }
    useEffect(() => {
        getBienes()
    }, [])

    return(
        <>
        {
            bienes.map(res =>
                <option key={res.id} value={res.id}> {res.biene.description} </option>)
        }
        </>
    )
}
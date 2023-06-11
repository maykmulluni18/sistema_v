import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';

const URI3 = DB_URL + 'neasbienes/'

export const Filter_Obs_Nea = () => {

    const [neasbien, setNeasdBieneId] = useState([])

    const getNeasBien = async () => {
        const res = await axios.get(URI3)
        setNeasdBieneId(res.data)
    }

    useEffect(() => {
        getNeasBien()
    }, [])

    return(
        <>
        {
            neasbien.map(res =>
                <option key={res.id} value={res.id}> NEA {res.neaEntradaId} -- [ Stock: {res.cantidad} ]</option>)
        }
        </>
    )
}
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';
const URI1 = DB_URL + 'bienes/'

const EditFilterDescBien = () => {

    const [bienes, setBienes] = useState([])
    const getBienes = async () => {
        const res = await axios.get(URI1)
        setBienes(res.data.reverse())
    }
    useEffect(() => {
        getBienes()
    }, [])

    return(
        <>
        {
            bienes.map(res =>
                <option key={res.id} value={res.id}> {res.description} </option>)
        }
        </>
    )
}

export default React.memo(EditFilterDescBien)

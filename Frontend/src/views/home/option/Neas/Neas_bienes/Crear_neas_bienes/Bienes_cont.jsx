import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';
import "./datalist.scss"
const URI1 = DB_URL + 'bienes/'

const Bienes_Cont = () => {
    const [bienes, setBienes] = useState([])
    const getBienes = async () => {
        const res = await axios.get(URI1)
        setBienes(res.data.reverse())
    }
    useEffect(() => {
        getBienes()
    }, [])
    return(
        <datalist className='datalistt' id="dataBB">
            {
                bienes
                    .map(res => {
                        return (
                            <option className='options' key={res.id} value={res.id}>
                               {res.item} - {res.description}
                            </option>
                        )
                    })
            }
        </datalist>
    )
}

export default React.memo(Bienes_Cont)

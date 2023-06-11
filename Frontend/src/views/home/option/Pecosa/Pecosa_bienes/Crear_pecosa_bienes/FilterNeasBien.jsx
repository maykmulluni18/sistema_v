import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';

const URI3 = DB_URL + 'neasbienes/'

const FilterNeasBien = () => {

    const [neasbien, setBienes] = useState([])
    const getBienes = async () => {
        const res = await axios.get(URI3)
        setBienes(res.data.reverse())
    }
    useEffect(() => {
        getBienes()
    }, [])

    return (
        <>
            <datalist id="bienesn">
                {
                    neasbien
                        .map(res => {
                            return (
                                <option key={res.id} value={res.id}>[ Stock= {res.cantidad} ] -- [ {res.biene.description}] </option>
                            )
                        })
                }

            </datalist>
        </>
    )
}
export default React.memo(FilterNeasBien)


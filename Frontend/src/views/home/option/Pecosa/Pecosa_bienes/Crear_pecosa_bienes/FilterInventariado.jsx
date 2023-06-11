import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';

const URI2 = DB_URL + 'invetinicial/'

const FilterInventariado = () => {

    const [bienes, setBienes] = useState([])
    const getBienes = async () => {
        const res = await axios.get(URI2)
        setBienes(res.data.reverse())
    }
    useEffect(() => {
        getBienes()
    }, [])

    return (
        <>

            <datalist id="bienesp">
                {
                    bienes
                        .map(res => {
                            return (
                                <option key={res.id} value={res.id}>[ Stock = {res.cantidad} ]
                                 -- [ {res.biene.description} ] </option>
                            )
                        })
                }

            </datalist>

        </>
    )
}
export default React.memo(FilterInventariado)


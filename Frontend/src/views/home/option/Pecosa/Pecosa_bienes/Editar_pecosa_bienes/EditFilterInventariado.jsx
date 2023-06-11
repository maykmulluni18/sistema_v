import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';
const URI2 = DB_URL + 'invetinicial/'

const EditFilterInventariado = () => {

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
            <datalist id="bienesinv">
                {
                    bienes
                        .map(res => {
                            return (
                                <option key={res.id} value={res.id}> [ N°: {res.id} ] -- [ {res.descripcion} ] -- [ Stock = {res.cantidad} ] </option>
                            )
                        })
                }

            </datalist>
        </>
    )
}
export default React.memo(EditFilterInventariado)


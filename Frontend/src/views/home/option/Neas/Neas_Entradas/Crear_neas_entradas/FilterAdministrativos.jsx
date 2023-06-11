import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';

const URI4 = DB_URL + 'user/'

const FilterAdministrativos = () => {
    const [administrativos, setAdministrativos] = useState([])
    
    const getAdministrativos = async () => {
        const res = await axios.get(URI4)
        console.log(res.data.nombres)
        setAdministrativos(res.data)
    }
    useEffect(() => {
        getAdministrativos()
    }, [])

    return (
        <>
            <datalist className='datalistt' id="data1">

                {
                    administrativos
                        .map(res => {
                            return (
                                <option className='options' key={res.id} value={res.id}>'
                                    {res.nombres}' '
                                    {res.apellido_paterno}' '
                                    {res.apellido_materno}'
                                </option>
                            )
                        })
                }
            </datalist>

        </>
    )

}

export default React.memo(FilterAdministrativos)


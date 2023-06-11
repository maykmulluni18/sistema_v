import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';

const URI4 = DB_URL + 'user/'

const NombreAdministrativos = () => {
    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI4)
        setAdministrativos(res.data)
    }
    useEffect(() => {
        getAdministrativos()
    }, [])

    return (
        <>
            <datalist className='datalistt_1' id="data1_1">

                {
                    administrativos
                        .map(res => {
                            return (
                                <option className='options' key={res.nombres} value={res.nombres}>'
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

export default React.memo(NombreAdministrativos)
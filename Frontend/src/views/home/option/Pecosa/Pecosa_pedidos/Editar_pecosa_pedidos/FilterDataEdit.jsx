import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DB_URL } from '../../../../../../config/config';

const URI4 = DB_URL + 'user/'

const FilterDataEdit = () => {
    const [administrativos, setAdministrativos] = useState([])
    const getAdministrativos = async () => {
        const res = await axios.get(URI4)
        setAdministrativos(res.data)
    }
   /* const rr=useCallback(()=>{
        getAdministrativos(administrativos)
    },[administrativos])*/

    useEffect(() => {
        getAdministrativos()
    }, [])

    return (
        <>
            <datalist className='datalistt' id="datap">

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

export default React.memo(FilterDataEdit)
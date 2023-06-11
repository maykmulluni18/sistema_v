
export const userColumns = [

    { field: 'id', headerName: 'NEA', width: 80 },
    { field: 'recibido_por', headerName: 'Recibido por:', width: 220 },
    {
        field: 'tipo_obra',
        headerName: 'T. Obra',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200,
        valueGetter: (params) =>
            `${params.row.Meta?.obra + ' '}` 
    },
    { field: 'fecha_de_registro', headerName: 'Fecha de Registro', width: 150 },
    {
        field: 'Responsble',
        headerName: 'Responsble',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 370,
        valueGetter: (params) =>
            `${params.row.usuario?.nombres + ' '}` +  
            `${params.row.usuario?.apellido_paterno + ' '}` + 
            `${params.row.usuario?.apellido_materno || ' '}`,
    },
    {
        field: 'Sedes',
        headerName: 'Sedes',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 180,
        valueGetter: (params) =>
            `${params.row?.tipo_de_sede || ''}`,
    },

];
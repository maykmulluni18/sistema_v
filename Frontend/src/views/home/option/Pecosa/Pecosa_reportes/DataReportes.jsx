        
export const userColumns = [

    { field: 'id', headerName: 'PECOSA', width: 100 },
    {
        field: 'Responsble',
        headerName: 'Responsble',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 300,
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
        width: 550,
        valueGetter: (params) =>
            `${params.row?.tipo_de_sede || ''}` + '  ' +  ' ' + `${params.row.sede?.descripcion || ''}`,
    },

    { field: 'fecha', headerName: 'Fecha de Pedido', width: 140 },
    {
        field: 'Metas',
        headerName: 'Obra',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
            `${params.row.Meta?.obra || ''}`,
    },

];
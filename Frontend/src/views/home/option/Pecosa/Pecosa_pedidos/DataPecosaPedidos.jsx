
export const userColumns = [

    { field: 'id', headerName: 'PECOSA', width: 50 },
    { field: 'dependencias', headerName: 'Dependencia ', width: 200 },
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
        field: 'Metas',
        headerName: 'Obra',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 550,
        valueGetter: (params) =>
            `${params.row.Meta?.obra || ''}`,
    },

    { field: 'fecha', headerName: 'Fecha de Pedido', width: 140 },
];
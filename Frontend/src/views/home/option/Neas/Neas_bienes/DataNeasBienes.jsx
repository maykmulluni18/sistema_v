
export const userColumns = [

    //{ field: 'id', headerName: 'ID', width: 50 },
    { field: 'neaEntradaId', headerName: 'Nea', width: 50 },
    {
        field: 'descripcion',
        headerName: 'Descripcion',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 300,
        valueGetter: (params) =>
        `${params.row.biene.description || ''}`
           
    },
    { field: 'cantidad_inicial', headerName: 'Cantidad', width: 100 }, 
    { field: 'cantidad', headerName: 'Stock', width: 100 }, 
    { field: 'fte_fto', headerName: 'fte/fto', width: 120 },
    { field: 'cuenta_contable', headerName: 'Cuenta Contable', width: 150 },
    { field: 'p_unitario', headerName: 'P.Unitario', width: 110 },
    { field: 'fecha', headerName: 'Fecha de Pedido', width: 140 },
    {
        field: 'P.Total',
        headerName: 'P.Total',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 150,
        valueGetter: (params) =>
        Number.parseFloat(`${params.row.cantidad || ''}` * `${params.row.p_unitario || ''}`).toFixed(2)
           
    },
];
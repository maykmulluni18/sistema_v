
export const userColumns = [

   // { field: 'id', headerName: 'ID', width: 50 },
    { field: 'pecosaPedidoId', headerName: 'Pecosa', width: 80 },

    {
        field: 'Bienes_Descripcion',
        headerName: 'Bienes Descripcion',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 350,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.biene.description || params.row.nea_bien?.biene.description }` ,
    },
    {
        field: 'items',
        headerName: 'Item',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 90,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.biene.item || params.row.nea_bien?.biene.item}`,
    },
    {
        field: 'u_medida',
        headerName: 'U. Medida',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 90,
        valueGetter: (params) =>
            `${params.row.inventarido_inicial?.biene.unidad_de_medida || params.row.nea_bien?.biene.unidad_de_medida}`,
    },
    { field: 'cantidad', headerName: 'Cantidad', width: 100 },
    { field: 'observaciones', headerName: 'Observaciones', width: 210 },    
    { field: 'fecha', headerName: 'Fecha de Pedido', width: 140 },
    {
        field: 'P.Total',
        headerName: 'P.Total',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 100,
        valueGetter: (params) =>
            Number.parseFloat(`${params.row.cantidad || ''}` * `${params.row.inventarido_inicial?.precio || params.row.nea_bien?.p_unitario}`).toFixed(2),  
        },
];
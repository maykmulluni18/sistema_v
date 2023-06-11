
export const userColumns = [

    {
      field: 'createdAt',
      headerName: 'Fecha',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      valueGetter: (params) =>
          `${params.row?.createdAt}` ,
  },
    { field: 'fecha', headerName: 'Fecha de registro', width: 160 },
    { field: 'item', headerName: 'Item', width: 100 },
    { field: 'medida', headerName: 'Medida', width: 150 },
    { field: 'descripcion', headerName: 'Descripcion', width: 540 },
    { field: 'entrada', headerName: 'Entradas', width: 100 },
    {
      field: 'salida',
      headerName: 'Salidas',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 100,
      valueGetter: (params) =>
          `${params.row?.salida}` ,
  },
    { field: 'stock', headerName: 'Stoks', width: 100 },
  ];
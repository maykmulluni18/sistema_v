
export const userColumns = [

  //{ field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'Codigo',
    headerName: 'Codigo',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    valueGetter: (params) =>
      `${params.row?.Codigo}`,
  },
  {
    field: 'Unidad',
    headerName: 'Medida',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
    valueGetter: (params) =>
      `${params.row?.Unidad}`,
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 620,
    valueGetter: (params) =>
      `${params.row?.Descripcion}`,
  },
  {
    field: 'C_Inicial',
    headerName: 'Can. Total',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    valueGetter: (params) =>
      `${params.row?.Cantidad_Inicial}`,
  },
  {
    field: 'Inventarido_Cantidad',
    headerName: 'NEA. Salida',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    valueGetter: (params) =>
      `${params.row?.Salida_Invet || '0'}`,
  },
  {
    field: 'Nea_Cantidad',
    headerName: 'Inv. Salida',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    valueGetter: (params) =>
      `${params.row?.Salida_Nea || '0'}`,
  },
  {
    field: 'stocks',
    headerName: 'Can. Sobrante',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    valueGetter: (params) =>
      `${params.row?.Stock}`,
  },
  {
    field: 'C. ',
    headerName: 'Salida',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 130,
    valueGetter: (params) =>
      `${params.row?.Salida || '0'}`,
  },

];
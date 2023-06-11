
export const userColumns = [

  //{ field: 'id', headerName: 'ID', width: 100 },
  {
    field: 'Codigo',
    headerName: 'Codigo',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
    valueGetter: (params) =>
      `${params.row?.Codigo}`,
  },
  {
    field: 'Unidad',
    headerName: 'Medida',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 120,
    valueGetter: (params) =>
      `${params.row?.Unidad}`,
  },
  {
    field: 'descripcion',
    headerName: 'Descripcion',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 540,
    valueGetter: (params) =>
      `${params.row?.Descripcion}`,
  },
  {
    field: 'C_Inicial',
    headerName: 'Can. Total',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
    valueGetter: (params) =>
      `${params.row?.Cantidad_Inicial}`,
  },
  {
    field: 'Inventarido_Cantidad',
    headerName: 'Inv. Cantidad',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
    valueGetter: (params) =>
      `${params.row?.Inventarido_Cantidad || '0'}`,
  },
  {
    field: 'Nea_Cantidad',
    headerName: 'Nea Cantidad',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
    valueGetter: (params) =>
      `${params.row?.Nea_Cantidad || '0'}`,
  },
  {
    field: 'stocks',
    headerName: 'Can. Sobrante',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 140,
    valueGetter: (params) =>
      `${params.row?.Stock}`,
  },

];
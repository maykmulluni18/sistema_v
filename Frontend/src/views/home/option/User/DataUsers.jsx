        
export const userColumns = [
    //{ field: 'id', headerName: 'ID', width: 40 },
    { field: 'username', headerName: 'Nombre de  Usuario', width: 240 },
    { field: 'nombre', headerName: 'Nombres', width: 200 },
    { field: 'apellido_paterno', headerName: 'Apellido Paterno', width: 240 },
    { field: 'apellido_materno', headerName: 'Apellido Materno', width: 240 },
    { field: 'role', headerName: 'Rol', width: 200 },
    {
        field: 'Role',
        headerName: 'Role',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 220,
        valueGetter: (params) =>
            `${params.row.role}` === 'admin' 
    },

];
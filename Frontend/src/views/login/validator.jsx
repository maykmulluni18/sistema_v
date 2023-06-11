import { Grid, Paper } from "@mui/material";
import React from "react";

const validator = () => {
    const paperStyle = { padding: 20, heigth: 20 }
    return (
        <>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    Iniciar secion
                </Paper>
            </Grid>
        </>
    )
}
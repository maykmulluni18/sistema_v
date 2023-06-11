import {
    Box, Button, FormHelperText, Grid,
    IconButton, InputAdornment,
    TextField, Typography
} from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

//import { styled } from '@mui/material/styles';

import { LoginUser, reset } from "../home/auth/Authen";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { useCallback } from "react"

import "./Login_p.scss"
import UNAP from "./img/unap_1.png";
//import Video from "./video/una.mp4";

/*const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: 'auto',
    maxHeight: 'auto',
});*/

const Login_inicio = () => {
    //const vid = useCallback((x) => x.volume = 0.5)

    const [values, setValues] = useState({
        usua: "",
        pass: "",
        showPass: false,
    });

    const handlePassVisibilty = () => {
        setValues({
            ...values,
            showPass: !values.showPass,
        });
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );
    useEffect(() => {
        if (user || isSuccess) {
            navigate("/home");
        }
        dispatch(reset());
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        dispatch(LoginUser({ username, password }));
    };

    return (
        <>

            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flex: '1 1 auto',
                    height: '100%'
                }}
                className="cont_login"
            >


                <Grid
                    container
                    sx={{ flex: '1 1 auto' }}
                >
                    <Grid
                        item
                        xs={12}
                        lg={4}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            position: 'relative'
                        }}
                    //style={{ minHeight: "100vh" }}
                    >


                        <Box
                            sx={{
                                flex: '1 1 auto',
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >


                            <Box
                                sx={{
                                    maxWidth: 500,
                                    px: 3,
                                    py: '100px',
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                            >
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        top: '-50%',
                                    }}
                                >
                                    <div className='imagen'>
                                        <img
                                            src={UNAP}
                                            alt="logo"
                                            className="logo" />
                                    </div>

                                </Box>

                                <Typography
                                    sx={{
                                        mb: 1,
                                        alignItems: 'center',
                                        //textAlign: 'center'
                                    }}
                                    variant="h5"
                                >
                                    ALMACEN CENTRAL UNA PUNO
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{ mb: 3, }}
                                    variant="body2"
                                >
                                    Iniciar Sesion
                                </Typography>

                                <form>


                                    <Grid container direction="column" spacing={3}>
                                        <Grid aling='center'>
                                            {isError && <strong><p className="has-text-centered">{message}</p></strong>}
                                        </Grid>
                                        <Grid item>
                                            <TextField
                                                type="text"
                                                fullWidth
                                                label="Ingrese su Usuario"
                                                placeholder="Ingrese su Usuario"
                                                variant="outlined"
                                                required
                                                id='username'
                                                name='username'
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item>
                                            <TextField
                                                type={values.showPass ? "text" : "password"}
                                                fullWidth
                                                label="Ingrese su Contraseña"
                                                placeholder="Ingrese su Contraseña"
                                                variant="outlined"
                                                required
                                                id='password'
                                                name='password'
                                                value={password}
                                                onChange={(e) => {
                                                    setPassword(e.target.value)
                                                }}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={handlePassVisibilty}
                                                                aria-label="toggle password"
                                                                edge="end"
                                                            >
                                                                {values.showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item>

                                            <FormHelperText sx={{ mt: -2 }}>

                                            </FormHelperText>
                                        </Grid>

                                        <Grid item>
                                            <Button
                                                className="iniciar"
                                                fullWidth
                                                size="large"
                                                sx={{ mt: 0 }}
                                                variant="contained"
                                                onClick={Auth}
                                            >
                                                {isLoading ? 'Loading...' : 'Iniciar Sesion'}
                                            </Button>
                                        </Grid>

                                    </Grid>
                                </form>

                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        className="car_sidebar"
                        xs={12}
                        lg={8}
                        src={UNAP}
                        sx={{
                            alignItems: 'center',
                            background: 'radial-gradient(50% 55% at 50% 50%, #122647 0%, #090E23 100%)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            '& img': {
                                maxWidth: '100%'
                            },


                        }}

                    >
                        {/*<Img alt="complex" src={UNAP} />

                      */}
                      
                        {/*   <video ref={vid} src={Video} autoplay width="1500" height="719" controls loop preload="auto">
                        
                        </video>  
                        */}
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default React.memo(Login_inicio);
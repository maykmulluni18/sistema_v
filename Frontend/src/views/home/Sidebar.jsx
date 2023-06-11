import * as React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, reset } from "./auth/Authen";
import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { SidebarDataNeas } from './SidebarDataNeas';
import { SidebarDataHome } from "./SidebarDataHome";
import { SidebarDataPecosa } from './SidebarDataPecosa';
import { SidebarDataBienes } from './SidebarDataBienes';
import { SidebarDataSedes } from './SidebarDataSedes';
import { SidebarDataAdministrativos } from './SidebarDataAdministrativos';
import { SidebarDataUsers } from './SidebarDataUsers';
import { SidebarDataMetas } from './SidebarDataMetas';
import { SidebarDataInventariado } from './SidebarDataInventariado';
import { SidebarDataAlmacen } from './SidebarDataAlmacen';
import { SidebarDataObras } from './SidebarDataObras';
import { SidebarDataReporteTotal } from './SidebarDataReporteTotal';
import LabelIcon from '@mui/icons-material/Label';
import SegmentIcon from '@mui/icons-material/Segment';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore'
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MuiListItem from "@material-ui/core/ListItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";


import img from "./UNAP.png"

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    }
}));

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: "red",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&$selected:hover": {
            backgroundColor: "purple",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&:hover": {
            backgroundColor: "blue",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        }
    },
    selected: {}
})(MuiListItem);


const drawerWidth = 280;

function EjempSidebar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(!open);
    };
    const [open_1, setOpen_1] = React.useState(false);
    const handleClick_1 = () => {
        setOpen_1(!open_1);
    };
    const [open_2, setOpen_2] = React.useState(false);
    const handleClick_2 = () => {
        setOpen_2(!open_2);
    };

    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth)
    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    }
    const drawer = (
        <div className="sidebar_grid">
            <div className="Logo flex">
                <img src={img} alt="Imagen" />
                <h2>
                    Almacen
                </h2>
            </div>
            <List component="nav" aria-label="main mailbox folders" >
                <List>
                    {
                        SidebarDataHome.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.path} className="icon">

                                    <div className="menu_div">
                                        <ul className="menu_list grid">
                                            <li className="list_item active">
                                                <p className="menu_link flex">
                                                    {item.icon} <span className="smallText">{item.title}</span>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            )

                        })
                    }
                </List>
                <List>
                    {
                        SidebarDataReporteTotal.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.path} className="icon">

                                    <div className="menu_div">
                                        <ul className="menu_list grid">
                                            <li className="list_item active">
                                                <p className="menu_link flex">
                                                    {item.icon} <span className="smallText">{item.title}</span>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            )

                        })
                    }
                </List>
                <Divider className='lines' />
                <List>

                    <ListItemButton className='conten_list' onClick={handleClick}>
                        <ListItemIcon>
                            <LabelIcon className='icon' />
                        </ListItemIcon>
                        <h3>Neas</h3> <ListItemText variant="h1" primary="" />

                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {
                        SidebarDataNeas.map((item, index) => {
                            return (
                                <Collapse key={item.id} in={open} timeout="auto" unmountOnExit>
                                    <Link to={item.path} className="icon active">
                                        <List component="div" disablePadding>
                                            <div className="menu_div">

                                                <ul className="menu_list grid">

                                                    <li className="list_item ">
                                                        <p className="menu_link flex">


                                                            {item.icon} <span className="smallText">{item.title}</span>
                                                        </p>
                                                    </li>

                                                </ul>
                                            </div>
                                        </List>
                                    </Link>
                                </Collapse>
                            )

                        })
                    }
                </List>
                <Divider className='lines' />

                <List>
                    <ListItemButton className='conten_list' onClick={handleClick_1}>
                        <ListItemIcon>
                            <SegmentIcon className='icon' />
                        </ListItemIcon>
                        <h3>Pecosa</h3> <ListItemText variant="h1" primary="" />
                        {open_1 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {
                        SidebarDataPecosa.map((item, index) => {
                            return (
                                <Collapse key={item.id} in={open_1} timeout="auto" unmountOnExit>
                                    <Link to={item.path} className="icon">
                                        <List component="div" disablePadding>
                                            <div className="menu_div">
                                                <ul className="menu_list grid">

                                                    <li key={index} className="list_item">
                                                        <p className="menu_link flex">

                                                            {item.icon} <span className="smallText">{item.title}</span>

                                                        </p>
                                                    </li>

                                                </ul>
                                            </div>
                                        </List>
                                    </Link>
                                </Collapse>)

                        })
                    }
                </List>
                <Divider className='lines' />

                {/* 
                <List>
                    {
                        SidebarDataSedes.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.path} className="icon">
                                    <div className="menu_div">
                                        <ul className="menu_list grid">

                                            <li key={index} className="list_item">
                                                <p className="menu_link flex">

                                                    {item.icon} <span className="smallText">{item.title}</span>

                                                </p>
                                            </li>

                                        </ul>
                                    </div>
                                </Link>
                            )

                        })
                    }
                </List>
                <Divider className='lines' />

                <List>
                    {
                        SidebarDataAlmacen.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.path} className="icon">
                                    <div className="seting_div">
                                        <ul className="menu_list grid">

                                            <li key={index} className="list_item">
                                                <p className="menu_link flex">

                                                    {item.icon} <span className="smallText">{item.title}</span>

                                                </p>
                                            </li>

                                        </ul>
                                    </div>
                                </Link>
                            )

                        })
                    }
                </List>

                <Divider className='lines' />

                <List>
                    {
                        SidebarDataObras.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.path} className="icon">
                                    <div className="seting_div">
                                        <ul className="menu menu_list grid">

                                            <li key={index} className="list_item">
                                                <p className="obras menu_link flex">

                                                    {item.icon} <span className="smallText">{item.title}</span>

                                                </p>
                                            </li>

                                        </ul>
                                    </div>
                                </Link>
                            )

                        })
                    }
                </List>
                <Divider className='lines' />
    */}
                <List>
                    {
                        SidebarDataMetas.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.path} className="icon">

                                    <div className="menu_div">
                                        <ul className="menu_list grid">

                                            <li key={index} className="list_item">
                                                <p className="menu_link flex">
                                                    {item.icon}<span className="smallText">{item.title}</span>

                                                </p>
                                            </li>

                                        </ul>
                                    </div>
                                </Link>
                            )

                        })
                    }
                </List>
                <Divider className='lines' />

                <List>
                    <ListItemButton className='conten_list' onClick={handleClick_2}>
                        <ListItemIcon>
                            <InboxIcon className='icon' />
                        </ListItemIcon>
                        <h3>Inventariado</h3> <ListItemText variant="h1" primary="" />
                        {open_2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    {
                        SidebarDataInventariado.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.path} className="icon">
                                    <Collapse in={open_2} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <div className="menu_div">
                                                <ul className="menu_list grid">

                                                    <li key={index} className="list_item">
                                                        <p className="menu_link flex">

                                                            {item.icon} <span className="smallText">{item.title}</span>

                                                        </p>
                                                    </li>

                                                </ul>
                                            </div>
                                        </List>
                                    </Collapse>
                                </Link>
                            )

                        })
                    }
                </List>
                <Divider className='lines' />

                <List>
                    {
                        SidebarDataBienes.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.path} className="icon">

                                    <div className="menu_div">
                                        <ul className="menu_list grid">

                                            <li key={index} className="list_item">
                                                <p className="menu_link flex">
                                                    {item.icon}<span className="smallText">{item.title}</span>

                                                </p>
                                            </li>

                                        </ul>
                                    </div>
                                </Link>
                            )

                        })
                    }
                </List>
                <Divider className='lines' />
                <List>
                    {
                        SidebarDataAdministrativos.map((item, index) => {
                            return (
                                <Link key={item.id} to={item.path} className="icon">
                                    <div className="seting_div">
                                        <ul className="menu_list grid">

                                            <li key={index} className="list_item">
                                                <p className="menu_link flex">

                                                    {item.icon}<span className="smallText">{item.title}</span>

                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            )

                        })
                    }
                </List>
                <Divider className='lines' />
                {user && user.role === "admin" && (
                    <List>
                        {
                            SidebarDataUsers.map((item, index) => {
                                return (
                                    <Link key={item.id} to={item.path} className="icon">
                                        <div className="seting_div">
                                            <ul className="menu_list grid">

                                                <li key={index} className="list_item">
                                                    <p className="menu_link flex">

                                                        {item.icon} <span className="smallText">{item.title}</span>

                                                    </p>
                                                </li>

                                            </ul>
                                        </div>
                                    </Link>
                                )

                            })
                        }
                    </List>
                )}
                <Divider className='lines' />

                <List>
                    <div className='sidebarcar'>
                        <DashboardIcon className='icon' />
                        <div className='carcontend'>
                            <div className='circle1'></div>
                            <div className='circle2'></div>
                            <h3>..</h3>
                            <p>{user && user.nombre}</p>
                            <button onClick={logout} className='btn btn-salir-sesion'>Salir</button>
                        </div>

                    </div>
                </List>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box className='Navar_cont'>
            <CssBaseline className='colorStyle' />
            <AppBar
                className='Navar'
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar className='contedn'>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6"
                        sx={{ mr: 1 }}
                        noWrap component="div">
                        @
                    </Typography>
                    <Typography variant="h6"
                        sx={{ mr: 120 }}
                        className='title_nav' noWrap component="div">
                        UNIVERSIDAD NACIONAL DEL ALTIPLANO
                    </Typography>
                    <Typography variant="h6"
                        sx={{ mr: 2 }}
                        className='img_cont' noWrap component="div">

                        <div className="img">
                            <img
                                src="https://data.whicdn.com/images/356814382/original.jpg"
                                alt=""
                                className="userimg"
                            />
                        </div>
                    </Typography>
                    <Typography variant="h7"
                        sx={{ mr: 3 }}
                        noWrap component="div">
                        {user && user.nombre}

                    </Typography>
                    <Typography variant="h6" noWrap component="div">

                        <div className="item">
                            <LogoutRoundedIcon
                                onClick={logout}
                                className="icons"
                            />
                        </div>
                    </Typography>

                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 0, left: -2, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />

            </Box>
        </Box>
    );
}

EjempSidebar.propTypes = {
    window: PropTypes.func,
};

export default EjempSidebar;

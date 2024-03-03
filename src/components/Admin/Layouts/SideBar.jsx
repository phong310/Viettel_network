import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DataThresholdingIcon from '@mui/icons-material/DataThresholding';
import GroupIcon from '@mui/icons-material/Group';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import { LogoutUser } from '../../Api/apiRequest';
import DataPage from '../DataPage';
import HomePage from '../HomePage';
import { AppBar, DrawerHeader, DrawerLeft, drawerWidth } from './DrawLeft';
import viettelPngWhite from '/src/assets/viettelwhite.png';
import UserPage from '../UserPage';
import { useEffect } from 'react';



const sideBarMenu = [
    {
        label: 'Trang chủ',
        path: '',
        Icon: <HomeOutlinedIcon />,
        component: <HomePage />,
    },
    {
        label: 'Dữ liệu mạng',
        path: 'data',
        Icon: <DataThresholdingIcon />,
        component: <DataPage />,
    },
    {
        label: 'Tài khoản',
        path: 'user-account',
        Icon: <GroupIcon />,
        component: <UserPage />
    },
];

export default function SideBar() {
    const location = useLocation()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const DataUser = useSelector((state) => state.auth.login?.currentUser)
    const [currentLabel, setCurrentLabel] = useState('');

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const LogOut = () => {
        LogoutUser(DataUser.user?._id, dispatch, navigate, DataUser.accessToken)
    }

    useEffect(() => {
        const pathArray = window.location.pathname.split('/')
        const path = pathArray.length > 2 ? pathArray[2] : '';
        const menuItem = sideBarMenu.find(item => item.path === path);
        if (menuItem) {
            setCurrentLabel(menuItem.label);
        }
    }, [location.pathname]);


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ ...styleAppBar }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ ...styleLabel }}>
                        {currentLabel}
                    </Typography>
                    <Grid sx={{ ...gridAvatar }}>
                        <Typography>{DataUser.user?.username}</Typography>
                        <IconButton onClick={handleClick}>
                            <Avatar alt="Remy Sharp" src="" />
                        </IconButton>
                    </Grid>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Cá nhân</MenuItem>
                        <MenuItem onClick={LogOut}>Đăng xuất</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <DrawerLeft variant="permanent" open={open} >
                <DrawerHeader>
                    <Grid container sx={{ ...gridImg }} gap={1} onClick={() => navigate('/')}>
                        <img src={viettelPngWhite} alt="logo" width={140} />
                    </Grid>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon sx={{ color: 'white' }} /> : <ChevronLeftIcon sx={{ color: 'white' }} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {sideBarMenu.map((menuItem, index) => (
                        <motion.div
                            initial={{ x: -drawerWidth }}
                            animate={{ x: 0 }}
                            exit={{ x: -drawerWidth }}
                            transition={{ type: 'tween', duration: 0.5 }}
                            whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    component={Link}
                                    to={menuItem.path}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        {menuItem.Icon}
                                    </ListItemIcon>
                                    <ListItemText primary={menuItem.label} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </motion.div>

                    ))}
                </List>
            </DrawerLeft>
            <Box component="main" sx={{ flexGrow: 1, overflowX: 'hidden' }}>
                <DrawerHeader />
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Routes>
                        {sideBarMenu.map((item, index) => (
                            <Route
                                key={index}
                                path={item.path}
                                element={item.component}
                            />
                        ))}
                    </Routes>
                </motion.div>
            </Box>
        </Box>
    );
}

const gridImg = {
    justifyContent: 'center',
    alignItems: 'center',
    my: 2
}
gridImg[':hover'] = {
    cursor: 'pointer'
}

const styleAppBar = {
    bgcolor: 'white',
    color: 'black',
}

const gridAvatar = {
    ml: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 1
}

const styleLabel = {
    textTransform: 'uppercase',
    fontWeight: 500,
}

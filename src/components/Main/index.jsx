/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import {
    Route,
    useHistory,
    Link,
    useRouteMatch,
    Switch,
    Redirect
} from 'react-router-dom';
import Login from './LoginController';
import Loading from '../../helper/Loading';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { menuItem, routePath } from '../../constants/shared';
import {
    Badge,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Menu,
    MenuItem,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useEffect } from 'react';
import DialogChangePass from '../Account/AccActiveInfoComponent/DialogChangePass';
import { apiAcc } from '../../api/apiConnect';
import { toastFail, toastSuccess } from '../../helper/Notification/utils';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const Main = () => {
    const token = localStorage.getItem('token');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openDropdown = Boolean(anchorEl);
    const [show, setShow] = useState(false);
    const toggleModalChangePass = () => {
        setShow(!show);
    };
    const [password, setPassword] = useState({
        username: localStorage.getItem('username'),
        oldPass: '',
        newPass: '',
        reNewPass: '',
    });
    const [err, setErr] = useState({
        match: false,
        minLength: false,
    });
    const validateFormChangePass = (e) => {
        e.preventDefault();
        if (password.newPass.length < 6) {
            setErr({ ...err, minLength: true });
            setTimeout(() => {
                setErr({ ...err, minLength: false });
            }, 4000);
            return;
        } else if (password.newPass !== password.reNewPass) {
            setErr({ ...err, match: true });
            setTimeout(() => {
                setErr({ ...err, match: false });
            }, 4000);
            return;
        } else {
            postChangePass();
            return;
        }
    };
    const postChangePass = (e) => {
        apiAcc
            .put('/accounts/changepass', password, {
                headers: {
                    authorization: 'Bearer ' + token,
                },
            })
            .then((res) => {
                toastSuccess('Đổi mật khẩu thành công');
                signOut();
            })
            .catch((err) => {
                toastFail('Thất bại, vui lòng thử lại');
            });
    };

    useEffect(() => {
        if (isLoggedIn === 'true') {
            setLogin(true);
        } else {
            setLogin(false);
        }
    }, [isLoggedIn]);
    const loginSuccess = () => {
        const checkrole = localStorage.getItem('roleId');
        const id = localStorage.getItem('id')
        checkrole === '1'
            ? history.push('/admin/staff-list')
            : history.push(`/list-test/take-quiz/${id}`);
    };
    const userType = localStorage.getItem('userType');

    //open dropdown account
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    //MuiDrawer
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const renderDefaultRoutes = () => {
        const xhtml = routePath.map((route, idx) => (
            <Route
                key={idx}
                path={route.path}
                component={route.component}
                exact={route.exact}
                // name={route.name}
            />
        ));
        return xhtml;
    };

    //NAVBAR

    const MenuItemSide = ({ item }) => {
        let match = useRouteMatch({
            path: item.path,
        });
        return (
            <Link to={item.id === 6 ? `${item.path}${localStorage.getItem('id')}` : item.path} className="menu-item">
                <ListItem
                    button
                    className={match ? 'menu-item-active mx-auto' : 'mx-auto'}
                    style={{ padding: '15px' }}
                >
                    <ListItemIcon>
                        <img src={item.icon} />
                    </ListItemIcon>
                    <ListItemText primary={item.title} sx={{ fontWeight: 'bold' }} />
                </ListItem>
            </Link>
        );
    };

    const signOut = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('company');
        localStorage.removeItem('id');
        localStorage.removeItem('roleId');
        localStorage.removeItem('userType');
        localStorage.removeItem('fullName')
        history.push('/');
        window.location.reload();
    };
    const handleOpenLogout = () => {
        setOpenLogout(true);
    };
    const handleCloseLogout = () => {
        setOpenLogout(false);
    };
    const handleChangePassword = (key, value) => {
        switch (key) {
            case 'oldPass':
                setPassword({...password, oldPass: value});
                break;
            case 'newPass':
                setPassword({...password, newPass: value});
                break;
            case 'reNewPass':
                setPassword({...password, reNewPass: value});
                break;
            default:
                break;
        }
    }

    if (loading === false) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {login === true ? (
                    <>
                        <AppBar position="fixed" style={{ background: 'white', boxShadow: 'none' }}>
                            <Toolbar style={{ borderBottom: '1px solid rgb(200,200,200)', boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
                                <div style= {styles.logoContainer(open)}>
                                    <img src="/images/Google_Logo.svg.png" alt="Logo" width="30px"/>
                                    <div
                                        style={ styles.toggleLogo(open) }
                                    />
                                </div>
                                <IconButton
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{
                                        color: 'black',
                                        marginLeft: '25px',
                                        ...(open && { display: 'none' }),
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <IconButton
                                    onClick={handleDrawerClose}
                                    sx={{ color: 'black', marginRight: '36px', ...(!open && { display: 'none' }), }}
                                >
                                    {theme.direction === 'rtl' ? (
                                        <ChevronRightIcon />
                                    ) : (
                                        <ChevronLeftIcon />
                                    )}
                                </IconButton>
                                <Box sx={{ flexGrow: 1 }} />
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    {/* <IconButton size="large" aria-label="show 4 new mails" style={{ color: 'black' }}>
                                        <Badge badgeContent={4} color="error">
                                            <MailIcon />
                                        </Badge>
                                    </IconButton> */}
                                    <IconButton size="large" aria-label="show new notifications" style={{ color: 'black' }}>
                                        <Badge badgeContent={0} color="error">
                                            <NotificationsIcon />
                                        </Badge>
                                    </IconButton>
                                    <div>
                                        <Button
                                            style={{color: '#000000', marginTop: '2px' }}
                                            aria-controls={ openDropdown ? 'basic-menu' : undefined }
                                            aria-haspopup="true"
                                            aria-expanded={ openDropdown ? 'true' : undefined }
                                            onClick={handleClick}
                                        >
                                            <AccountCircle />
                                            <span style={{ color: '#161E54', fontSize: '16px', fontWeight: 700, padding:'2px 0 0 5px', textTransform:'none' }}>
                                                {localStorage.getItem('fullName')}
                                            </span>
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={openDropdown}
                                            onClose={handleClose}
                                            MenuListProps={{'aria-labelledby': 'basic-button',}}
                                        >
                                            <MenuItem sx={styles.menuItem} onClick={() => {handleClose(); history.push('/account')}}>
                                                <AccountCircle />
                                                Thông tin tài khoản
                                            </MenuItem>
                                            <MenuItem sx={styles.menuItem} onClick={() => {setShow(true); handleClose()}}>
                                                <img src="/icon/ChangePassNav.svg" />
                                                Đổi mật khẩu
                                            </MenuItem>
                                            <MenuItem sx={styles.menuItem} onClick={handleClose}>
                                                <img src="/icon/Setting.svg" />
                                                Cài đặt
                                            </MenuItem>
                                            <MenuItem sx={styles.menuItemLogout} onClick={handleOpenLogout}>
                                                <img src="/icon/Logout.svg" alt=""/>
                                                Đăng xuất
                                            </MenuItem>
                                        </Menu>
                                    </div>
                                </Box>
                            </Toolbar>
                        </AppBar>
                        <Drawer variant="permanent" open={open}>
                            <DrawerHeader />
                            <List sx={{ backgroundColor: '#F3F3F3', height: '100%' }}>
                                {Number(localStorage.getItem('roleId')) !== 1
                                    ? menuItem.filter((i) => i.type === 'guest').map((item, index) => {
                                        return (<MenuItemSide item={item} key={index}/>);
                                    })
                                    : (localStorage.getItem('username') ==='lanhdao' || localStorage.getItem('username') ==='SupperAdmin')
                                    ? menuItem.map((item, index) => {
                                        return (<MenuItemSide item={item} key={index}/>);
                                    })
                                    : menuItem.filter((i) => i.type === 'staff').map((item, index) => {
                                        return (<MenuItemSide item={item} key={index}/>);
                                    })}
                            </List>
                            <Divider />
                        </Drawer>
                    </>
                ) : null}
                <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
                    {console.log(localStorage.getItem('roleId'))}
                    <Switch>
                        {
                            localStorage.getItem('roleId') === null
                            ?
                                <Route exact path="/" render={(props) => (<Login {...props} loginSuccess={loginSuccess} setLoading={setLoading} />)}/>
                            :
                            Number(localStorage.getItem('roleId')) === 1
                                ?
                                    <Redirect exact from="/" to="/admin/staff-list" />
                                :
                                    <Redirect exact from="/" to={`/list-test/take-quiz/${localStorage.getItem('id')}`} />
                        }
                    </Switch>
                    {login && login === true ? (
                        <>
                            <DrawerHeader />
                            <Switch>{renderDefaultRoutes()}</Switch>
                        </>
                    ) : (
                        ''
                    )}
                </Box>
                <Dialog
                    open={openLogout}
                    onClose={handleCloseLogout}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Bạn muốn đăng xuất khỏi hệ thống?'}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCloseLogout}>Hủy</Button>
                        <Button className='button-save-update' onClick={signOut} autoFocus>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
                <DialogChangePass
                    show={show}
                    password={password}
                    handleChangePassword={handleChangePassword}
                    validateForm={validateFormChangePass}
                    err={err}
                    toggleModalChangePass={toggleModalChangePass}
                />
            </Box>
        );
    } else {
        return <Loading />;
    }
};

const styles = {
    menuItem: {
        color: '#161E54',
        gap: 1,
        fontWeight:400, 
        fontSize: 16,
        fontFamily: 'Quicksand'
    },
    menuItemLogout: {
        color: '#fa2a2a', 
        gap: 1,
        fontFamily: 'Quicksand',
        fontWeight:400, 
        fontSize: 16,
        borderTop: '1px solid #747474'
    },
    toggleLogo: (open) => {
        const common = {
            marginLeft: '10px',
            overflow: 'hidden',
            transition: '250ms ease-in-out',
            background: 'url("/images/Burberry_logo.svg") center/cover no-repeat',
        }
        if(open === true) {
            return ({
                ...common,
                width: '190px',
            })
        } else {
            return ({
                ...common,
                width: '0px',
                padding: 0
            })
        }
    },
    logoContainer: (open) => {
        if(open === true) {
            return ({
                display: 'flex',
                flexDirection: 'row',
                width: 'fit-content',
                transition: '225ms ease',
            })
        } else {
            return ({
                display: 'flex',
                flexDirection: 'row',
                width: 'auto',
                transition: '225ms ease',
            })
        }
    }
}

export default Main;

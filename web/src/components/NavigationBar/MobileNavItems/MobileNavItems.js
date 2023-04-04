import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const MobileNavItems = () => {
    return (
        <>
            <ListItem key={'catalog'} disablePadding>
                <ListItemButton sx={{
                    textAlign: 'center', color: '#550A21', ":hover": {
                        border: "1px solid #550A21"
                    }
                }}>
                    <ListItemText primary={'Catalog'} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'my-profile'} disablePadding>
                <ListItemButton sx={{
                    textAlign: 'center', color: '#550A21', ":hover": {
                        border: "1px solid #550A21"
                    }
                }}>
                    <ListItemText primary={'My profile'} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'login'} disablePadding>
                <ListItemButton sx={{
                    textAlign: 'center', color: '#550A21', ":hover": {
                        border: "1px solid #550A21"
                    }
                }}>
                    <ListItemText primary={'Login'} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'register'} disablePadding>
                <ListItemButton sx={{
                    textAlign: 'center', color: '#550A21', ":hover": {
                        border: "1px solid #550A21"
                    }
                }}>
                    <ListItemText primary={'Register'} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'logot'} disablePadding>
                <ListItemButton sx={{
                    textAlign: 'center', color: '#550A21', ":hover": {
                        border: "1px solid #550A21"
                    }
                }}>
                    <ListItemText primary={'Logout'} />
                </ListItemButton>
            </ListItem>
        </>
    )
};
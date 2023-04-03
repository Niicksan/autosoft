import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export const MobileNavItems = () => {
    return (
        <>
            <ListItem key={'catalog'} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={'Catalog'} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'my-profile'} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={'My profile'} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'login'} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={'Login'} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'register'} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={'Register'} />
                </ListItemButton>
            </ListItem>
            <ListItem key={'logot'} disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={'Logout'} />
                </ListItemButton>
            </ListItem>
        </>
    )
};
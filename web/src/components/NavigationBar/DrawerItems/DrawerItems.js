import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import { MobileNavItems } from "../MobileNavItems/MobileNavItems";

export const DrawerItems = ({ handleDrawerToggle }) => {
    return (
        <Box sx={{ textAlign: 'center' }}>
            <Button onClick={handleDrawerToggle} variant="text" sx={{ position: 'absolute', top: '14px', left: '0px', color: '#550A21' }}>X</Button>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" sx={{ my: 2, color: '#550A21', width: '100%', alignContent: 'center', alignItems: 'center' }}>
                    AutoSoft
                </Typography>
            </Box>
            <Divider />
            <List>
                <MobileNavItems />
            </List>
        </Box>
    )
};
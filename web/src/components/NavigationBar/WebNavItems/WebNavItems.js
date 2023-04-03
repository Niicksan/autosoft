import Button from '@mui/material/Button';

export const WebNavItems = () => {
    return (
        <>
            <Button key={'catalog'} sx={{ color: '#fff' }}>
                Catalog
            </Button>
            <Button key={'my-profile'} sx={{ color: '#fff' }}>
                My profile
            </Button>
            <Button key={'login'} sx={{ color: '#fff' }}>
                Login
            </Button>
            <Button key={'register'} sx={{ color: '#fff' }}>
                Register
            </Button>
            <Button key={'logout'} sx={{ color: '#fff' }}>
                Logout
            </Button>
        </>
    )
};
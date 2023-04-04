import Button from '@mui/material/Button';

export const WebNavItems = () => {
    return (
        <>
            <Button key={'catalog'} sx={{
                color: '#fff', ":hover": {
                    bgcolor: "white",
                    color: "#550A21"
                }
            }}>
                Catalog
            </Button>
            <Button key={'my-profile'} sx={{
                color: '#fff', ":hover": {
                    bgcolor: "white",
                    color: "#550A21"
                }
            }}>
                My profile
            </Button>
            <Button key={'login'} sx={{
                color: '#fff', ":hover": {
                    bgcolor: "white",
                    color: "#550A21"
                }
            }}>
                Login
            </Button>
            <Button key={'register'} sx={{
                color: '#fff', ":hover": {
                    bgcolor: "white",
                    color: "#550A21"
                }
            }}>
                Register
            </Button>
            <Button key={'logout'} sx={{
                color: '#fff', ":hover": {
                    bgcolor: "white",
                    color: "#550A21"
                }
            }}>
                Logout
            </Button>
        </>
    )
};
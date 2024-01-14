import { AppBar, Avatar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { NavLink, Outlet } from "react-router-dom";
import CountrySelectorComponent from "./components/country-selector/country-selector.component";
import ProfileMenuComponent from "./components/profile-menu/profile-menu.component";
import SessionProviderComponent from "./providers/session-provider/session-provider.component";
const AppLayout = () => {
    const [cookies] = useCookies(['mq-at']);
    const { data: session } = (cookies["mq-at"] && jwtDecode(cookies["mq-at"])) || {};
    return (
        <SessionProviderComponent session={session}>
            <AppBar component='header' position="sticky">
                <Toolbar>
                    <Stack sx={{ width: '100%' }} direction="row" gap={2} alignItems="center">
                        <Avatar to="/" component={NavLink} variant="rounded" src='https://asset.brandfetch.io/idq9Bao8gh/idR1M73xhS.png' />
                        <Stack gap={0}>
                            <Typography variant="h6">mashreq</Typography>
                            <Typography variant="caption" mt={-0.5} color="text.secondary">Online Banking</Typography>
                        </Stack>
                        <Box flexGrow={1}></Box>
                        <Stack direction="row" gap={1}>
                            {
                                !session && (
                                    <>
                                        <Button component={NavLink} to="/signin" color="inherit">
                                            Sign in
                                        </Button>
                                        <Button component={NavLink} to="/signup" color="inherit">
                                            Sign up
                                        </Button>
                                    </>
                                )
                            }
                            {
                                !!session && (
                                    <ProfileMenuComponent />
                                )
                            }
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Outlet />
                <Stack alignItems="center" mt={8} gap={1}>
                    <Typography color="text.secondary" variant="body2">Select your country</Typography>
                    <CountrySelectorComponent />
                </Stack>
            </Container>
        </SessionProviderComponent>
    )
}

export default AppLayout
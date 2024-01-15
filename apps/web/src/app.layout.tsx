import { AppBar, Avatar, Box, Button, Container, Link, Stack, Toolbar, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { NavLink, Outlet } from "react-router-dom";
import CountrySelectorComponent from "./components/country-selector/country-selector.component";
import ProfileMenuComponent from "./components/profile-menu/profile-menu.component";
import SessionProviderComponent, { Session } from "./providers/session-provider/session-provider.component";
import { Favorite } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
const AppLayout = () => {
    const [cookies] = useCookies(['mq-at']);
    const accessToken = cookies["mq-at"];
    const { data: user } = (accessToken && jwtDecode(accessToken)) || {};
    const { t: translate } = useTranslation();
    const session: Session = {
        user,
        jwt: accessToken
    }
    return (
        <SessionProviderComponent session={session}>
            <AppBar component='header' position="sticky">
                <Toolbar>
                    <Stack sx={{ width: '100%' }} direction="row" gap={2} alignItems="center">
                        <Avatar to="/" component={NavLink} variant="rounded" src="logo.png" />
                        <Stack gap={0}>
                            <Typography variant="h6">{translate('brandName')}</Typography>
                            <Typography variant="caption" mt={-0.5} color="text.secondary">{translate('appBar.onlineBanking')}</Typography>
                        </Stack>
                        <Box flexGrow={1}></Box>
                        <Stack direction="row" gap={1}>
                            {
                                !user && (
                                    <>
                                        <Button component={NavLink} to="/signin" color="inherit">
                                            {translate('buttons.signIn')}
                                        </Button>
                                        <Button component={NavLink} to="/signup" color="inherit">
                                            {translate('buttons.signUp')}
                                        </Button>
                                    </>
                                )
                            }
                            {
                                !!user && (
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
                    <Typography color="text.secondary" variant="body2">{translate('labels.selectYourCountry')}</Typography>
                    <CountrySelectorComponent />
                    <Stack direction="row" alignItems="center" gap={0.5} mt={4}>
                        <Typography>{translate('footer.builtWith')} </Typography>
                        <Favorite color="error" sx={{ fontSize: '18px' }} />
                        <Typography>{translate('footer.for')}</Typography>
                        <Typography sx={{ fontWeight: 'bold' }} color='inherit' component={Link} href="https://www.mashreqbank.com/" target="_blank">
                            {translate('brandName')}
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </SessionProviderComponent>
    )
}

export default AppLayout
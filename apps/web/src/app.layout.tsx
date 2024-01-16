import { Favorite } from "@mui/icons-material";
import { AppBar, Avatar, Box, Container, Link, Stack, Toolbar, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import CountrySelectorComponent from "./components/country-selector/country-selector.component";
import ProfileMenuComponent from "./components/profile-menu/profile-menu.component";
import ToolbarActionsComponent from "./components/toolbar-actions/toolbar-actions.component";
import SessionProviderComponent, { Session } from "./providers/session-provider/session-provider.component";
import { getApiBaseUrl } from "./util";
import { useEffect } from "react";
import { Capacitor } from '@capacitor/core';
import {
    ActionPerformed,
    PushNotificationSchema,
    PushNotifications,
    Token,
} from '@capacitor/push-notifications';
const AppLayout = () => {
    const [cookies] = useCookies(['mq-at']);
    const accessToken = cookies["mq-at"];
    const { data: user, exp: expiryTime = 0 } = (accessToken && jwtDecode(accessToken)) || {};
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    /**
     * Converting expiry time to milliseconds
     */
    const isExpired = expiryTime * 1000 < Date.now();
    const { t: translate } = useTranslation();
    const session: Session | null = isExpired ? null : {
        user,
        jwt: accessToken
    }
    useEffect(() => {
        if (isPushNotificationsAvailable) {
            // Request permission to use push notifications
            // iOS will prompt user and return if they granted permission or not
            // Android will just grant without prompting
            PushNotifications.requestPermissions().then(result => {
                if (result.receive === 'granted') {
                    // Register with Apple / Google to receive push via FCM (Firebase Cloud Messaging)
                } else {
                    // Show some error
                }
            });

            PushNotifications.addListener('registration', (token: Token) => {
                alert('Push registration success, token: ' + token.value);
            });

            PushNotifications.addListener('registrationError', (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            });

            PushNotifications.addListener(
                'pushNotificationReceived',
                (notification: PushNotificationSchema) => {
                    alert('Push received: ' + JSON.stringify(notification));
                },
            );

            PushNotifications.addListener(
                'pushNotificationActionPerformed',
                (notification: ActionPerformed) => {
                    alert('Push action performed: ' + JSON.stringify(notification));
                },
            );
        }
    }, [isPushNotificationsAvailable])
    return (
        <SessionProviderComponent session={session}>
            <AppBar component='header' position="sticky">
                <Toolbar>
                    <Stack sx={{ width: '100%' }} direction="row" gap={2} alignItems="center">
                        <Avatar to="/" component={NavLink} variant="rounded" src="logo.png" />
                        <Stack gap={0}>
                            <Typography variant="h6">{translate('brandName')}</Typography>
                            <Typography variant="caption" mt={-0.5}>{translate('appBar.onlineBanking')}</Typography>
                        </Stack>
                        <Box flexGrow={1}></Box>
                        <Stack direction="row" gap={1}>
                            {
                                !session && (
                                    <ToolbarActionsComponent />
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
                    <Stack alignItems="center" mt={5} mb={2}>
                        <Typography variant="caption">
                            Api Host
                        </Typography>
                        <Typography variant="caption">
                            {getApiBaseUrl()}
                        </Typography>
                        <Typography variant="caption">(1.0.0)</Typography>
                    </Stack>
                </Stack>
            </Container>
        </SessionProviderComponent>
    )
}

export default AppLayout
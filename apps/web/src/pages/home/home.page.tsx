import { AddCircleOutline, LoginOutlined } from '@mui/icons-material';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { User } from '../../common.type';
import { useSession } from '../../hooks/session.hook';
import { Session } from '../../providers/session-provider/session-provider.component';
import { useEffect } from 'react';
const HomePage = () => {
    const session = useSession();
    const { user } = session ?? {} as Session;
    const { username, id } = user || {} as User;
    const { t: translate } = useTranslation();
    useEffect(() => {
        document.title = translate('homePage.title');
    }, [])
    return (
        <Stack alignItems="center" gap={4}>
            <Avatar sx={{ width: 96, height: 96 }} variant="rounded" src="./logo.png" />
            <Stack alignItems="center" gap={2}>
                <Typography variant='h3' textAlign="center">{translate('homePage.labels.onlineBankingSolution')}</Typography>
            </Stack>
            {
                !user && (
                    <Stack direction="row" gap={2}>
                        <Button component={NavLink} startIcon={<AddCircleOutline />} to="/signup" variant="contained" disableElevation size='large'>
                            {translate('buttons.signUp')}
                        </Button>
                        <Button component={NavLink} startIcon={<LoginOutlined />} to="/signin" variant="outlined" size='large'>
                            {translate('buttons.signIn')}
                        </Button>
                    </Stack>
                )
            }
            {
                !!user && (
                    <Stack alignItems="center" gap={2}>
                        <Avatar sx={{ width: 48, height: 48 }} src={`https://api.multiavatar.com/${id}.png`} />
                        <Stack alignItems="center">
                            <Typography>{translate('labels.welcome')}</Typography>
                            <Typography variant='h5'>{username}</Typography>
                        </Stack>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default HomePage
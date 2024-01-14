import { Stack, Avatar, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSession } from '../../hooks/session.hook';
import { Session } from '../../providers/session-provider/session-provider.component';
import { User } from '../../common.type';
import { AddCircleOutline, AddOutlined, LoginOutlined } from '@mui/icons-material';
const HomePage = () => {
    const session = useSession();
    const { user } = session ?? {} as Session;
    const { username, id } = user || {} as User;
    return (
        <Stack alignItems="center" gap={4}>
            <Avatar sx={{ width: 96, height: 96 }} variant="rounded" src='https://asset.brandfetch.io/idq9Bao8gh/idR1M73xhS.png' />
            <Stack alignItems="center" gap={2}>
                {/* <Typography variant='h5'>mashreq</Typography> */}
                <Typography variant='h3' textAlign="center">Online Banking Solution</Typography>
            </Stack>
            {
                !user && (
                    <Stack direction="row" gap={2}>
                        <Button component={NavLink} startIcon={<AddCircleOutline />} to="/signup" variant="contained" disableElevation size='large'>
                            Sign up
                        </Button>
                        <Button component={NavLink} startIcon={<LoginOutlined />} to="/signin" variant="outlined" size='large'>
                            Sign in
                        </Button>
                    </Stack>
                )
            }
            {
                !!user && (
                    <Stack alignItems="center" gap={2}>
                        <Avatar sx={{ width: 48, height: 48 }} src={`https://api.multiavatar.com/${id}.png`} />
                        <Stack alignItems="center">
                            <Typography>Welcome</Typography>
                            <Typography variant='h5'>{username}</Typography>
                        </Stack>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default HomePage
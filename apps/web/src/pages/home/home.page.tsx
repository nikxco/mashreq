import { Stack, Avatar, Button, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSession } from '../../hooks/session.hook';
const HomePage = () => {
    const session = useSession();
    return (
        <Stack alignItems="center" gap={4}>
            <Avatar sx={{ width: 96, height: 96 }} variant="rounded" src='https://asset.brandfetch.io/idq9Bao8gh/idR1M73xhS.png' />
            <Stack alignItems="center" gap={2}>
                {/* <Typography variant='h5'>mashreq</Typography> */}
                <Typography variant='h3' textAlign="center">Online Banking Solution</Typography>
            </Stack>
            {
                !session && (
                    <Stack direction="row" gap={2}>
                        <Button component={NavLink} to="/signup" variant="contained" disableElevation size='large'>
                            Sign up
                        </Button>
                        <Button component={NavLink} to="/signin" variant="outlined" size='large'>
                            Sign in
                        </Button>
                    </Stack>
                )
            }
            {
                !!session && (
                    <Stack alignItems="center" gap={2}>
                        <Avatar sx={{ width: 48, height: 48 }} src={`https://api.multiavatar.com/${session.id}.png`} />
                        <Stack alignItems="center">
                            <Typography>Welcome</Typography>
                            <Typography variant='h5'>{session.username}</Typography>
                        </Stack>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default HomePage
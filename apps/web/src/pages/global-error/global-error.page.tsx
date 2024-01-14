import { ArrowBackOutlined } from "@mui/icons-material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Avatar, Button, Container, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
const GlobalErrorPage = () => {
    return (
        <Container maxWidth="xs" sx={{ py: 4 }}>
            <Stack alignItems="center" gap={4}>
                <Avatar sx={{ width: 132, height: 132 }}>
                    <ErrorOutlineIcon sx={{ fontSize: 96 }} color='inherit' />
                </Avatar>
                <Stack alignItems="center" gap={1}>
                    <Typography variant='h5' textAlign="center">Ooops!</Typography>
                    <Typography variant="h4" textAlign="center">Something went wrong</Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">We are working hard to fix the issue, plese check back in sometime.</Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <Button variant="contained" disableElevation startIcon={<ArrowBackOutlined />} component={NavLink} to="/" size="large">
                        Got home
                    </Button>
                    <Button variant="outlined" size="large" onClick={() => window.location.reload()}>
                        Reload
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}

export default GlobalErrorPage
import { ArrowBackOutlined } from "@mui/icons-material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Avatar, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
const GlobalErrorPage = () => {
    const { t: translate } = useTranslation();
    useEffect(() => {
        document.title = translate('globalErrorPage.title');
    }, [])
    return (
        <Container maxWidth="xs" sx={{ py: 4 }}>
            <Stack alignItems="center" gap={4}>
                <Avatar sx={{ width: 132, height: 132 }}>
                    <ErrorOutlineIcon sx={{ fontSize: 96 }} color='inherit' />
                </Avatar>
                <Stack alignItems="center" gap={1}>
                    <Typography variant='h5' textAlign="center">{translate('globalErrorPage.labels.ooops')}</Typography>
                    <Typography variant="h4" textAlign="center">{translate('globalErrorPage.labels.somethingWentWrong')}</Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">{translate('globalErrorPage.message')}</Typography>
                </Stack>
                <Stack direction="row" gap={2}>
                    <Button variant="contained" disableElevation startIcon={<ArrowBackOutlined />} component={NavLink} to="/" size="large">
                        {translate('buttons.goHome')}
                    </Button>
                    <Button variant="outlined" size="large" onClick={() => window.location.reload()}>
                        {translate('buttons.reload')}
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}

export default GlobalErrorPage
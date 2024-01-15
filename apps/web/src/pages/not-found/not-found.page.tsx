import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Avatar, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
const NotFoundPage = () => {
    const { t: translate } = useTranslation();
    useEffect(() => {
        document.title = translate('notFoundPage.title');
    }, [])
    return (
        <Container maxWidth="xs">
            <Stack alignItems="center" gap={4}>
                <Avatar sx={{ width: 132, height: 132 }}>
                    <BrokenImageIcon sx={{ fontSize: 96 }} color='inherit' />
                </Avatar>
                <Typography variant='h4'>{translate('notFoundPage.labels.notFound')}</Typography>
            </Stack>
        </Container>
    )
}

export default NotFoundPage
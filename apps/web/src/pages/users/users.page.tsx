import { Avatar, Card, CardContent, List, ListItem, ListItemAvatar, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLoaderData } from 'react-router-dom';
const UsersPage = () => {
    const theme = useTheme();
    const users = useLoaderData() as any[];
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t: translate } = useTranslation();
    return (
        <Card variant={isMobile ? 'flat' : 'elevation'}>
            <CardContent>
                <Typography variant="h4" mx={1}>
                    {
                        translate('usersPage.pageTitle')
                    }
                </Typography>
                <List>
                    {
                        users?.map(({ id, username, createdOn }) => {
                            return (
                                <ListItem key={id}>
                                    <ListItemAvatar>
                                        <Avatar src={`https://api.multiavatar.com/${id}.png`}>N</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={username} secondary={`Created On: ${new Date(createdOn).toLocaleDateString()}`} />
                                </ListItem>

                            )
                        })
                    }
                </List>

            </CardContent>
        </Card>
    )
}

export default UsersPage
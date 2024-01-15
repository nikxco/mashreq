import {
    Avatar, Card, CardContent, List, ListItem,
    ListItemAvatar, ListItemIcon, ListItemText,
    Skeleton, Typography, useMediaQuery, useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '../../common.type';
import AppSnackbarComponent from '../../components/app-snackbar/app-snackbar.component';
import { useAppSnackbar } from '../../hooks/app-snackbar.hook';
import { useSession } from '../../hooks/session.hook';
import { HttpStatus } from '../../http.contstant';
import { Session } from '../../providers/session-provider/session-provider.component';
import { getAllUsers } from '../../services/users.service';
const UsersPage = () => {
    const theme = useTheme();
    const session = useSession();
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const { jwt } = session ?? {} as Session;
    const { state: { open: isSnackbarOpen, message: snackbarMessage, severity: snackbarSeverity }, closeSnackbar, openSnackbar } = useAppSnackbar();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { t: translate } = useTranslation();
    const hasUsers = users.length > 0
    useEffect(() => {
        getAllUsers(jwt).then((users) => {
            setUsers(users);
        }).catch(({ code }) => {
            openSnackbar({
                message: 'Failed to fetch users',
                severity: 'error'
            });
            if (code === HttpStatus.Unauthorized) {
                window.location.reload();
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [jwt])
    useEffect(() => {
        document.title = translate('usersPage.title');
    }, [])
    return (
        <>
            <Card variant={isMobile ? 'flat' : 'outlined'}>
                <CardContent>
                    <Typography variant="h4" mx={2}>
                        {
                            translate('usersPage.labels.users')
                        }
                    </Typography>
                    <List>
                        {
                            !hasUsers && loading && ([1, 2, 3, 4].map((value) => {
                                return (
                                    <ListItem key={`${value}-loader`}>
                                        <ListItemIcon>
                                            <Skeleton variant='circular' sx={{ height: 48, width: 48 }} />
                                        </ListItemIcon>
                                        <ListItemText primary={<Skeleton variant='text' width={200} />} secondary={<Skeleton width={100} />} />
                                    </ListItem>
                                )
                            })

                            )
                        }
                        {
                            !hasUsers && !loading && (
                                <ListItem>
                                    <ListItemText primary={translate('usersPage.labels.noUsersFound')} />
                                </ListItem>
                            )
                        }
                        {
                            hasUsers && users.map(({ id, username, createdOn }) => {
                                return (
                                    <ListItem key={id}>
                                        <ListItemAvatar>
                                            <Avatar src={`https://api.multiavatar.com/${id}.png`}></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={username} secondary={`${translate('usersPage.labels.createdOn')}: ${new Date(createdOn!).toLocaleDateString()}`} />
                                    </ListItem>

                                )
                            })
                        }
                    </List>

                </CardContent>
            </Card>
            <AppSnackbarComponent open={isSnackbarOpen} severity={snackbarSeverity} message={snackbarMessage} onClose={closeSnackbar} />
        </>
    )
}

export default UsersPage
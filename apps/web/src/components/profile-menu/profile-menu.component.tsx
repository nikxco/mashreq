import { ListAltOutlined, LogoutOutlined } from '@mui/icons-material';
import { Avatar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavLink } from 'react-router-dom';
import { useSession } from '../../hooks/session.hook';
import { Session } from '../../providers/session-provider/session-provider.component';

const ProfileMenuComponent = () => {
    const session = useSession();
    const [cookies, setCookies, removeCookies] = useCookies();
    const [open, setOpen] = useState(false);
    const [anchorElem, setAnchorElem] = useState<null | HTMLButtonElement>();
    const { username, id } = session as Session;
    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElem(event.currentTarget);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setAnchorElem(null);
    }
    const onSignOut = () => {
        removeCookies('mq-at', {
            path: '/'
        });
        handleClose()
    }
    const renderMenu = (
        <Menu open={open} anchorEl={anchorElem} onClose={handleClose}>
            <MenuItem component={NavLink} to="/users" onClick={handleClose}>
                <ListItemIcon>
                    <ListAltOutlined />
                </ListItemIcon>
                <ListItemText primary="All Users" />
            </MenuItem>
            <MenuItem onClick={onSignOut}>
                <ListItemIcon>
                    <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
            </MenuItem>
        </Menu>
    )
    return (
        <>
            <Tooltip title={username}>
                <IconButton onClick={handleOpen}>
                    <Avatar sx={{ width: 32, height: 32 }} src={`https://api.multiavatar.com/${id}.png`} />
                </IconButton>
            </Tooltip>
            {renderMenu}
        </>
    )
}

export default ProfileMenuComponent
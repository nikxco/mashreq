import { MoreOutlined, MoreVert } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import React, { MouseEvent, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const ToolbarActionsComponent = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const { t: translate } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setAnchorEl(null);
    }

    const renderMobileMenu = (
        <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
            <MenuItem component={NavLink} to="/signin" onClick={handleClose}>
                {translate('buttons.signIn')}
            </MenuItem>
            <MenuItem component={NavLink} to="/signup" onClick={handleClose}>
                {translate('buttons.signUp')}
            </MenuItem>
        </Menu>
    )
    return (
        <>
            {
                isMobile && (
                    <>
                        <IconButton onClick={handleOpen} color='inherit'>
                            <MoreVert />
                        </IconButton>
                        {renderMobileMenu}
                    </>
                )
            }
            {
                !isMobile && (
                    <>
                        <Button component={NavLink} to="/signin" color="inherit">
                            {translate('buttons.signIn')}
                        </Button>
                        <Button component={NavLink} to="/signup" color="inherit">
                            {translate('buttons.signUp')}
                        </Button>
                    </>
                )
            }
        </>
    )
}

export default ToolbarActionsComponent
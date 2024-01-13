import { AppBar, Avatar, Box, Container, Stack, Toolbar, Typography } from "@mui/material"
import { Outlet } from "react-router-dom"
import CountrySelectorComponent from "./components/country-selector/country-selector.component"

const AppLayout = () => {
    return (
        <>
            <AppBar component='header' position="sticky">
                <Toolbar>
                    <Stack sx={{ width: '100%' }} direction="row" gap={2} alignItems="center">

                        <Avatar variant="rounded" src='https://asset.brandfetch.io/idq9Bao8gh/idR1M73xhS.png' />
                        <Stack gap={0}>
                            <Typography variant="h6">mashreq</Typography>
                            <Typography variant="caption" mt={-0.5} color="text.secondary">Netbanking</Typography>
                        </Stack>
                        <Box flexGrow={1}></Box>
                        <Stack>
                            <CountrySelectorComponent />
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </>

    )
}

export default AppLayout
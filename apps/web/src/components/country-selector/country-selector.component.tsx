import {
    Avatar, Button, Dialog, DialogActions,
    DialogContent, DialogTitle, List, ListItemButton,
    ListItemIcon, ListItemText, Slide, useMediaQuery,
    useTheme
} from "@mui/material"
import { TransitionProps } from "@mui/material/transitions"
import { MouseEvent, ReactElement, Ref, forwardRef, useState } from "react"
import { useBasename } from "../../hooks/basename.hook"
import { DefaultCountryCode, basenameToCountry, countryToBasename, getSupportedContries } from "../../util"

export type Country = {
    code: string,
    name: string,
    locale: string,
    basename: string
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: ReactElement<any, any>;
    },
    ref: Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const CountrySelectorComponent = () => {
    const supportedCountries: Country[] = getSupportedContries();
    const [open, setOpen] = useState(false);
    const selectedBasename = useBasename();
    const theme = useTheme();
    const selectedCountry = basenameToCountry(selectedBasename);
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setOpen(true);
    }
    const onClose = () => {
        setOpen(false);
    }
    const onSelect = (country: Country) => {
        onClose();
        const newBasename = country.code === DefaultCountryCode ? '/' : countryToBasename(country);
        window.location.replace(newBasename);
    }
    const isSelected = (country: Country) => {
        const value = countryToBasename(country);
        return value === selectedBasename;
    }
    const renderFlagIcon = (country: Country) => {
        const { code } = country;
        return (
            <Avatar
                variant="rounded"
                sx={{ width: 24, height: 24 }}
                src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${code}.svg`}
            />
        )
    }
    return (
        <>
            <Button color="inherit" variant="outlined" onClick={onOpen} startIcon={renderFlagIcon(selectedCountry)}>
                {
                    selectedCountry.name
                }
            </Button>
            <Dialog open={open} onClose={onClose} TransitionComponent={Transition} fullWidth maxWidth="xs" fullScreen={fullScreen}>
                <DialogTitle>
                    Select your country
                </DialogTitle>
                <DialogContent>
                    <List>
                        {
                            supportedCountries.map((country) => {
                                const { code, name } = country
                                const label = name;
                                return (
                                    <ListItemButton onClick={() => onSelect(country)} key={code} selected={isSelected(country)}>
                                        <ListItemIcon>
                                            {renderFlagIcon(country)}
                                        </ListItemIcon>
                                        <ListItemText primary={label} />
                                    </ListItemButton>
                                )
                            })
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="inherit">Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CountrySelectorComponent
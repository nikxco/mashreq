import { Avatar, Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import { MouseEvent, useState } from "react"
import { useBasename } from "../../hooks/basename.hook"
import { basenameToCountry, countryToBasename, getSupportedContries } from "../../util"

export type Country = {
    code: string,
    name: string,
    locale: string,
    basename: string
}

const CountrySelectorComponent = () => {
    /**
     * This list can be fetched from an api.
     */
    const supportedCountries: Country[] = getSupportedContries();
    const [open, setOpen] = useState(false);
    const [anchorElement, setAnchorElement] = useState<null | HTMLElement>();
    const selectedBasename = useBasename();
    const selectedCountry = basenameToCountry(selectedBasename)
    const onOpen = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElement(event.currentTarget);
        setOpen(true);
    }
    const onClose = () => {
        setOpen(false);
        setAnchorElement(null);
    }
    const onSelect = (country: Country) => {
        onClose();
        const newBasename = countryToBasename(country);
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
            <Menu
                key="country-selector"
                anchorEl={anchorElement}
                open={open}
                onClose={onClose}
            >
                {
                    supportedCountries.map((country) => {
                        const { code, name } = country
                        const label = name;
                        return (
                            <MenuItem onClick={() => onSelect(country)} key={code} selected={isSelected(country)}>
                                <ListItemIcon>
                                    {renderFlagIcon(country)}
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </MenuItem>
                        )
                    })
                }
            </Menu>
        </>
    )
}

export default CountrySelectorComponent
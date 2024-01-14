import { AlertColor } from "@mui/material";
import { useState } from "react";

export const useAppSnackbar = () => {
    const [severity, setSeverity] = useState<AlertColor>("success");
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState<string>("");

    const openSnackbar = (config: { message: string; severity?: AlertColor }) => {
        const { message, severity } = config;
        setIsOpen(true);
        setMessage(message);
        if (severity) {
            setSeverity(severity);
        }
    };

    const closeSnackbar = () => {
        setIsOpen(false);
    };
    return {
        state: { open: isOpen, severity, message },
        openSnackbar,
        closeSnackbar,
    };
};
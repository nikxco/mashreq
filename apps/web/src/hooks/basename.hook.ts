import { useHref } from "react-router-dom";

export const useBasename = () => {
    return useHref('/');
}
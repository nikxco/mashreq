import { useContext } from "react"
import { SessionContext } from "../providers/session-provider/session-provider.component"

export const useSession = () => {
    const context = useContext(SessionContext);
    return context;
}
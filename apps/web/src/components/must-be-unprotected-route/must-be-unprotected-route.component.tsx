import { Navigate } from "react-router-dom";
import { useSession } from "../../hooks/session.hook"
import { ReactNode } from "react";

interface Props {
    redirectPath?: string,
    children: ReactNode
}
const MustBeUnprotectedRouteComponent = ({ redirectPath = '/', children }: Props): any => {
    const session = useSession();
    const { user } = session ?? {};
    if (user) {
        return <Navigate to={redirectPath} replace />;
    }
    return children;
}

export default MustBeUnprotectedRouteComponent
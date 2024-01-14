import { ReactNode } from 'react';
import { useSession } from "../../hooks/session.hook"
import { Navigate } from 'react-router-dom';
interface Props {
    redirectPath?: string,
    children: ReactNode
}
const ProtectedRouteComponent = ({ redirectPath = '/signin', children }: Props): any => {
    const session = useSession();
    if (!session) {
        return <Navigate to={redirectPath} replace />;
    }
    return children;
}

export default ProtectedRouteComponent
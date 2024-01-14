import { ReactNode, createContext } from 'react';
import { User } from '../../common.type';
export type Session = {
    user: User,
    jwt: string
}
type Props = {
    session: any,
    children: ReactNode
}
export const SessionContext = createContext<Session | null>(null);

const SessionProviderComponent = ({ session, children }: Props) => {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}

export default SessionProviderComponent
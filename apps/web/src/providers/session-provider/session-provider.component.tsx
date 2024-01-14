import { ReactNode, createContext } from 'react';
export type Session = {
    id: string,
    username: string
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
import { Session } from "../providers/session-provider/session-provider.component";

export const sessionLoader = async (): Promise<Session | null> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve({
            //     id: '274hf947h2b48j',
            //     username: 'Nadeem1'
            // })
            resolve(null)
        }, 1000)
    });
}
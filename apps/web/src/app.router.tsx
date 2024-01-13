import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./app.layout";
import GlobalErrorPage from "./pages/global-error/global-error.page";
import SignInPage from "./pages/sign-in/sign-in.page";
export const getAppRouter = (basename: string = '/in') => createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <GlobalErrorPage />,
        action: async (data) => {
            console.log('Action function called', data)
        },
        loader: async (data) => {
            return new Promise<any>((resolve, reject) => {
                setTimeout(() => {
                    console.log('Loader resolved', data);
                    resolve(Math.random())
                }, 0)
            })
        },
        children: [
            {
                path: '/',
                element: <SignInPage />
            }
        ]
    }
], {
    basename
});
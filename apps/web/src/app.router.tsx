import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./app.layout";
import ProtectedRouteComponent from "./components/protected-route/protected-route.component";
import { sessionLoader } from "./loaders/session.loader";
import GlobalErrorPage from "./pages/global-error/global-error.page";
import HomePage from "./pages/home/home.page";
import SignInPage from "./pages/sign-in/sign-in.page";
import SignUpPage from "./pages/sign-up/sign-up.page";
import UsersPage from "./pages/users/users.page";
import { usersLoader } from "./loaders/users.loader";
import MustBeUnprotectedRouteComponent from "./components/must-be-unprotected-route/must-be-unprotected-route.component";
export const getAppRouter = (basename: string = '/in') => createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <GlobalErrorPage />,
        action: async (data) => {
            console.log('Action function called', data)
        },
        loader: sessionLoader,
        children: [
            {
                path: '/',
                element: <HomePage />
            }, {
                path: '/signin',
                element: (
                    <MustBeUnprotectedRouteComponent>
                        <SignInPage />
                    </MustBeUnprotectedRouteComponent>
                )
            }, {
                path: '/signup',
                element: (
                    <MustBeUnprotectedRouteComponent>
                        <SignUpPage />
                    </MustBeUnprotectedRouteComponent>
                )
            }, {
                path: '/users',
                loader: usersLoader,
                element: (
                    <ProtectedRouteComponent>
                        <UsersPage />
                    </ProtectedRouteComponent>
                )
            }
        ]
    }
], {
    basename
});
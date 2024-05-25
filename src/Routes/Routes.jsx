import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Overview from "../Pages/Overview";
import CreateSuperAdmin from "../Pages/CreateSuperAdmin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path:'/',
                element:<Overview/>
            },
            {
                path:'/create-super-admin',
                element:<CreateSuperAdmin/>
            },
        ]
    },
])
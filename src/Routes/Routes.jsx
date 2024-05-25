import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard/>,
        children:[

        ]
    },
])
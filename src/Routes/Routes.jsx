import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Overview from "../Pages/Overview";
import CreateSuperAdmin from "../Pages/CreateSuperAdmin";
import CreateAdmin from "../Pages/CreateAdmin";
import CreateMentors from "../Pages/CreateMentors";
import AllStudents from "../Pages/AllStudents";
import EventsBaseStudents from "../Pages/EventsBaseStudents";
import AuthenticateStudents from "../Pages/AuthenticateStudents";
import TeacherBaseStudents from "../Pages/TeacherBaseStudents";
import AdmittedStudents from "../Pages/AdmittedStudents";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,
        children: [
            {
                path: '/',
                element: <Overview />
            },
            {
                path: '/create-super-admin',
                element: <CreateSuperAdmin />
            },
            {
                path: '/create-admin',
                element: <CreateAdmin />
            },
            {
                path: '/create-mentors',
                element: <CreateMentors />
            },
            {
                path: '/all-students',
                element: <AllStudents />
            },
            {
                path: '/events-base-students',
                element: <EventsBaseStudents />
            },
            {
                path: '/authenticate-students',
                element: <AuthenticateStudents />
            },
            {
                path: '/teacher-base-students',
                element: <TeacherBaseStudents />
            },
            {
                path: '/admitted-students',
                element: <AdmittedStudents />
            },
        ]
    },
])
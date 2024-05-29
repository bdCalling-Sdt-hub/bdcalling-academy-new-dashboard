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
import StudentsInformation from "../Pages/StudentsInformation";
import DropoutStudents from "../Pages/DropoutStudents";
import AddCategory from "../Pages/AddCategory";
import OfflineCourse from "../Pages/OfflineCourse";
import CourseDetails from "../Pages/CourseDetails";
import Addvideo from "../Pages/Addvideo";
import AddCourse from "../Pages/AddCourse";

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
            {
                path: '/admitted-students/students-information/:id',
                element: <StudentsInformation />
            },
            {
                path: '/dropout-students',
                element: <DropoutStudents />
            },
            {
                path: '/add-category',
                element: <AddCategory />
            },
            {
                path: '/offline-course',
                element: <OfflineCourse />
            },
            {
                path: '/course-details/:id',
                element: <CourseDetails />
            },
            {
                path: '/add-video/:id',
                element: <Addvideo />
            },
            {
                path: '/add-course',
                element: <AddCourse />
            },
        ]
    },
])
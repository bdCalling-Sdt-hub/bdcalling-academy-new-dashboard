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
import UpdateCourse from "../Pages/UpdateCourse";
import OnlineCourses from "../Pages/OnlineCourses";
import VideoCourse from "../Pages/VideoCourse";
import AddVideoCourse from "../Pages/AddVideoCourse";
import AddOnlineCourse from "../Pages/AddOnlineCourse";
import AllTrainer from "../Pages/AllTrainer";
import RequestTrainer from "../Pages/RequestTrainer";
import TrainerReview from "../Pages/TrainerReview";
import VideoCourseExamQuestion from "../Pages/VideoCourseExamQuestion";
import AddBatch from "../Pages/AddBatch";
import AddNewBatch from "../Pages/AddNewBatch";
import UpdateBatch from "../Pages/UpdateBatch";
import AllAdmittedStudent from "../Pages/AllAdmittedStudent";
import AdmittedStudentDetails from "../Pages/AdmittedStudentDetails";
import ClassRoutine from "../Pages/ClassRoutine";
import AddEvents from "../Pages/AddEvents";
import AddNewEvent from "../Pages/AddNewEvent";

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
            {
                path: '/add-video-course',
                element: <AddVideoCourse />
            },
            {
                path: '/add-online-course',
                element: <AddOnlineCourse />
            },
            {
                path: '/update-course/:id',
                element: <UpdateCourse />
            },
            {
                path: '/online-course',
                element: <OnlineCourses />
            },
            {
                path: '/video-course',
                element: <VideoCourse />
            },
            {
                path: '/all-trainer',
                element: <AllTrainer />
            },
            {
                path: '/request-trainer',
                element: <RequestTrainer />
            },
            {
                path: '/trainer-review',
                element: <TrainerReview />
            },
            {
                path: '/video-course-exam-question/:id',
                element: <VideoCourseExamQuestion />
            },
            {
                path: '/add-batch',
                element: <AddBatch />
            },
            {
                path: '/add-batch/add',
                element: <AddNewBatch />
            },
            {
                path: '/add-batch/update',
                element: <UpdateBatch />
            },
            {
                path: '/all-admitted-student/:id',
                element: <AllAdmittedStudent />
            },
            {
                path: '/admitted-student-details/:id',
                element: <AdmittedStudentDetails />
            },
            {
                path: '/class-routine',
                element: <ClassRoutine />
            },
            {
                path: '/add-events',
                element: <AddEvents />
            },
            {
                path: '/add-new-event',
                element: <AddNewEvent />
            },
            {
                path: '/update-event/:id',
                element: <AddNewEvent />
            },
        ]
    },
])
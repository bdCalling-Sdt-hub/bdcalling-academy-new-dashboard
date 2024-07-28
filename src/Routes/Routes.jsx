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
// import UpdateBatch from "../Pages/UpdateBatch";
import AllAdmittedStudent from "../Pages/AllAdmittedStudent";
import AdmittedStudentDetails from "../Pages/AdmittedStudentDetails";
import ClassRoutine from "../Pages/ClassRoutine";
import AddEvents from "../Pages/AddEvents";
import AddNewEvent from "../Pages/AddNewEvent";
import Cost from "../Pages/Cost";
import Wallet from "../Pages/Wallet";
import SuccessStories from "../Pages/SuccessStories";
import UploadSuccessStories from "../Pages/UploadSuccessStories";
import StudentsJourney from "../Pages/StudentsJourney";
import SuccessfulStudents from "../Pages/SuccessfulStudents";
import StudentsReviews from "../Pages/StudentsReviews";
import Studentsgallery from "../Pages/Studentsgallery";
import Settings from "../Pages/Settings";
import Profile from "../Pages/Profile";
import EditProfile from "../Pages/EditProfile";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import TermsAndCondition from "../Pages/TermsAndCondition";
import AboutUs from "../Pages/AboutUs";
import AssociateList from "../Pages/AssociateList";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import Otp from "../Pages/Otp";
import UpdatePassword from "../Pages/UpdatePassword";
import AllSalesStudent from "../Pages/AllSalesStudent";
import CreateRoutine from "../Pages/CreateRoutine";
import SalesAdmittedStudent from "../Pages/SalesAdmittedStudent";
import TrainerAttendance from "../Pages/TrainerAttendance";
import StudentsAttendance from "../Pages/StudentsAttendance";
import ExamResults from "../Pages/ExamResults";
import AssignmentMark from "../Pages/AssignmentMark";
import ProvideClassVideo from "../Pages/ProvideClassVideo";
import AddProvideClassVideo from "../Pages/AddProvideClassVideo";
import Notification from "../Pages/Notification";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import UpdateVideo from "../Pages/UpdateVideo";
import UpdateQuestions from "../Pages/UpdateQuestions";
import UpdateBatch from "../Components/Forms/UpdateBatch";
import UploadGallery from "../Pages/UploadGallery";
import UpdateEventForm from "../Components/Forms/UpdateEventForm";
import AddSalesStudentBatch from "../Pages/AddSalesStudentBatch";
import StudentOverview from "../Pages/StudentOverview";
import StudentCourseVideo from "../Pages/StudentCourseVideo";
import StudentsCourse from "../Pages/StudentsCourse";
import StudentCourseExam from "../Pages/StudentCourseExam";
import StudentExamResult from "../Pages/StudentExamResult";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivetRoute><Dashboard /></PrivetRoute>,
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
                path: '/admitted-students/students-information/:id/:batch',
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
                path: '/add-sales-student-batch',
                element: <AddSalesStudentBatch />
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
                element: <UpdateEventForm />
            },
            {
                path: '/cost',
                element: <Cost />
            },
            {
                path: '/wallet',
                element: <Wallet />
            },
            {
                path: '/success-stories',
                element: <SuccessStories />
            },
            {
                path: '/upload-success-stories',
                element: <UploadSuccessStories />
            },
            {
                path: '/upload-gallery',
                element: <UploadGallery />
            },
            {
                path: '/students-journey',
                element: <StudentsJourney />
            },
            {
                path: '/successful-students',
                element: <SuccessfulStudents />
            },
            {
                path: '/students-reviews',
                element: <StudentsReviews />
            },
            {
                path: '/students-gallery',
                element: <Studentsgallery />
            },
            {
                path: '/settings',
                element: <Settings />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/edit-profile',
                element: <EditProfile />
            },
            {
                path: '/privacy-policy',
                element: <PrivacyPolicy />
            },
            {
                path: '/terms',
                element: <TermsAndCondition />
            },
            {
                path: '/about-us',
                element: <AboutUs />
            },
            {
                path: '/associate-list',
                element: <AssociateList />
            },
            {
                path: '/all-sales-students',
                element: <AllSalesStudent />
            },
            {
                path: '/create-routine',
                element: <CreateRoutine />
            },
            {
                path: '/sales-admitted-student',
                element: <SalesAdmittedStudent />
            },
            {
                path: '/trainer-attendance',
                element: <TrainerAttendance />
            },
            {
                path: '/students-attendance',
                element: <StudentsAttendance />
            },
            {
                path: '/exam-result',
                element: <ExamResults />
            },
            {
                path: '/assignment-result',
                element: <AssignmentMark />
            },
            {
                path: '/provide-class-video',
                element: <ProvideClassVideo />
            },
            {
                path: '/add-provide-class-video',
                element: <AddProvideClassVideo />
            },
            {
                path: '/notification',
                element: <Notification />
            },
            {
                path: '/update-video/:id',
                element: <UpdateVideo />
            },
            {
                path: '/update-question/:id',
                element: <UpdateQuestions />
            },
            {
                path: '/update-batch/:id',
                element: <UpdateBatch />
            },
        ]
    },
    {
        path: '/student',
        element: <Dashboard />,
        children: [
            {
                path: '/student/student-dashboard',
                element: <StudentOverview />
            },
            {
                path: '/student/student-course-video',
                element: <StudentCourseVideo />
            },
            {
                path: '/student/student-course',
                element: <StudentsCourse />
            },
            {
                path: '/student/course-exam',
                element: <StudentCourseExam />
            },
            {
                path: '/student/course-exam-result',
                element: <StudentExamResult />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/otp',
        element: <Otp />
    },
    {
        path: '/update-password',
        element: <UpdatePassword />
    },
])
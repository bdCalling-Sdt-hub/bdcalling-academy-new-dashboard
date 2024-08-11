
import { AiTwotoneIdcard } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { BsCollection } from "react-icons/bs";
import { CiCalendarDate, CiImageOn, CiSettings, CiWallet } from "react-icons/ci";
import { FaRegUserCircle, FaUsers } from "react-icons/fa";
import { FaUserGraduate, FaUserGroup } from "react-icons/fa6";
import { HiOutlineIdentification } from "react-icons/hi";
import { IoBookOutline, IoBookSharp, IoSettings, IoWalletOutline } from "react-icons/io5";
import { MdCoPresent, MdDashboard } from "react-icons/md";
import { PiCertificate, PiStudentThin } from "react-icons/pi";
import { TbStarsFilled } from "react-icons/tb";
export const SideberLink = [
    {
        menu: 'Dashboard',
        icon: MdDashboard,
        link: '/'
    },
    {
        menu: 'User',
        icon: FaUserGroup,
        link: false,
        dropDown: [
            {
                menu: 'Create Super Admin',
                link: '/create-super-admin'
            },
            {
                menu: 'Create Admin',
                link: '/create-admin'
            },
        ]
    },
    {
        menu: 'All Students Type',
        icon: FaUserGroup,
        link: false,
        dropDown: [
            {
                menu: 'All Students',
                link: '/all-students'
            },
            {
                menu: 'Events Base Students',
                link: '/events-base-students'
            },
            {
                menu: 'Authenticate Students',
                link: '/authenticate-students'
            },
            {
                menu: 'Teacher Base Students',
                link: '/teacher-base-students'
            },
        ]
    },
    {
        menu: 'Admitted Students',
        icon: IoBookOutline,
        link: '/admitted-students'
    },
    {
        menu: 'Dropout Students',
        icon: FaUserGraduate,
        link: '/dropout-students'
    },
    {
        menu: 'Add category',
        icon: BiCategoryAlt,
        link: '/add-category'
    },
    {
        menu: 'Add Course',
        icon: BsCollection,
        link: false,
        dropDown: [
            {
                menu: 'Offline Course',
                link: '/offline-course'
            },
            {
                menu: 'Online Course',
                link: '/online-course'
            },
            {
                menu: 'Video Course',
                link: '/video-course'
            },
        ]
    },
    {
        menu: 'Request Trainer',
        icon: FaRegUserCircle,
        link: false,
        dropDown: [
            {
                menu: 'All Trainer',
                link: '/all-trainer'
            },
            {
                menu: 'Request Trainer ',
                link: '/request-trainer'
            },
            {
                menu: 'Trainer Review',
                link: '/trainer-review'
            },
        ]
    },
    {
        menu: 'Add Batch',
        icon: IoBookOutline,
        link: '/add-batch'
    },
    {
        menu: 'Class Routine',
        icon: HiOutlineIdentification,
        link: '/class-routine'
    },
    {
        menu: 'Add Events',
        icon: CiCalendarDate,
        link: '/add-events'
    },
    {
        menu: 'Include Cost',
        icon: IoWalletOutline,
        link: '/cost'
    },
    {
        menu: 'Wallet',
        icon: CiWallet,
        link: '/wallet'
    },
    {
        menu: 'Successful Students',
        icon: FaUsers,
        link: false,
        dropDown: [
            {
                menu: 'Success Stories',
                link: '/success-stories'
            },
            {
                menu: 'Students Journey ',
                link: '/students-journey'
            },
            {
                menu: 'Successful Students',
                link: '/successful-students'
            },
        ]
    },
    {
        menu: 'Sales Students',
        icon: FaRegUserCircle,
        link: false,
        dropDown: [
            {
                menu: 'All Students',
                link: '/all-sales-students'
            },
            {
                menu: 'Add Batch',
                link: '/add-sales-student-batch'
            },
            {
                menu: 'Create Routine',
                link: '/create-routine'
            },
            {
                menu: 'Admitted Students',
                link: '/sales-admitted-student'
            },
        ]
    },
    {
        menu: 'Show Batch',
        icon: AiTwotoneIdcard,
        link: false,
        dropDown: [
            // {
            //     menu: 'Trainer Attendance',
            //     link: '/trainer-attendance'
            // },
            {
                menu: 'Students Attendance',
                link: '/students-attendance'
            },
            // {
            //     menu: 'Exam Results',
            //     link: '/exam-result'
            // },
            // {
            //     menu: 'Assignment Results',
            //     link: '/assignment-result'
            // },
            // {
            //     menu: 'Provide class video',
            //     link: '/provide-class-video'
            // },
        ]
    },
    {
        menu: 'Students Reviews',
        icon: CiSettings,
        link: '/students-reviews'
    },
    {
        menu: 'Our Gallery',
        icon: CiImageOn,
        link: '/students-gallery'
    },
    {
        menu: 'Settings',
        icon: IoSettings,
        link: '/settings'
    },
]
export const AdminSideberLink = [
    {
        menu: 'Dashboard',
        icon: MdDashboard,
        link: '/'
    },
    {
        menu: 'User',
        icon: FaUserGroup,
        link: false,
        dropDown: [
            {
                menu: 'Create Admin',
                link: '/create-admin'
            },
        ]
    },
    {
        menu: 'All Students Type',
        icon: FaUserGroup,
        link: false,
        dropDown: [
            {
                menu: 'All Students',
                link: '/all-students'
            },
            {
                menu: 'Events Base Students',
                link: '/events-base-students'
            },
            {
                menu: 'Authenticate Students',
                link: '/authenticate-students'
            },
            {
                menu: 'Teacher Base Students',
                link: '/teacher-base-students'
            },
        ]
    },
    {
        menu: 'Admitted Students',
        icon: IoBookOutline,
        link: '/admitted-students'
    },
    {
        menu: 'Dropout Students',
        icon: FaUserGraduate,
        link: '/dropout-students'
    },
    {
        menu: 'Add category',
        icon: BiCategoryAlt,
        link: '/add-category'
    },
    {
        menu: 'Add Course',
        icon: BsCollection,
        link: false,
        dropDown: [
            {
                menu: 'Offline Course',
                link: '/offline-course'
            },
            {
                menu: 'Online Course',
                link: '/online-course'
            },
            {
                menu: 'Video Course',
                link: '/video-course'
            },
        ]
    },
    {
        menu: 'Request Trainer',
        icon: FaRegUserCircle,
        link: false,
        dropDown: [
            {
                menu: 'All Trainer',
                link: '/all-trainer'
            },
            {
                menu: 'Request Trainer ',
                link: '/request-trainer'
            },
            {
                menu: 'Trainer Review',
                link: '/trainer-review'
            },
        ]
    },
    {
        menu: 'Add Batch',
        icon: IoBookOutline,
        link: '/add-batch'
    },
    {
        menu: 'Class Routine',
        icon: HiOutlineIdentification,
        link: '/class-routine'
    },
    {
        menu: 'Add Events',
        icon: CiCalendarDate,
        link: '/add-events'
    },
    {
        menu: 'Include Cost',
        icon: IoWalletOutline,
        link: '/cost'
    },
    {
        menu: 'Wallet',
        icon: CiWallet,
        link: '/wallet'
    },
    {
        menu: 'Successful Students',
        icon: FaUsers,
        link: false,
        dropDown: [
            {
                menu: 'Success Stories',
                link: '/success-stories'
            },
            {
                menu: 'Students Journey ',
                link: '/students-journey'
            },
            {
                menu: 'Successful Students',
                link: '/successful-students'
            },
        ]
    },
    {
        menu: 'Sales Students',
        icon: FaRegUserCircle,
        link: false,
        dropDown: [
            {
                menu: 'All Students',
                link: '/all-sales-students'
            },
            {
                menu: 'Add Batch',
                link: '/add-sales-student-batch'
            },
            {
                menu: 'Create Routine',
                link: '/create-routine'
            },
            {
                menu: 'Admitted Students',
                link: '/sales-admitted-student'
            },
        ]
    },
    {
        menu: 'Show Batch',
        icon: AiTwotoneIdcard,
        link: false,
        dropDown: [
            // {
            //     menu: 'Trainer Attendance',
            //     link: '/trainer-attendance'
            // },
            {
                menu: 'Students Attendance',
                link: '/students-attendance'
            },
            // {
            //     menu: 'Exam Results',
            //     link: '/exam-result'
            // },
            // {
            //     menu: 'Assignment Results',
            //     link: '/assignment-result'
            // },
            // {
            //     menu: 'Provide class video',
            //     link: '/provide-class-video'
            // },
        ]
    },
    {
        menu: 'Students Reviews',
        icon: CiSettings,
        link: '/students-reviews'
    },
    {
        menu: 'Our Gallery',
        icon: CiImageOn,
        link: '/students-gallery'
    },
    {
        menu: 'Settings',
        icon: IoSettings,
        link: '/settings'
    },
]
export const studentSideberLink = [
    {
        menu: 'Dashboard',
        icon: MdDashboard,
        link: '/student/student-dashboard'
    },
    {
        menu: 'Course Video',
        icon: FaUserGroup,
        link: '/student/student-course-video'
    },
    {
        menu: 'Trainer Feedback',
        icon: IoBookSharp,
        link: '/student/student-feedback'
    },
    {
        menu: 'Review',
        icon: TbStarsFilled,
        link: '/student/trainer-feedback'
    },
    {
        menu: 'Certificate',
        icon: PiCertificate,
        link: '/student/certificates'
    },
    {
        menu: 'Personal Info',
        icon: PiCertificate,
        link: '/student/personal-information'
    },
]
export const mentorsSideberLink = [
    {
        menu: 'Dashboard',
        icon: MdDashboard,
        link: '/teacher/teacher-dashboard'
    },
    {
        menu: 'Attendance',
        icon: MdCoPresent,
        link: '/teacher/all-student-attendance'
    },
    {
        menu: 'Module',
        icon: FaUserGroup,
        link: false,
        dropDown: [
            {
                menu: 'All Module',
                icon: MdDashboard,
                link: '/teacher/all-module'
            },
            {
                menu: 'Exam Schedule',
                icon: MdDashboard,
                link: '/teacher/all-exam-schedule'
            },
            {
                menu: 'Create assignments',
                icon: MdDashboard,
                link: '/teacher/all-assignments-schedule'
            },
            {
                menu: 'Provided Class Video',
                icon: MdDashboard,
                link: '/teacher/provided-class-video'
            },
        ]
    },
    {
        menu: 'Batch List',
        icon: FaUserGroup,
        link: false,
        dropDown: [
            {
                menu: 'Class Routine',
                icon: MdDashboard,
                link: '/teacher/class-routine'
            },
            {
                menu: 'Class Leave Request',
                icon: MdDashboard,
                link: '/teacher/class-leave-request'
            },
            // {
            //     menu: 'Students Attendance ',
            //     icon: MdDashboard,
            //     link: '/teacher/student-attendance'
            // },
            {
                menu: 'Provide Exam Result',
                icon: MdDashboard,
                link: '/teacher/exam-result'
            },
        ]
    },

    {
        menu: 'All Student',
        icon: PiStudentThin,
        link: '/teacher/all-student'
    },
    {
        menu: 'Personal Information',
        icon: FaRegUserCircle,
        link: '/teacher/personal-information'
    },
]
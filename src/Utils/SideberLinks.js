
import { BiCategoryAlt } from "react-icons/bi";
import { BsCollection } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { FaUserGraduate, FaUserGroup } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
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
            {
                menu: 'Create Mentors',
                link: '/create-mentors'
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
            // {
            //     menu: 'Trainer Per Class Payment',
            //     link: '#'
            // },
        ]
    },
    {
        menu: 'Add Batch',
        icon: IoBookOutline,
        link: '/add-batch'
    },
]

import { FaUserGroup } from "react-icons/fa6";
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
                menu: 'Create Admin',
                link: '/create-admin'
            },
            {
                menu: 'Create Mentors',
                link: '/create-mentors'
            },
        ]
    },
]
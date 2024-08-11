import React from 'react'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import { Navigate, useLocation } from 'react-router-dom'
const StudentRoutes = ({ children }) => {
    const { useData, loading, isError } = useUserData();
    const location = useLocation()
    if (!localStorage.getItem('token')) {
        return <Navigate state={location.pathname} to={`/login`}></Navigate>
    }
    if (loading) {
        return <p>loading ....</p>
    }
    if (!useData?.email || isError) {
        return <Navigate state={location.pathname} to={`/login`}></Navigate>
    }
    if (useData?.role === 'STUDENT') return children
    if (useData?.role === 'ADMIN') return <Navigate Navigate to={'/'} ></Navigate >
    if (useData?.role === 'MENTOR') return <Navigate to={'/teacher/teacher-dashboard'}></Navigate>
    if (useData?.role === 'SUPER ADMIN') return <Navigate Navigate to={'/'} ></Navigate >
    localStorage.removeItem('token')
    return <Navigate state={location.pathname} to={`/login`}></Navigate>
}

export default StudentRoutes

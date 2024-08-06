import React from 'react'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import { Navigate, useLocation } from 'react-router-dom'
const TeacherRoutes = ({children}) => {
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
    if (useData?.role === 'ADMIN') return
    if (useData?.role === 'MENTOR') return children
    if (useData?.role === 'STUDENT') return <Navigate to={'/student/student-dashboard'}></Navigate>
    if (useData?.role === 'SUPER ADMIN') return <Navigate Navigate to={'/'} ></Navigate >
    localStorage.removeItem('token')
    return <Navigate state={location.pathname} to={`/login`}></Navigate>
}

export default TeacherRoutes

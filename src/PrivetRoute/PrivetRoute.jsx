import React from 'react'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import { Navigate, useLocation } from 'react-router-dom'

const PrivetRoute = ({ children }) => {
    const { useData , loading ,isError} = useUserData();
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
    return children
}

export default PrivetRoute

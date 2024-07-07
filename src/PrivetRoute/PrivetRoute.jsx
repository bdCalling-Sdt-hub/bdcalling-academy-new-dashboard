import React from 'react'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import { Navigate } from 'react-router-dom'

const PrivetRoute = ({ children }) => {
    const { useData , loading} = useUserData()
    if (loading) {
        return <p>loading ....</p>
    }
    if (!useData?.email) {
        return <Navigate to={`/login`}></Navigate>
    }
    return children
}

export default PrivetRoute

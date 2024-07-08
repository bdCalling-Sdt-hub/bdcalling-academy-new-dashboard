import React from 'react'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import { Navigate } from 'react-router-dom'

const PrivetRoute = ({ children }) => {
    const { useData , loading ,isError} = useUserData()
    console.log({ useData , loading ,isError})
    if (loading) {
        return <p>loading ....</p>
    }
    if (!useData?.email || isError) {
        return <Navigate to={`/login`}></Navigate>
    }
    return children
}

export default PrivetRoute

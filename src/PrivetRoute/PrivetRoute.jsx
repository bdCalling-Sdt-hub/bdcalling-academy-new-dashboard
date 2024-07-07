import React from 'react'
import { useUserData } from '../Providers/UserProviders/UserProvider'
import { useNavigate } from 'react-router-dom'

const PrivetRoute = ({ children }) => {
    const navigate = useNavigate()
    const { useData , loading} = useUserData()
    // console.log(useData)
    if (loading) {
        return <p>loading ....</p>
    }
    if (!useData?.email) {
        return navigate('/login')
    }
    return children
}

export default PrivetRoute

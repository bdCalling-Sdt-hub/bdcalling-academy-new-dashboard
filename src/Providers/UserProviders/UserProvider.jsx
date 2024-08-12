import React, { createContext, useContext, useEffect, useState } from 'react'
import useGetRequest from '../../Hooks/useGetRequest';
import useAxiosConfig from '../../AxiosConfig/useAxiosConfig';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
const UserData = createContext()
export const useUserData = () => useContext(UserData);
const UserProvider = ({ children }) => {
    const [useData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [gettingProfile, data, error, refetch, isError,] = useGetRequest('profile', '/profile')
    useEffect(() => {
        if (gettingProfile) { setLoading(true) } else { setLoading(false) }
        if (data) setUserData(data.user)
    }, [gettingProfile, data, isError])
    const [ip, setIP] = useState('');

    return (
        <UserData.Provider value={{ useData, setUserData, loading, setLoading, isError, refetch }}>
            {children}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </UserData.Provider>
    )
}

export default UserProvider

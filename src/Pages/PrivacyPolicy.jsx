
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import useGetRequest from '../Hooks/useGetRequest';
import usePostRequest from '../Hooks/usePostRequest';
const PrivacyPolicy = () => {
    const editor = useRef(null);
    const [requestingAbout, privacy, AboutError,] = useGetRequest('privacy', `/show/privacy`)
    const [content, setContent] = useState('');
    const [isLoading, seLoading] = useState(false)



    useEffect(() => {
        setContent(privacy?.data?.privacy)
    }, [privacy])
    const { mutate, loading, data, error } = usePostRequest('privacy', '/privacy');


    const handleTerms = () => {
        seLoading(true)
        seLoading(true)
        const formData = new FormData()
        formData.append('id', 2)
        formData.append('privacy', content)
        mutate(formData)
    }
    const config = {
        readonly: false,
        placeholder: 'Start typings...',
        style: {
            height: 400,
        }
    }
    return (
        <>
            <div className='flex justify-start items-center gap-2'>
                <Link to={-1} className='text-2xl bg-white p-2 rounded-md'><MdKeyboardArrowLeft /></Link>
                <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F", padding: '40px 0' }}>Privacy Policy</h3>
            </div>
            <div>
                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => { }}
                />
            </div>
            <button disabled={isLoading} onClick={handleTerms} className='disabled:bg-gray-300 bg-blue-400' style={{
                display: 'block',
                padding: '12px 24px',
                margin: "0 auto",
                marginTop: '30px',
                fontWeight: '500',
                color: 'white'
            }}>Save & change</button>
        </>
    )
}

export default PrivacyPolicy
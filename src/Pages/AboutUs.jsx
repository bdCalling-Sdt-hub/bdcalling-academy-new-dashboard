
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import usePostRequest from '../Hooks/usePostRequest';
import useGetRequest from '../Hooks/useGetRequest';

const AboutUs = () => {
    const editor = useRef(null);
    const [requestingAbout, About, AboutError,] = useGetRequest('About', `/show/about`)
    console.log(About)
    const [content, setContent] = useState(About?.data?.about || '');
    useEffect(() => {
        setContent(About?.data?.about)
    }, [About])
    const { mutate, isLoading, data, error } = usePostRequest('about', '/update/about');
    const handleTerms = () => {
        const formData = new FormData()
        formData.append('id', 1)
        formData.append('about', content)
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
                <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F", padding: '40px 0' }}>About Us</h3>
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
}//disabled={isLoading}

export default AboutUs

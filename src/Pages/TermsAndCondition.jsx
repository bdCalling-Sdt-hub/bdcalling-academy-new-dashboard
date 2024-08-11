
import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import useGetRequest from '../Hooks/useGetRequest';
import usePostRequest from '../Hooks/usePostRequest';

const TermsAndCondition = () => {
    const editor = useRef(null);
    const [requestingAbout, terms, AboutError,] = useGetRequest('terms', `/show/terms`)
    const [content, setContent] = useState(terms?.data?.terms_condition ||'');
    const [isLoading, seLoading] = useState(false)


    useEffect(() => {
        setContent(terms?.data?.terms_condition)
    }, [terms])
    const { mutate, loading, data, error } = usePostRequest('terms', '/update/terms');
    const handleTerms = () => {
        // console.log(content)
        seLoading(true)
        const formData = new FormData()
        formData.append('id', 3)
        formData.append('terms_condition', content)
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
                <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F", padding: '40px 0' }}>Terms and Condition</h3>
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
            <button disabled={loading} onClick={handleTerms} className='disabled:bg-gray-300 bg-blue-400' style={{
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

export default TermsAndCondition

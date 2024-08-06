
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const TermsAndCondition = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [isLoading, seLoading] = useState(false)

    const handleTerms = () => {
        seLoading(true)
        dispatch(AddPrivecy({ description: content })).then((res) => {
            seLoading(false)
            if (res.type == 'AddPrivecy/fulfilled') {
                Swal.fire({
                    title: "Added",
                    text: "New Terms has been Added.",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    title: "opps!",
                    text: "something went's wrong",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        })
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

export default TermsAndCondition

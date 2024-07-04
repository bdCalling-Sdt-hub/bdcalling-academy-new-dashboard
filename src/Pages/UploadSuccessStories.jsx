import React, { useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import video from '../assets/video.png'
import toast, { Toaster } from 'react-hot-toast'
import { GoFileSubmodule } from 'react-icons/go'

const UploadSuccessStories = () => {
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false)
    const handleChange = (file) => {
        setFile(file);
    };
    const fileDrop = e => {
        e.preventDefault()
        if (e.dataTransfer.files[0] && e.dataTransfer.files[0]?.type?.includes('video')) {
            setFile(e.dataTransfer.files[0])
            setIsDragging(false)
        } else {
            toast.error("invalid video.")
            setIsDragging(false)
        }
    }
    const onDragOver = e => {
        e.preventDefault()
        setIsDragging(true)
        // console.log(e.dataTransfer.files)
    }
    const onDragLeave = e => {
        e.preventDefault()
        setIsDragging(false)
        // console.log(e.dataTransfer.files)
    }
    // console.log(URL.createObjectURL(file))
    return (
        <div className='mt-4'>
            <p className='text-2xl text-[#333333]'>Upload Success Stories</p>
            <div className='flex justify-start items-center gap-2 mt-2'>
                <p>Home</p> <MdKeyboardArrowRight className='text-blue-400' /> <p className='text-blue-400'>Success Stories</p>
            </div>
            <div style={{
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }} className='mt-16 max-w-2xl mx-auto p-4 mb-10 rounded-md'>
                <div className='flex justify-between items-center'>
                    <div className='flex justify-start items-center gap-2'>
                        <button className='text-2xl p-3 rounded-full bg-white' style={{
                            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
                        }}>
                            <FiUpload />
                        </button>
                        <div>
                            <p className='text-xl font-medium'>Upload Files</p>
                            <p className='text-sm font-medium'>Select file(s) you want to upload</p>
                        </div>
                    </div>
                    <button className='text-2xl'>
                        <RxCross2 />
                    </button>
                </div>
                <label htmlFor='image' onDrop={fileDrop} onDragOver={onDragOver} onDragLeave={onDragLeave} className="cursor-pointer w-full h-[300px] border-2 mt-5 border-blue-400 border-dashed rounded-md p-2 flex flex-col gap-2 justify-center items-center ">
                    {
                        isDragging ? <p className=''>drop ...</p> : file ? <div className='w-full h-full relative' htmlFor='image'> <video className='w-full h-full object-cover' controls autoPlay loop src={URL.createObjectURL(file)}></video>{file && <button onClick={(e) => {
                            e.preventDefault()
                            setFile(null)
                        }} className='text-2xl bg-red-600 text-white p-2 rounded-full absolute right-1 top-1'><RxCross2 /></button>}</div> : <label htmlFor='image' className='flex flex-col gap-2 justify-center items-center cursor-pointer'>
                            <img className='w-14 h-14' src={video} alt="Video Icon" />
                            <p>Drag & Drop Video file</p>
                            <p>or</p>
                            <p className='bg-blue-400 text-white px-4 py-2 rounded-md'>
                                Choose File
                            </p>
                            <input onChange={(e) => setFile(e.target.files[0])} className='hidden' type="file" accept='video/*' name="" id="image" />
                        </label>
                    }

                </label>
                <div className=''>
                    <p className='text-lg font-semibold my-2'>Selected Files (1)</p>
                    {
                        [...Array(3).keys()].map((item) => <div className='bg-[#F5F5F5] flex justify-between items-center gap-2 my-3 p-2' key={item}>
                            <div className='flex justify-start items-center gap-2'>
                                <div className='text-2xl p-3 bg-white rounded-full'>
                                    <GoFileSubmodule />
                                </div>
                                <div className=''>
                                    <p className='font-medium'>Students Success Stories </p>
                                    <p className='text-xs'>150.2 MB of 200.8 MB </p>
                                </div>
                            </div>
                            <button className='text-2xl'>
                                <RxCross2 />
                            </button>
                        </div>)
                    }
                    <div className='flex justify-between items-center gap-2 my-3 mt-6'>
                        <button className='text-blue-500 bg-white border-blue-400 border px-12 py-2 rounded-md'>Cancel</button>
                        <button className='text-white bg-blue-500 px-12 py-2 rounded-md border border-blue-400'>Upload</button>
                    </div>
                </div>
            </div>
            <Toaster
                position="top-center"
            />
        </div>
    )
}

export default UploadSuccessStories

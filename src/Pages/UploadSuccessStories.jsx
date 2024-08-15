import React, { useState } from 'react';// Adjust the import path as needed
import { FiUpload } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { GoFileSubmodule } from 'react-icons/go';
import toast, { Toaster } from 'react-hot-toast';
import video from '../assets/video.png';
import useAxiosConfig from '../AxiosConfig/useAxiosConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

const UploadSuccessStories = () => {
    const [type, SetType] = useState(new URLSearchParams(window.location.search).get('for'))
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const axiosInstance = useAxiosConfig();

    const fileDrop = e => {
        e.preventDefault();
        const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type.includes('video'));
        if (newFiles.length) {
            const updatedFiles = newFiles.map((file) => ({
                file,
                progress: 0,
                size: (file.size / (1024 * 1024)).toFixed(2),
                cancelToken: axios.CancelToken.source(),
                uploadStatus: 'pending',
            }));
            setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
            setIsDragging(false);
        } else {
            toast.error("Invalid video.");
            setIsDragging(false);
        }
    };

    const onDragOver = e => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = e => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleFileChange = e => {
        const newFiles = Array.from(e.target.files).filter(file => file.type.includes('video'));
        if (newFiles.length) {
            const updatedFiles = newFiles.map((file) => ({
                file,
                progress: 0,
                size: (file.size / (1024 * 1024)).toFixed(2),
                cancelToken: axios.CancelToken.source(),
                uploadStatus: 'pending',
            }));
            setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
        }
    };

    const uploadFile = (fileObj) => {
        const data = new FormData();
        data.append('file', fileObj.file);
        data.append('type', type);
        axiosInstance.post('/success/story', data, {
            onUploadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setFiles(prevFiles =>
                    prevFiles.map(f =>
                        f.file.name === fileObj.file.name ? { ...f, progress } : f
                    )
                );
            },
            cancelToken: fileObj.cancelToken.token,
        })
            .then((response) => {
                setFiles(prevFiles =>
                    prevFiles.map(f =>
                        f.file.name === fileObj.file.name ? { ...f, uploadStatus: 'completed' } : f
                    )
                );
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    setFiles(prevFiles =>
                        prevFiles.map(f =>
                            f.file.name === fileObj.file.name ? { ...f, uploadStatus: 'cancelled' } : f
                        )
                    );
                } else {
                    setFiles(prevFiles =>
                        prevFiles.map(f =>
                            f.file.name === fileObj.file.name ? { ...f, uploadStatus: 'failed' } : f
                        )
                    );
                }
            });
    };

    const cancelUpload = (fileObj) => {
        fileObj.cancelToken.cancel();
        setFiles(prevFiles =>
            prevFiles.map(f =>
                f.file.name === fileObj.file.name ? { ...f, uploadStatus: 'cancelled' } : f
            )
        );
    };

    const uploadVideos = () => {
        files.forEach(fileObj => {
            if (fileObj.uploadStatus === 'pending') {
                uploadFile(fileObj);
            }
        });
    };
    const navigate = useNavigate()
    return (
        <div className='mt-4'>
            <p className='text-2xl text-[#333333]'>Upload {type === 'journey' ? 'Student Journey' : `Success Stories`}</p>
            <div className='flex justify-start items-center gap-2 mt-2'>
                <p>Home</p> <MdKeyboardArrowRight className='text-blue-400' /> <p className='text-blue-400'>{type === 'journey' ? 'Student Journey' : `Success Stories`}</p>
            </div>
            <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }} className='mt-16 max-w-2xl mx-auto p-4 mb-10 rounded-md'>
                <div className='flex justify-between items-center'>
                    <div className='flex justify-start items-center gap-2'>
                        <button onClick={() => {
                            navigate(-1)
                        }} className='text-2xl p-3 rounded-full bg-white' style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                            <IoIosArrowBack />
                        </button>
                        <div>
                            <p className='text-xl font-medium'>Upload Files</p>
                            <p className='text-sm font-medium'>Select file(s) you want to upload</p>
                        </div>
                    </div>
                    <button onClick={() => navigate(-1)} className='text-2xl'>
                        <RxCross2 />
                    </button>
                </div>
                <label
                    htmlFor='image'
                    onDrop={fileDrop}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    className="cursor-pointer w-full h-[300px] border-2 mt-5 border-blue-400 border-dashed rounded-md p-2 flex flex-col gap-2 justify-center items-center"
                >
                    {
                        isDragging ? <p className=''>Drop ...</p> :
                            <label htmlFor='image' className='flex flex-col gap-2 justify-center items-center cursor-pointer'>
                                <img className='w-14 h-14' src={video} alt="Video Icon" />
                                <p>Drag & Drop Video file</p>
                                <p>or</p>
                                <p className='bg-blue-400 text-white px-4 py-2 rounded-md'>
                                    Choose File
                                </p>
                                <input onChange={handleFileChange} className='hidden' type="file" accept='video/*' multiple id="image" />
                            </label>
                    }
                </label>
                <div className=''>
                    <p className='text-lg font-semibold my-2'>Selected Files ({files.length})</p>
                    {
                        files.map((fileObj, index) => (
                            <div key={index} className='bg-[#F5F5F5] flex justify-between items-center gap-2 my-3 p-2 relative'>
                                <div className='flex justify-start items-center gap-2'>
                                    <div className='text-2xl p-3 bg-white rounded-full'>
                                        <GoFileSubmodule />
                                    </div>
                                    <div className=''>
                                        <p className='font-medium'>{fileObj.file.name}</p>
                                        <p className='text-xs'>{fileObj.size} MB</p>
                                        <p className={`text-xs ${fileObj.uploadStatus === 'pending' ? 'text-blue-600' : fileObj.uploadStatus === 'completed' ? 'text-green-600' : 'text-red-600'}`}>
                                            {
                                                fileObj.uploadStatus === 'pending' ? `Progress: ${fileObj.progress}%` :
                                                    fileObj.uploadStatus === 'completed' ? 'Upload completed' :
                                                        fileObj.uploadStatus === 'cancelled' ? 'Upload cancelled' :
                                                            fileObj.uploadStatus === 'failed' ? 'Upload failed' :
                                                                ''
                                            }
                                        </p>
                                    </div>
                                </div>
                                {
                                    fileObj.uploadStatus === 'pending' && <button className='text-2xl' onClick={() => cancelUpload(fileObj)}>
                                        <RxCross2 />
                                    </button>
                                }

                                <div
                                    style={{
                                        transition: '1s',
                                        width: `${fileObj.progress}%`
                                    }}
                                    className={`h-1 ${fileObj.uploadStatus === 'pending' ? 'bg-blue-600' : fileObj.uploadStatus === 'completed' ? 'bg-green-600' : 'bg-red-600'} absolute bottom-0 left-0`}>
                                </div>
                            </div>
                        ))
                    }
                    <div className='flex justify-between items-center gap-2 my-3 mt-6'>
                        <button onClick={() => {
                            files.map((fileObj) => cancelUpload(fileObj))
                            setFiles([])
                        }} className='text-blue-500 bg-white border-blue-400 border px-12 py-2 rounded-md'>Cancel</button>
                        <button onClick={uploadVideos} className='text-white bg-blue-500 px-12 py-2 rounded-md border border-blue-400'>Upload</button>
                    </div>
                </div>
                <Toaster position="top-center" />
            </div>
        </div>
    );
};

export default UploadSuccessStories;

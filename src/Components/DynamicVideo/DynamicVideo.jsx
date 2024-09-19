import React from 'react'
import ReactPlayer from 'react-player'

const DynamicVideo = ({file}) => {
    console.log(file)
    return (//?t=${new Date().getTime()}
        // <video autoPlay controls className='w-full h-full object-cover'>
        //     <source src={file} />
        // </video>
        <ReactPlayer url={file} controls className='w-full h-full object-cover'/>
    )
}

export default DynamicVideo

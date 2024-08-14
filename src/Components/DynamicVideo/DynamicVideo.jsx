import React from 'react'

const DynamicVideo = ({file}) => {
    console.log(file)
    return (//?t=${new Date().getTime()}
        <video autoPlay controls className='w-full h-full object-cover'>
            <source src={file} />
        </video>
    )
}

export default DynamicVideo

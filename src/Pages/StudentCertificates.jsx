import certificate from '../assets/certificate.png'

const StudentCertificates = () => {
    return (
        <div className='flex justify-center items-center gap-6 h-screen flex-col relative'>
            <div className='flex justify-between items-center gap-2 w-full absolute left-0 top-4'>
                <p className='text-2xl font-semibold'>Your certificates</p>
                <button className='px-8 py-3 rounded-md text-blue-500 border border-blue-500'>
                    DownLoad
                </button>
            </div>
            <img src={certificate} alt="" />
            <p className='text-4xl font-medium'>You don't have a certificate</p>
            <p>You have no certificate. Browse the course again</p>
            <button className='px-8 py-3 rounded-md bg-blue-500 text-white'>
                Browse courses
            </button>
        </div>
    )
}

export default StudentCertificates

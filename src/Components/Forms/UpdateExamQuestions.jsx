import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useForm } from 'react-hook-form'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom'
// import { formatQuestions } from '../Utils/FormateMcq'
import Input from '../Input/Input'
import { addNewFields, removeNewFields } from '../../Utils/InputPlusActions'
import PageHeading from '../Shared/PageHeading'
import { formatQuestions } from '../../Utils/FormateMcq'
import useGetRequest from '../../Hooks/useGetRequest'
import usePatchRequest from '../../Hooks/usePatchRequest'
import usePostRequest from '../../Hooks/usePostRequest'


const UpdateExamQuestions = () => {
    const { id } = useParams()
    const { mutate: updateModule, isLoading: updateLoading, data: updateData, } = usePostRequest('Module', `/update-quiz/${id}`);
    console.log(`/update-question/${id}`)
    const [requestingQuestions, Questions, QuestionsError, refetch] = useGetRequest('module', `/show-module/${id}`)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [totalQuestions, setTotalQuestions] = useState(Questions?.data?.quiz?.questions.map((item, i) => {
        return { _id: i + 1, question: item?.question, option: item?.options, correctAnswer: item?.correctAnswer }
    }) || [])
    useEffect(() => {
        setTotalQuestions(Questions?.data?.quiz?.questions.map((item, i) => {
            return { _id: i + 1, question: item?.question, option: item?.options, correctAnswer: item?.correctAnswer }
        }) || [])
    }, [Questions?.data?.quiz?.questions])


    const [correctAnswers, setCorrectAnswer] = useState([])//{ 437834: 'answer1-437834' }
    const handelCorrectAnswers = (ans, questionId) => {
        const newAnswers = correctAnswers.filter(item => !(item.hasOwnProperty(questionId)))
        setCorrectAnswer([...newAnswers, { [questionId]: ans }])
    }
    const onSubmit = data => {
        const formate = formatQuestions(correctAnswers, data)
        const formData = new FormData()
        formData.append('questions', formate)
        console.log(data,formate)
        // formData.append('_method', 'PUT')
        return
        updateModule(formData)
    };
    useEffect(() => {
        const correctAnswer = []
        totalQuestions?.map(item => {
            item?.option?.map((item2, i) => {
                if (item?.correctAnswer === item2) {
                    correctAnswer.push({ [item?._id]: `answer${i + 1}-${item?._id}` })
                }
            })
        })
        setCorrectAnswer(correctAnswer)
    }, [totalQuestions])
    return (
        <>
            <PageHeading text={Questions?.data?.module_title} />
            <div className='start-center gap-2 text-[var(--primary-bg)]'>
                <p className='text-[#333333] font-medium'>Home</p> <MdOutlineKeyboardArrowRight className='text-xl' /> <p>Update Exam Question </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='p-6 bg-white rounded-md my-3'>
                {
                    totalQuestions.map((item, index) => <div className='my-5' key={item?._id}>
                        <div className='flex justify-start items-start gap-2'>
                            <div className='w-full'>
                                <Input status={errors} lebel={`${index + 1} . Question`} defaultValue={item?.question} classNames={`border`} placeholder={`Introduction to Dart & Dart Cheatsheet`} rules={{ ...register(`Question-${item?._id}`, { required: true }) }} />
                                {[...Array(4).keys()].map(item2 => <div key={item2}>
                                    <p className='py-1'>answer {item2 + 1}</p>
                                    <div className='flex justify-start items-end gap-2'>
                                        <div style={{
                                            transition: '1s'
                                        }} onClick={() => {
                                            handelCorrectAnswers(`answer${item2 + 1}-${item?._id}`, item._id)
                                        }} className={`w-10 h-10 border rounded ml-auto  ${(correctAnswers.find(activeItem => activeItem[item._id] == `answer${item2 + 1}-${item?._id}`)) ? 'border-green-500' : 'border-red-500'} cursor-pointer`}>
                                            {
                                                (correctAnswers.find(activeItem => activeItem[item._id] == `answer${item2 + 1}-${item?._id}`)) && <img className='w-10 h-10 animate-pulse' src='https://i.ibb.co/4Zff45B/check-mark-1-1.png' alt="" />
                                            }
                                            {/*develop by siyam */}
                                        </div>
                                        <Input status={errors} classNames={`border`} defaultValue={item?.option ? item?.option[item2] : ''} placeholder={`N/A`} rules={{ ...register(`answer${item2 + 1}-${item?._id}`, { required: true }) }} />
                                    </div>
                                </div>)}

                            </div>
                            <button type='button' onClick={() => {
                                removeNewFields(totalQuestions, setTotalQuestions, item?._id, setCorrectAnswer, correctAnswers)
                            }} className="border border-[red] text-[red] text-xl p-[10px] mt-8 px-3 rounded-md hover:scale-105 active:scale-95 transition-all">
                                <RiDeleteBin5Line />
                            </button>
                        </div>
                    </div>)
                }
                <div className='flex justify-end items-center gap-3'>
                    <button onClick={() => {
                        addNewFields(totalQuestions, setTotalQuestions, setCorrectAnswer, correctAnswers)
                    }} className='btn-primary max-w-[95%] mx-auto mt-6 ' type='button'>Add Another Field</button>
                </div>
                <div className=' text-center'>
                    <button type='button' className='max-w-44 mt-6 mx-4 bg-[#F7D4D8] border border-[#FA1131] text-[#FA1131] py-2 px-10 rounded-md hover:scale-105 active:scale-95'>Cancel</button>
                    <button className=' max-w-44 mt-6 mx-4 bg-[var(--primary-bg)] text-white py-2 px-10 rounded-md hover:scale-105 active:scale-95'>Submit</button>
                </div>
            </form>
        </>
    )
}
export default UpdateExamQuestions

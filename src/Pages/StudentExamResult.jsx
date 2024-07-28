import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from 'react-icons/md';
import { Link } from 'react-router-dom';

const questions = [
    {
        question: "1What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"]
    },
    {
        question: "2Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"]
    },
    {
        question: "3What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"]
    },
    {
        question: "4Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"]
    },
    {
        question: "5What is the speed of light?",
        options: ["299,792 km/s", "150,000 km/s", "1,080,000 km/s", "30,000 km/s"]
    },
    {
        question: "6What is the smallest prime number?",
        options: ["1", "2", "3", "5"]
    },
    {
        question: "7Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Korea", "Vietnam"]
    },
    {
        question: "8What is the main ingredient in guacamole?",
        options: ["Tomato", "Onion", "Avocado", "Pepper"]
    },
    {
        question: "9Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Gold", "Silver", "Iron"]
    },
    {
        question: "10Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "11Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "12Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "13Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "14Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "15Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "16Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "17Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "18Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "19Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "20Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "21Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
    {
        question: "22Who painted the Mona Lisa?",
        options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"]
    },
];
const StudentExamResult = () => {
    const [current, setCurrent] = useState(0)
    return (
        <>
            <div className='flex justify-start items-center gap-2 my-4'>
                <Link to={-1} className='text-2xl'>
                    <MdOutlineArrowBackIosNew />
                </Link>
                <p className='text-[22px] font-semibold'>Ice Breaking Session module Test</p>
                <p className='ml-5 text-lg'>{current + 1}/{Math.ceil(questions?.length / 4)}</p>
            </div>
            <div>
                {questions.slice(current * 4, current * 4 + 4).map((q, index) => (
                    <div
                        key={index}

                    >
                        <p className='text-lg font-medium mt-3'><strong>{current * 4 + index + 1} . </strong> {q.question}</p>
                        <div className='flex justify-start items-start gap-2 flex-col'>
                            {q.options.map((option, idx) => (
                                <div className='text-base flex justify-start items-center gap-3' key={idx} ><span className={`h-5 w-5 border-gray-400 border rounded-md flex justify-center items-center`}>
                                    <FaCheck />
                                </span> {option}</div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className='flex justify-center items-center gap-2'>
                    {
                        current !== 0 && <button type='button' onClick={() => {
                            if (current !== 0) setCurrent(current - 1)
                        }} disabled={current === 0} className='flex justify-center items-center gap-2 w-44 border-blue-500 rounded-md py-3 border text-blue-500 disabled:bg-gray-400 disabled:text-black disabled:border-gray-400'><MdOutlineArrowBackIosNew className='-mb-[2px]' /> Previous</button>
                    }
                    {
                        current !== (Math.ceil(questions?.length / 4) - 1) && <button type='button' onClick={() => {
                            if (current !== (Math.ceil(questions?.length / 4) - 1)) setCurrent(current + 1)
                        }} disabled={current === (Math.ceil(questions?.length / 4) - 1)} className='flex justify-center items-center gap-2 w-44 border-blue-500 rounded-md py-3 border bg-blue-500 text-white disabled:bg-gray-400 disabled:text-black disabled:border-gray-400'> Next <MdOutlineArrowForwardIos className='-mb-[2px]' /></button>
                    }
                </div>
            </div>
        </>
    )
}

export default StudentExamResult

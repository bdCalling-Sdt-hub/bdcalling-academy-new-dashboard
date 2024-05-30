import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from '../Input/Input';
import SelectInput from '../Input/SelectInput';
import MultiSelectInput from '../Input/MultiSelectInput';
import TextArea from '../Input/TextArea';
import InputPlus from '../Input/InputPlus';
const popularityOptions = ['good', 'very good']
const CategoryOptions = ['App Development', 'web Development']
const CourseTypeOptions = ['on Line', 'off Line']
const MentorsOptions = [
    { value: 'Rakibul hasan', label: 'Rakibul hasan' },
    { value: 'Rakibul hasan1', label: 'Rakibul hasan1' },
    { value: 'Rakibul hasan2', label: 'Rakibul hasan2' }
];
const data = [
    { name: 'Training by Expert Trainers from bdCalling.', _id: 'isuehy7' },
    { name: 'Training by Expert Trainers from bdCalling.', _id: 'isuehy8' },
]
const CourseAddForm = () => {
    const [selectedMentors, setSelectedMentor] = useState([])
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [Fields, setFields] = useState(data)
    return (
        <form className='py-8' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid-3 mb-4'>
                <Input lebel={`Enter course name`} classNames={`border`} status={errors} placeholder={`certified app developer with flutter`} rules={{ ...register("courseName", { required: true }) }} />
                <Input lebel={`Enter language`} classNames={`border`} status={errors} placeholder={`Bangla`} rules={{ ...register("language", { required: true }) }} />
                <Input lebel={`Enter start date`} type={`date`} classNames={`border`} status={errors} rules={{ ...register("date", { required: true }) }} />
                <Input lebel={`Enter course time length`} classNames={`border`} status={errors} placeholder={`5`} rules={{ ...register("courseLength", { required: true }) }} />
                <Input lebel={`Enter course price`} classNames={`border`} status={errors} placeholder={`25000`} rules={{ ...register("coursePrice", { required: true }) }} />
                <Input lebel={`Enter skill level`} classNames={`border`} status={errors} placeholder={`Basic To Advance`} rules={{ ...register("skildlevel", { required: true }) }} />
                <Input lebel={`Enter Coupon Code Price`} type={`number`} classNames={`border`} status={errors} placeholder={`0`} rules={{ ...register("coupon", { required: false }) }} />
                <SelectInput lebel={`Select Course Type`} classNames={`border`} status={errors} options={CourseTypeOptions} rules={{ ...register("courseType", { required: true }) }} />
                <SelectInput lebel={`Select Category`} classNames={`border`} status={errors} options={CategoryOptions} rules={{ ...register("category", { required: true }) }} />
                <SelectInput lebel={`Select Popularity`} classNames={`border`} status={errors} options={popularityOptions} rules={{ ...register("popularity", { required: true }) }} />
                <MultiSelectInput setSelectedOption={setSelectedMentor} lebel={`Select Mentors`} data={MentorsOptions} />
                <Input lebel={`Enter Seat Left`} type={`number`} classNames={`border`} status={errors} placeholder={`10`} rules={{ ...register("seatLeft", { required: false }) }} />
            </div>
            <div className='mt-4'>
                <TextArea lebel={`Enter Course Details`} type={`text`} classNames={`border h-32`} status={errors} placeholder={`The bdCalling Academy's Flutter course focuses on creating apps from the ground up. The learner will receive step-by-step instruction on building an app from our Flutter expert. You will be able to develop deeply into the features of Flutter and dart with this training.`} rules={{ ...register("details", { required: true }) }} />
            </div>
          <div className='mt-4'>
          <TextArea lebel={`Enter Address`} type={`text`} classNames={`border h-32`} status={errors} placeholder={`bdCalling IT Ltd - Corporate Office House - 14, Main Road, Block - A, Banasree, Rampura, Dhaka - 1219`} rules={{ ...register("address", { required: true }) }} />
          </div>
            <div className='grid-4 mt-4'>
                <InputPlus setFields={setFields} actions={{ plus: true, cross: true }} fieldFor='create' Fields={Fields} valueName={'name'} lebel={`Enter language`} classNames={`border `} status={errors} placeholder={`Bangla`} inputFor={'carrier'} />
            </div>
            {/* <input type="submit" /> */}
        </form>
    )
}

export default CourseAddForm

import React, { useEffect, useState } from 'react'
import PageHeading from '../Components/Shared/PageHeading'
import Input from '../Components/Input/Input'
import { useForm } from 'react-hook-form'
import { IoSearch } from 'react-icons/io5'
import { Button, DatePicker, Form, Modal, Space, Table } from 'antd'
import { LuPrinter } from 'react-icons/lu'
import { FaEdit, FaFileExcel, FaPlus, FaRegFilePdf } from 'react-icons/fa'
import { SiMicrosoftword } from 'react-icons/si'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CiCircleMinus } from 'react-icons/ci'
import usePostRequest from '../Hooks/usePostRequest'
import useGetRequest from '../Hooks/useGetRequest'
import usePatchRequest from '../Hooks/usePatchRequest'
import { RxCross2 } from 'react-icons/rx'
const Cost = () => {
    const [page, setPage] = useState(1)
    const [form] = Form.useForm()
    const [filterData, setFilterData] = useState({})
    const [FormFor, setFormFor] = useState('add')
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [open, setOpen] = useState(false)
    const [openPrintModal, setOpenPrintModal] = useState(false)
    const [exportType, setExportType] = useState('pdf')
    const [date, setDate] = useState(null)
    const { mutate, isLoading, data, error } = usePostRequest('includeCost', `/include/cost`);
    const { mutate: updateCost, isLoading: updateLoading, data: updateData, error: updateError } = usePatchRequest('includeCost', `/include/cost/${filterData?.id}`);
    // console.log(updateError)
    const [requestingCost, Cost, CostError, refetch] = useGetRequest('Cost', `/include/cost?page=${page}${date ? `&date=${date}` : ''}`);
    const onSubmit = data => {
        setDate(data?.date)//new Date(data?.date).toISOString()
    };
    const CostData = Cost?.data?.map((item, i) => {
        return {
            key: i + 1,
            id: item?.id,
            date: item?.created_at?.split('T')[0],
            cost: `${item?.costing?.reduce((acc, curr) => Number(acc) + Number(curr?.cost), 0)} TK`
        }
    }) || []
    const handleFilterItem = (id) => {
        const filter = Cost?.data.filter(item => item?.id === id)
        setFilterData(filter[0])
    }
    // console.log(filterData)
    const columns = [
        {
            title: '#Sl',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Total Cost',
            dataIndex: 'cost',
            key: 'cost',
        },
        {
            title: 'Actions',
            dataIndex: 'key',
            key: 'key',
            render: (_, record) => {
                return (<div className='flex justify-start items-center gap-4 text-2xl'>
                    <button onClick={() => { setOpenPrintModal(true); handleFilterItem(record?.id) }} className='text-green-600 cursor-pointer'><LuPrinter /></button>
                    <button onClick={() => { setOpen(true); handleFilterItem(record?.id); setFormFor('update') }} className='text-blue-400 cursor-pointer'><FaEdit /></button>
                </div>)
            }
        }
    ];

    const onFinish = (values) => {
        const data = {
            costing: JSON.stringify(values?.costing)
        }
        const formData = new FormData()
        Object.keys(data).map(key => {
            formData.append(key, data[key])
        })
        if (FormFor === 'add') {
            mutate(formData)
        } else {
            formData.append('id', filterData?.id)
            formData.append('_method', 'PUT');
            updateCost(formData)
        }
    };
    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };
    useEffect(() => {
        form.setFieldsValue({ costing: filterData?.costing })
    }, [filterData]);

    const [totalCost, setTotalCost] = useState(0);
    const updateTotalCost = (fields) => {
        const newTotalCost = fields.reduce((acc, field) => Number(acc) + Number(field?.cost || 0), 0);
        setTotalCost(newTotalCost);
    };

    const handleChangePrice = (e, name) => {
        const fields = form.getFieldValue('costing');
        const updatedFields = fields.map((field, index) => {
            if (index === name[0]) {
                return { ...field, cost: parseFloat(e.target.value) || 0 };
            }
            return field;
        });

        form.setFieldsValue({ costing: updatedFields });
        updateTotalCost(updatedFields);
    };

    const handleRemoveField = (name, remove) => {
        const fields = form.getFieldValue('costing');
        const updatedFields = fields.filter((_, index) => index !== name);
        form.setFieldsValue({ costing: updatedFields });
        remove(name);
        updateTotalCost(updatedFields);
    };
    useEffect(() => {
        if (isLoading || updateLoading) return
        if ((updateData && !updateError) || (data && !error)) setOpen(false); setTotalCost(0); refetch()
    }, [data, updateData, updateError, error, isLoading, updateLoading])
    return (
        <div>
            <div className='start-center gap-2 '>
                <PageHeading text={`Include Cost`} />
            </div>
            <div className='between-center gap-2'>
                <form onSubmit={handleSubmit(onSubmit)} className='start-center gap-4 flex-wrap max-w-fit bg-[#EBEBEB] p-4 px-6 rounded-[40px]'>

                    <div className='max-w-44 min-w-44'>
                        <Input type={`date`} rules={{ ...register("date", { required: false }) }} classNames={`rounded-3xl`} placeholder={`Batch ID`} />
                    </div>
                    <button className='text-2xl p-3 bg-[var(--primary-bg)] text-white rounded-full'>
                        <IoSearch />
                    </button>
                    <button type='button' onClick={() => {
                        reset()
                        setDate(null)
                    }} className='text-2xl p-[10px] bg-[red] text-white rounded-full'>
                        <RxCross2 />
                    </button>
                </form>
                <div className="flex justify-end items-center w-full gap-3">
                    <button onClick={() => { setOpen(true); setFormFor('add'); setFilterData({}) }} className="btn-primary max-w-40"><FaPlus />Add Cost</button>
                </div>
            </div>
            <Table dataSource={CostData} columns={columns} pagination={{
                total: Cost?.total || 0,
                onChange: (page, pagesize) => setPage(page),
                showSizeChanger: false,
                pageSize: Cost?.per_page
            }} />
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                centered
                footer={false}
                width={700}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout='vertical'
                    className='mt-3'
                    initialValues={{ costing: [{}] }}
                >
                    {/* <Form.Item
                        label="Date"
                        name="date"
                    >
                        <DatePicker className='w-1/2' onChange={onChange} />
                    </Form.Item> */}
                    <p><span className='text-red-500'>*</span> Cost Details</p>
                    <Form.List name="costing">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className='flex items-center justify-between gap-2 '>
                                        <div className=' w-[59%]'>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'reason']}
                                                rules={[{ required: true, message: 'please Input Reason Or delete this field ' }]}
                                            >
                                                <input className={`border w-full h-full p-2 rounded-md outline-none`} placeholder="Reason" />
                                            </Form.Item>
                                        </div>
                                        <div className=' w-[38%]'>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'cost']}
                                                rules={[{ required: true, message: 'please Input cost Or delete this field ' }]}
                                            >
                                                <input name={[name, 'cost']} onChange={(e) => handleChangePrice(e, name)} type='number' className={`border w-full h-full p-2 rounded-md outline-none`} placeholder="Cost" />
                                            </Form.Item>
                                        </div>
                                        <div className=' h-full flex justify-center items-center text-2xl -mt-5' >
                                            <CiCircleMinus className='cursor-pointer hover:text-red-500' onClick={() => handleRemoveField(name, remove)} />
                                        </div>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    {/* <div className='p-2 rounded-md border grid grid-cols-3 gap-2'>
                        <div className='w-full col-span-2'>
                            <p>Reason</p>
                            {
                                [...Array(10).keys()].map((item) => <Form.Item
                                    name={`reason-${item}`} key={item}
                                >
                                    <Input placeholder={`write Reason`} classNames={`border`} type='text' />
                                </Form.Item>)
                            }

                        </div>
                        <div className='w-full col-span-1'>
                            <p>Cost</p>
                            {
                                [...Array(10).keys()].map((item) => <Form.Item
                                    key={item}
                                    name={`cost-${item}`}
                                >
                                    <Input classNames={`border`} type='number' placeholder={`200`} />
                                </Form.Item>)
                            }
                        </div>
                    </div> */}
                    <div className='flex justify-end items-center gap-3 py-1'>
                        <p>Total Cost</p> <p>Tk {totalCost}</p>
                    </div>
                    <div className='text-center'>
                        <button className='px-14 rounded-md py-2 bg-[#2492EB] text-white'>
                            {FormFor === 'add' ? 'Create' : 'Update'}
                        </button>
                    </div>
                </Form>
            </Modal>

            <Modal
                centered
                footer={false}
                open={openPrintModal}
                onCancel={() => setOpenPrintModal(false)}
                width={600}
            >
                <div>
                    <div className='grid-2-start gap-2'>
                        <div className='w-full'>
                            <img className='mt-5' src="https://i.ibb.co/LScrG6N/image-336.png" alt="" />
                            <p className='text-2xl text-[var(--primary-color)] font-semibold mt-7'>Billed To:</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Rahman Abir</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>+880 1744545477</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>House: 14, Block #A, Banasree, Dhaka 1219</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Bkash</p>
                        </div>
                        <div className='w-full'>
                            <p className='text-2xl text-[var(--primary-color)] font-semibold mt-7'>Invoice No: 1234</p>
                            <p className='text-2xl text-[var(--primary-color)] font-semibold mt-9'>Payments Information:</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Bkash</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Account Name: Rahman Abir</p>
                            <p className='text-[var(--primary-color)] text-base font-normal my-2'>Pay Date: 13 March, 2024</p>
                        </div>
                    </div>
                    <p className='text-2xl text-[var(--primary-color)] font-semibold mt-7'>Students Information:</p>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Course Name:</p>
                        <p className='text-base text-[var(--primary-color)]'>UX/UI Design</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Course ID:</p>
                        <p className='text-base text-[var(--primary-color)]'>202402</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Student ID:</p>
                        <p className='text-base text-[var(--primary-color)]'>202402</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Payable Amount Date:</p>
                        <p className='text-base text-[var(--primary-color)]'>04/05/2024</p>
                    </div>
                    <div className='grid-2 my-3'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Due Amount:</p>
                        <p className='text-base text-[var(--primary-color)] text-red-500'>15000</p>
                    </div>
                    <span className='block w-full h-[2px] bg-black'></span>
                    <div className='grid-4 my-1'>
                        <p className='text-base font-medium text-[var(--primary-color)] text-start'>Course Name</p>
                        <p className='text-base font-medium text-[var(--primary-color)] text-center'>Price</p>
                        <p className='text-base font-medium text-[var(--primary-color)] text-center'>Quantity</p>
                        <p className='text-base font-medium text-[var(--primary-color)] text-end'>Total Amount</p>
                    </div>
                    <span className='block w-full h-[2px] bg-black'></span>
                    <div className='grid-4 my-1'>
                        <p className='text-base text-[var(--primary-color)] text-start'>UX/Ui Design</p>
                        <p className='text-base text-[var(--primary-color)] text-center'>15000Tk</p>
                        <p className='text-base text-[var(--primary-color)] text-center'>1</p>
                        <p className='text-base text-[var(--primary-color)] text-end'>15000Tk</p>
                    </div>
                    <span className='block w-full h-[2px] bg-black'></span>
                    <div className='grid-2 my-1'>
                        <p className='text-base font-medium text-[var(--primary-color)]'>Total Amount:</p>
                        <p className='text-base font-medium text-[var(--primary-color)] text-end'>15000Tk</p>
                    </div>
                    <span className='block w-full h-[2px] bg-black'></span>
                    <div className='start-center gap-3 my-6'>
                        <button onClick={() => {
                            setExportType('pdf')
                        }} className={`center-center flex-col rounded-md max-w-11 p-1 ${exportType == 'pdf' ? 'bg-gray-300' : 'bg-transparent'}`}>
                            <FaRegFilePdf />
                            PDF
                        </button>
                        <button onClick={() => {
                            setExportType('word')
                        }} className={`center-center flex-col rounded-md max-w-11 p-1 ${exportType == 'word' ? 'bg-gray-300' : 'bg-transparent'}`}>
                            <SiMicrosoftword />
                            WORD
                        </button>
                        <button onClick={() => {
                            setExportType('excel')
                        }} className={`center-center flex-col rounded-md max-w-11 p-1 ${exportType == 'excel' ? 'bg-gray-300' : 'bg-transparent'}`}>
                            <FaFileExcel />
                            EXCEL
                        </button>
                    </div>
                    <div className='start-center gap-4'>
                        <button onClick={() => {
                            setOpenPrintModal(false)
                        }} className='btn-primary max-w-40'>Download Invoice</button>
                        <button onClick={() => {
                            setOpenPrintModal(false)
                        }} className='btn-secondary max-w-28'>Print</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Cost

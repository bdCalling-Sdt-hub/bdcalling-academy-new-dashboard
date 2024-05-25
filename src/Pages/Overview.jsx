import OverviewCard from "../Components/OverviewCard"
import PageHeading from "../Components/PageHeading"
const overviewData = [
    {
        title: 'Total Earning',
        icon: 'https://i.ibb.co/dpsm0bv/Black.png',
        text: `10% Higher Then Last Years`,
        total: `100k`,
    },
    {
        title: 'Daily Earning',
        icon: 'https://i.ibb.co/g3DH8Hw/image-2-traced.png',
        text: `10% Higher Then Last Years`,
        total: `15k`,
    },
    {
        title: 'Weekly Earning',
        icon: 'https://i.ibb.co/VYh2PT6/image-3-traced.png',
        text: `10% Higher Then Last Years`,
        total: `25k`,
    },
    {
        title: 'Monthly Earning',
        icon: 'https://i.ibb.co/yQbns7G/image-4-traced.png',
        text: `10% Higher Then Last Years`,
        total: `45k`,
    },
    {
        title: 'Total Students',
        icon: 'https://i.ibb.co/mNyQ7Rb/Black-1.png',
        text: `10% Higher Then Last Years`,
        total: `500`,
    },
    {
        title: 'Running Students',
        icon: 'https://i.ibb.co/cX87vQq/image-6-traced.png',
        text: `10% Higher Then Last Years`,
        total: `1200`,
    },
    {
        title: 'Course Complete',
        icon: 'https://i.ibb.co/1QnHryG/image-7-traced.png',
        text: `10% Higher Then Last Years`,
        total: `1200`,
    },
    {
        title: 'Total Trainer',
        icon: 'https://i.ibb.co/ZMNgdfV/image-8-traced.png',
        text: `10% Higher Then Last Years`,
        total: `1200`,
    },
]
const Overview = () => {
    return (
        <>
            <PageHeading text={`Overview`} />
            <div className="grid-4">
                {overviewData?.map((item, index) => <OverviewCard key={index} icon={item?.icon} title={item?.title} text={item?.text} total={item?.total} />)}


            </div>
        </>
    )
}

export default Overview


import { useState } from 'react';
import { SideberLink } from '../../Utils/SideberLinks';
import { NavLink } from 'react-router-dom';
import academyLogo from '../../assets/academyLogo.png'
import { IoIosArrowDown } from 'react-icons/io';
const Sideber = () => {
    const [openAccordion, setOpenAccrodion] = useState({
        open: false, menu: ''
    })
    return (
        <>
            <div className='w-full h-auto center-center bg-white px-9 py-[20px] mb-6'>
                <img className='w-full' src={academyLogo} alt="" />
            </div>
            <ul>
                {
                    SideberLink?.map((item, index) => <div key={index}>
                        {!item?.dropDown ? <li className='my-2 font-medium'>
                            <NavLink className={`start-center gap-2 px-5 py-2 menu flex-row`} to={item?.link}>
                                <item.icon className='text-2xl' />
                                {item?.menu}
                            </NavLink>
                        </li> : <div className={`menus`}>
                            <li onClick={() => {
                                if (openAccordion.menu === item.menu) {
                                    setOpenAccrodion({
                                        open: false, menu: false
                                    })
                                } else {
                                    setOpenAccrodion({
                                        open: true, menu: item.menu
                                    })
                                }
                            }} className='cursor-pointer between-center gap-2 px-5 py-2 my-2 font-medium'> <span className='start-center gap-2'><item.icon className='text-2xl' />{item?.menu}</span> <IoIosArrowDown className='text-2xl' /></li>
                            <div className={`${(openAccordion.open && openAccordion.menu === item?.menu) ? 'max-h-max accordionOpen' : ' max-h-0 accordionClose'} bg-[var(--primary-bg)] overflow-hidden -mt-3`}>
                                {item?.dropDown?.map(dropDown =>
                                    <li key={dropDown?.menu}>
                                        <NavLink to={dropDown?.link} className={`py-1 my-1 pl-8 block dropDown text-white`}>
                                            {dropDown?.menu}
                                        </NavLink>
                                    </li>
                                )}
                            </div>
                        </div>}
                    </div>
                    )
                }
            </ul>
        </>
    )
}

export default Sideber

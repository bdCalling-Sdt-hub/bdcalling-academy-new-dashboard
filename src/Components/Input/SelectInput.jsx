import React from 'react'

const SelectInput = ({ lebel, defaultValue, classNames, rules, status, handler, options }) => {
    console.log(defaultValue)
    // console.log(options)
    return (
        <div className="w-full relative">
            {lebel && <p className="pb-2">{lebel}</p>}
            <select onInput={(e) => {
                handler && handler(e, rules?.name)
            }} defaultValue={defaultValue ? defaultValue : "please select"} {...rules} className={`w-full p-2 outline-none rounded-md ${classNames}`}>
                <option value={``}>please choose {rules?.name}</option>
                {
                    options?.map(item => <option selected={defaultValue==item?.value} value={item?.value} key={item.value}>{item?.name}</option>)
                }
            </select>
            {
                status?.[rules?.name] && <p className="absolute -bottom-4 text-red-600">{rules?.name} is requerd</p>
            }
        </div>
    )
}

export default SelectInput

const Input = ({ lebel, type, placeholder, defaultValue, classNames, rules, status, errorType, handler }) => {
    return (
        <div className="w-full">
            {lebel && <p className="pb-2">{lebel}</p>}
            <input onInput={(e) => {
                handler && handler(e,rules?.name)
            }} {...rules} type={type ? type : 'text'} defaultValue={defaultValue ? defaultValue : ""} placeholder={placeholder ? placeholder : ''} className={`w-full p-2 outline-none rounded-md ${classNames}`} />
            {
                status?.[errorType] && <p>{errorType} is requerd</p>
            }
        </div>
    )
}
export default Input

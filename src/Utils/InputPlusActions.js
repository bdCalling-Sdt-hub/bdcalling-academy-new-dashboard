function generateRandomNumber() {
    const randomNumber = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('');
    return randomNumber;
}
export const addNewFields = (field, setField, setExtraField,extraValue) => {
    const generatedNumber = generateRandomNumber()
    setField([...field, { _id: generatedNumber }])
    if (setExtraField && extraValue) {
        setExtraField([...extraValue,{[generatedNumber]:`answer1-${generatedNumber}`}])
    }
}
export const removeNewFields = (field, setField, id,setExtraField,extraValue) => {
    const newfields = field.filter((filterItem) => filterItem?._id !== id)
    setField(newfields)
    // const filterCurrecAnswer = extraValue.filter(item=> {
    //     Object.keys()
    // })
}
export const removeNewFieldLastOne = (field, setField) => {
    const newfields = [...field]
    newfields.pop();
    setField(newfields)
}
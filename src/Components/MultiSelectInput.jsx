
import Select from 'react-select';
const MultiSelectInput = ({data,setSelectedOption,defaultValue}) => {
    const handleChange = (value) => {
        setSelectedOption(value);
      };
    return (
        <>
            <Select
                defaultValue={[defaultValue]}
                isMulti
                name="colors"
                options={data}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />
        </>
    )
}

export default MultiSelectInput

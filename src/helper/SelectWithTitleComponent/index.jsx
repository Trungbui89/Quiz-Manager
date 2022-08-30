import React from 'react';
import Select from 'react-select';
import { Typography } from '@material-ui/core';
import useStyle from './styles';

export default function SelectWithTitle(props) {
    const {
        title,
        categories,
        gridOptions,
        categoryIndex,
        handleInputChange,
        topicStateByIndex,
        stylesOptions
    } = props

    const customStyles = {
        control: (provided) => ({
          ...provided,
          ...stylesOptions,
        }),
        singleValue: (styles) => ({
          ...styles,
          paddingTop: '18px',
          paddingBottom: '18px'
        })
    }

    const classes = useStyle()
    const typoClasses = classes.title.concat(` ${gridOptions.title}`)
    const inputClasses = gridOptions.input
    const option = categories ? ( categories.map((category) => {
        return (
            {value: category.id, label: category.name}
        )
    })) : ''
    // const [selectState, setSelectState] = React.useState(null)
    // const handleSelect = (e) => {
    //     setSelectState(e)
    //     console.log(selectState)
    // }
    
    return (
        <div className={classes.inputContainer}>
            <Typography className={typoClasses}>{title ?? ''}</Typography>
            <Select
                className={inputClasses}
                isSearchable={true}
                options={option}
                onChange={(e) => {
                    handleInputChange(e.value, categoryIndex)
                }}
                styles={customStyles}
                value={topicStateByIndex.cate}
            />
        </div>
    )
}

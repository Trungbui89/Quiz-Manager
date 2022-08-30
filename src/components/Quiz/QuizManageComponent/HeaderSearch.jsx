import { Box, Grid } from '@mui/material';
import { colorChannel } from '@mui/system';
import React from 'react'
import { getQuizListPaging } from '../../../api/actions';
import SearchButton from '../../../helper/GroupButton/SearchButton'
import InputSearchComponent from '../../../helper/InputSearchComponent';
import SelectFieldCustom from '../../../helper/SelectFieldCustom';
import { convertDateTimeToLocal } from '../../../constants/shared'
import DatePickerFlexComponent from '../../../helper/DatePickerFlexComponent';
import DatePickerSearchComponent from '../../../helper/DatePickerSearchComponent';


export default function HeaderSearch(props) {

    const {categories, setFilterListQuiz, filterListQuiz, getQuizList} = props

    const dataCateOptions = Array.isArray(categories) && categories.length > 0 ? categories.map(i => ({id: i.id, label:i.name, value: i.name})) : [];

    const handleChangeFilter = (key, value) => {
        switch (key) {
            case 'createDate':
                setFilterListQuiz({...filterListQuiz, createDate: value})
                break;
            case 'startTime':
                setFilterListQuiz({...filterListQuiz, startTime: value})
                break;
            case 'expiredTime':
                setFilterListQuiz({...filterListQuiz, expiredTime: value})
                break;
            case 'category':
                setFilterListQuiz({...filterListQuiz, cate: value?.value})
                break;
            case 'keywords':
                setFilterListQuiz({...filterListQuiz, keywords: value})
                break;
            default:
                break;
        }
    }

    return (
        <Box className='header-search'>
                <Box style={{width: '165px', height:'30px'}}>
                    {/* <InputSearchComponent 
                        handleChangeText={handleChangeFilter}
                        defaultValue={filterListQuiz.createDate || ''} 
                        name='createDate'
                        title='Ngày tạo'
                        type='date'
                    /> */}
                    <DatePickerSearchComponent
                        format='DD/MM/YYYY' 
                        placeholder="Chọn / nhập ngày" 
                        title='Ngày tạo'
                        onChange={handleChangeFilter}
                        value={filterListQuiz.createDate}
                        name="createDate"
                        
                    />
                </Box>
                <Box style={{width: '165px', height:'30px'}}>
                    {/* <InputSearchComponent 
                        handleChangeText={handleChangeFilter}
                        defaultValue={filterListQuiz.startTime || ''} 
                        name='startTime'
                        title='Thời gian mở'
                        type='date'
                    /> */}
                    <DatePickerSearchComponent
                        format='DD/MM/YYYY' 
                        placeholder="Chọn / nhập ngày" 
                        title='Thời gian mở'
                        onChange={handleChangeFilter}
                        value={filterListQuiz.startTime}
                        name="startTime"
                        
                    />
                </Box>
                <Box style={{width: '165px', height:'30px'}}>
                    {/* <InputSearchComponent 
                        handleChangeText={handleChangeFilter}
                        defaultValue={filterListQuiz.expiredTime || ''} 
                        name='expiredTime'
                        title='Thời gian đóng'
                        type='date'
                    /> */}
                    <DatePickerSearchComponent
                        format='DD/MM/YYYY' 
                        placeholder="Chọn / nhập ngày" 
                        title='Thời gian đóng'
                        onChange={handleChangeFilter}
                        value={filterListQuiz.expiredTime}
                        name="expiredTime"
                        
                    />
                </Box>
                <Box style={{width: '165px', height:'30px', padding:'0 9px 0 9px'}}>
                    <SelectFieldCustom 
                        data={dataCateOptions} 
                        handleOnChange={handleChangeFilter}
                        defaultValue={filterListQuiz.cate || ''} 
                        name='category'
                        title='Chủ đề' 
                    />
                </Box>
                <Box style={{width: '165px', height:'30px'}}>
                    <InputSearchComponent 
                        handleChangeText={handleChangeFilter} 
                        value={filterListQuiz.keywords || ''} 
                        title='Nội dung tìm kiếm' 
                        name='keywords'
                        inputProps={{
                            maxLength: 400
                        }}
                    />
                </Box>
            <Box style={{ paddingLeft: '9px'}}>
                <SearchButton onClick={getQuizList} title='Tìm kiếm' />
            </Box>
        </Box>
    )
}
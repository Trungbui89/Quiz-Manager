import React, { useState } from 'react'
import TextFieldCustom from '../../../../helper/TextFieldCustom'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Grid, IconButton } from '@mui/material';
import './style.scss'
import { convertDataOptions } from '../../../../constants/shared';
import SelectCreate from './SelectCreate';

export default function AddCategories(props) {
    const {
        categories,
        topicState,
        setTopicState,
        helpTextTopic,
        setHelpTextTopic,
        validateCategoryArray
    } = props;

    const [indexState, setIndexState] = useState([{index: 1}])
    const [newCategories, setNewCategories] = useState([])

    const dataOptions = newCategories.length ? convertDataOptions(newCategories) : []

    const handleChangeQuantityCate = (type) => {
        if(type === 'add') {
            const newIndex = indexState[indexState.length - 1].index + 1
            setIndexState([...indexState, {index: newIndex}])
            setHelpTextTopic([...helpTextTopic, {cate: false, quantity: false}])
            setTopicState([...topicState, {
                index: newIndex,
                cate: '',
                quantity: null
            }])
        }
        if(type === 'remove') {
            const newIndexArr = indexState.filter(i => i.index !== indexState.length || i.index === 1)
            setIndexState(newIndexArr)
            topicState.length === 1 ? setTopicState(topicState) : setTopicState(topicState.splice(0, topicState.length - 1))
            helpTextTopic.length === 1 ? setHelpTextTopic(helpTextTopic) : setHelpTextTopic(helpTextTopic.splice(0, helpTextTopic.length - 1))
        }
    }

    const handleChangeCategory = (index, value) => {
        const currentIndex = topicState.findIndex(i => i.index === index);
        validateCategoryArray('category', currentIndex, value)
            let newTopicState = [...topicState];
            newTopicState[currentIndex] = {
                ...newTopicState[currentIndex],
                index: index,
                cate: value
            }
            setTopicState(newTopicState);
    }

    const handleChangeQuantity = (index, value) => {
        const currentIndex = topicState.findIndex(i => i.index === index);
        validateCategoryArray('quantity',currentIndex, value)
        if(value > 200) {
            let newTopicState = [...topicState];
            newTopicState[currentIndex] = {
                ...newTopicState[currentIndex],
                index: index,
                quantity: 200,
            }
            setTopicState(newTopicState);
        } else if(value <= 0){
            let newTopicState = [...topicState];
            newTopicState[currentIndex] = {
                ...newTopicState[currentIndex],
                index: index,
                quantity: 0,
            }
            setTopicState(newTopicState)
        } else {
            let newTopicState = [...topicState];
            newTopicState[currentIndex] = {
                ...newTopicState[currentIndex],
                index: index,
                quantity: +value,
            }
            setTopicState(newTopicState);
        }
    }

    const checkDuplicateCategory = () => {
        const newTopicStateArr = topicState.map(i => i.cate.id)
        const newCateArr = categories.filter(c => newTopicStateArr.includes(c.id) === false)
        setNewCategories(newCateArr)
    }
    
    React.useEffect(() =>{
        checkDuplicateCategory()
    }, [topicState]);

    React.useEffect(() =>{
        if(categories.length) {
            setNewCategories(categories)
        }
    }, [categories])

    return (
        <div style={{ margin: '20px 12px 0' }}>
            {Array.isArray(indexState) && indexState.length > 0 ? indexState.map(item =>
                <Grid container key={item.index} className='box-category'>
                    <Grid item xs={8}>
                        <SelectCreate
                            title={`Chủ đề ${item.index}`}
                            data={dataOptions}
                            handleOnChange={handleChangeCategory}
                            defaultValue={topicState[item.index -1]?.cate ?? ''}
                            name={item.index}
                            placeholder='Chọn chủ đề'
                            helpText={helpTextTopic[item.index -1].cate}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextFieldCustom
                            type='number'
                            placeholder='Số câu hỏi'
                            onChange={(e) => handleChangeQuantity(item.index, e.target.value)}
                            helpText={helpTextTopic[item.index -1].quantity}
                            value={topicState[item.index - 1]?.quantity}
                        />
                    </Grid>
                </Grid>
            ): null}
            <Box>
                <IconButton onClick={()=>handleChangeQuantityCate('add')} className='button-category'>
                    <AddIcon />
                </IconButton>
                <IconButton onClick={()=>handleChangeQuantityCate('remove')} className='button-category'>
                    <RemoveIcon />
                </IconButton>
            </Box>
        </div>
    )
    
}


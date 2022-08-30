import React from 'react'
import './style.scss'

export default function CandidateComponent(props) {
    const {
        staffs,
        handleChangeStaffsList,
    } = props

    const [staffsListShowUp, setStaffsListShowUp] = React.useState([])
    const [sortedStaffList, setSortedStaffList] = React.useState([])
    const [checkListState, setCheckListState] = React.useState([])
    const [checkAllState, setCheckAllState] = React.useState(false)
    React.useEffect(() => {
        setStaffsListShowUp(staffs.map(ele => ({value: ele.id, label: ele.fullName, checker: false})))
        setCheckListState(staffs.map(ele => ({value: ele.id, label: ele.fullName, checker: false})))
    },[staffs])

    const handleCheckAll = () => {
        let newArray = checkListState.map(ele => {
            return {value: ele.value, label: ele.label, checker: !checkAllState}
        })
        setCheckListState(newArray)
        setCheckAllState(!checkAllState)
    }

    const handleEnter = (e) => {
        if(e.key == 'Enter' && staffsListShowUp.length == 1) {
            let newArray = checkListState.map(ele => {
                if(ele.value === staffsListShowUp[0].value) {
                    return {...ele, checker: !ele.checker}
                } else return ele
            })
            setCheckListState(newArray)
            let newArray_2 = newArray.filter(ele => {
                return ele.checker === true
            }).map(item => {
                return item.value
            })
            handleChangeStaffsList(newArray_2)
        }
    }
    
    const handleSearch = (props) => {
        if(props.target.value === '' || props.target.value === undefined) {
            setStaffsListShowUp(checkListState)
        } else {
            let newArray = checkListState.filter(item => {
                return item.label.toLowerCase().search(props.target.value.toLowerCase()) >= 0
            })
            setStaffsListShowUp(newArray)
        }
    }

    const handleCheckList = (item) => {
        let newArray = checkListState.map(ele => {
            if(ele.value === item.value) {
                return {value: ele.value, label: ele.label, checker: !item.checker}
            } else {
                return ele
            }
        })
        setCheckListState(newArray)
        let newArray_2 = newArray.filter(ele => {
            return ele.checker === true
        }).map(item => {
            return item.value
        })
        handleChangeStaffsList(newArray_2)
    }

    React.useEffect(() => {
        let newArray = checkListState.filter(ele => {
            return staffsListShowUp.filter(item => {
                return ele.value === item.value
            }).length > 0
        })
        setStaffsListShowUp(newArray)
    },[checkListState])

    React.useEffect(() => {
        let newArray = staffsListShowUp
        newArray.sort(function(a, b) {
            if (a.checker === true && b.checker === true) return 1
            if (a.checker === true && b.checker === false) return -1
            return 0;
        })
        setSortedStaffList(newArray)
    },[staffsListShowUp])

    function RenderCandidate() {
        return (
            <div className='list-candidate'>
                {sortedStaffList.map((item) => 
                    (       
                        <div key={item.value}>
                            <div className="col-xl-12 pb-2 z-bigger">
                            <input 
                                className="checkbox-budget" 
                                type="checkbox" key={item.value} 
                                id={`${item.value}`} 
                                checked={item.checker} 
                                onChange={() => handleCheckList(item)}
                            />
                                <label className="for-checkbox-budget" for={`${item.value}`}>
                                    <span data-hover={`${item.label}`}>{item.label}</span>
                                    <span className="check-box-item"></span> 
                                </label>
                            </div>
                        </div>
                    )
                )}
            </div>
        )
    }

    return (
        <>
            {/* <div className='candidate-component-main' style={{ position: 'relative' }}>
                <div className="candidate-container">
                    <input className='candidate-input' type="text" placeholder="Tên ứng viên..." />
                    <div className="candidate-search"></div>
                </div>
            </div> */}
            {/* {console.log(helpTextValueUserId)} */}
            <div className='candidate-body'>
                <div className='check-box-all'>
                    <div className='col-xl-10'>
                        <input className='search-input' placeholder='Nhập tên ứng viên làm bài' onChange={e => handleSearch(e)} onKeyDown={handleEnter}/>
                    </div>
                    <div className='search-check-box'>
                        <input type="checkbox" id="cbtest" checked={checkAllState} onChange={() => handleCheckAll()}/>
                        <label for="cbtest" class="check-box-item"></label> 
                    </div>
                </div>
                <div className="background-color"></div>
                <RenderCandidate />
            </div>
        </>
    )
}
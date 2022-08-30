import React from 'react'
import { useHistory } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { styles } from './styles'
import PopupIcons from './items/PopupIcons'
import RenderTextLine from './items/RenderTextLine'
import Buttons from './items/Buttons'

// MODAL transition
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />
})

export default function PopupCustom(props) {
    const {
        paragraph,
        type,
        buttons,
        buttonsLink,
        backButton,
        postSubmitAnswer,
        modalStatus,
        changeModalStatus,
        changeCheckResult,
        checkResult,
        changeQuizStatus,
        quizStatus,
        singleModalStatus,
        changeSingleModalStatus
    } = props
    const history = useHistory()

    const backButtonClick = () => {
        history.goBack()
    }

    return (
        <Dialog
            open={(checkResult??checkResult) || (modalStatus??modalStatus) || (quizStatus??quizStatus) || (singleModalStatus??singleModalStatus)}
            TransitionComponent={Transition}
            keepMounted
            onClose={(changeCheckResult??changeCheckResult) || (changeModalStatus??changeModalStatus) || (changeQuizStatus??changeQuizStatus) || (changeSingleModalStatus??changeSingleModalStatus)}
            aria-describedby="alert-dialog-slide-description"
        >
            <div className="card-information-user" style={styles.cardBody}>
                <>
                    <PopupIcons
                        type={type}
                    />
                    <RenderTextLine 
                        paragraph={paragraph}
                    />
                    <Buttons
                        buttons={buttons}
                        buttonsLink={buttonsLink}
                        changeCheckResult={changeCheckResult}
                        postSubmitAnswer={postSubmitAnswer}
                        changeQuizStatus={changeQuizStatus}
                        changeSingleModalStatus={changeSingleModalStatus}
                    />
                </>
                {
                    backButton ?
                    (
                        <p onClick={backButtonClick} style={{marginTop: '15px', textDecoration: 'underline', cursor: 'pointer'}}>
                            Trở về màn hình chính
                        </p>
                    ) : null
                }
                <div style={{width: '100%', height: '25px'}}></div>
            </div>
        </Dialog>
    )
}

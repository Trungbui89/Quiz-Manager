import React from 'react'
import { useHistory } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import { createTheme } from '@mui/material/styles';

export default function Buttons(props) {
    const {
        buttons,
        buttonsLink,
        changeCheckResult,
        postSubmitAnswer,
        changeQuizStatus,
        changeSingleModalStatus
    } = props
    const history = useHistory()

    const colors = (value) => {
        switch (value) {
            case 0: return "primary"
            case 1: return "success"
            default: return "primary"
        }
    }

    const ButtonsArray = Array.isArray(buttons) ? buttons.map((item, index) => {
        const behavior = () => {
            if(buttonsLink !== undefined) {
                history.replace(buttonsLink)
            } else {
                if (index === 0) {
                    changeCheckResult && changeCheckResult()
                    changeQuizStatus && changeQuizStatus()
                    changeSingleModalStatus && changeSingleModalStatus()
                } else {
                    postSubmitAnswer()
                    changeCheckResult && changeCheckResult()
                    postSubmitAnswer && postSubmitAnswer()
                }
            }
        }
    
        return (
            <Box sx={styles.groupButton} key={index}>
                <Button
                    variant="contained" 
                    onClick={behavior}
                    color={colors(index)}
                    sx={styles.button}
                    theme={theme}
                >
                    {item}
                </Button>
            </Box>
        )
    }) : null

    return (
        <>
            {ButtonsArray}
        </>
    )
}

const theme = createTheme({
    palette: {
      primary: {
        light: '#2b389b',
        main: '#121843',
        dark: '#172061',
        contrastText: '#fff',
      },
      success: {
        light: '#73fe97',
        main: '#36ca68',
        dark: '#00983b',
        contrastText: '#fff',
      }
    },
  });

const styles = {
    groupButton: {
        paddingTop: '15px',
        width: '100%',
        paddingRight: '35px',
        paddingLeft: '35px',
    },
    button: {
        width: '100%',
    }
}
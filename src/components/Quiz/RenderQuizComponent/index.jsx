import React from 'react'
import { RadioGroup, FormControlLabel, Radio, Typography, TextField } from '@mui/material'
import { getQuizAnswerByQuizId } from "../../../api/actions"

const RenderChoiceOfQuestion = (props) => {
  const { ques } = props;
  return ques?.questionChoiceDTOs.map((choice, idx) => (
    <div key={idx} style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: '1.5rem', height: '100%', margin: '0 10px 8px' }}>
            {
                choice.userAnswer !== null 
                ?
                    (
                        choice.true === true 
                        ?
                            <img src='/icon/CorrectAnswer.png' alt=''/> 
                        :
                            <img src='/icon/inCorrectAnswer.png' alt=''/>
                    )
                :
                    (<></>)
            }
        </div>
        <FormControlLabel
            value={choice.id}
            control={
                <Radio
                    checked={choice.true === true}
                    sx={{
                      color: '#565656',
                      '&.Mui-checked': {
                        color: '#36CA68',
                      },
                    }}
                    disabled
                />
            }
            label={<Typography color={choice.true === true ? '#36CA68' : '#565656'} style={{ fontFamily: '"Quicksand", sans-serif', fontSize: '19.2px' }} variant="caption">{choice.name}</Typography>}
            sx={{ marginBottom: '0px' }}
        />
    </div>
  ))
}

export default function RenderQuiz(props) {
    const { id} = props
    const [listQuiz, setListQuiz] = React.useState([]);
    const getListQuizByUser = () => {
        getQuizAnswerByQuizId(id)
        .then((res) => {
        setListQuiz(res.data)
        })
        .catch((err) => console.log(err));
    }
    React.useEffect(() => {
        getListQuizByUser()
    }, [])

  if (listQuiz.length > 0) {
    return listQuiz.map((ques, idx) => (
      <div
          key={idx}
          className="my-3 p-2 text-left"
          style={{ borderBottom: '1px dashed #DCDCDC', marginLeft: '5%' }}
      >
          <div className="row">
              <div className="col-10">
                  <p style={{ fontSize: '1.2rem' }}>
                        <span
                            style={{ fontSize: 25, fontWeight: 'bold', marginRight: '15px' }}
                        >
                            {idx + 1}
                        </span>
                        <span style={{ whiteSpace: 'pre-wrap', color: '#565656' }}>
                            {ques.content}
                        </span>
                  </p>
              </div>
          </div>
          <div style={{ width: '95%', margin: 'auto', paddingBottom: '16px' }}>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  column
              >
                  <RenderChoiceOfQuestion ques={ques} />
              </RadioGroup>
          </div>
      </div>
    ))
  } else return <div>Empty!</div>
}
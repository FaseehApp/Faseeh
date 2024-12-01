import React from 'react'
import { Paper, Typography, Box, TextField } from '@mui/material'
import { styled } from '@mui/system'
import { Quiz as QuizType } from '../../../types/types'

interface QuizProps {
  quiz: QuizType
}

const Quiz: React.FC<QuizProps> = ({ quiz }) => {
  const [answers, setAnswers] = React.useState<string[]>(Array(quiz.questions.length).fill(''))

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAnswers = [...answers]
    updatedAnswers[index] = event.target.value
    setAnswers(updatedAnswers)
  }

  return (
    <StyledPaper elevation={3}>
      <StyledTitle>Quiz</StyledTitle>

      {quiz.questions.map((question, index) => (
        <StyledBox key={index}>
          <StyledQuestion>{question.prompt}</StyledQuestion>
          <TextField
            fullWidth
            variant="outlined"
            value={answers[index]}
            onChange={(event) => handleAnswerChange(event, index)}
          />
        </StyledBox>
      ))}
    </StyledPaper>
  )
}

export default Quiz

// Styled components
const StyledPaper = styled(Paper)({
  width: '100%',
  maxWidth: '580px',
  padding: '20px',
  backgroundColor: '#fff',
  marginTop: '30px',
  borderRadius: '12px'
})

const StyledTitle = styled(Typography)({
  fontFamily: '"Cambria", serif',
  color: '#000',
  fontSize: '22px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center'
})

const StyledBox = styled(Box)({
  width: '100%',
  marginBottom: '30px'
})

const StyledQuestion = styled(Typography)({
  fontFamily: '"Cambria", serif',
  color: '#000',
  fontSize: '18px',
  marginBottom: '10px'
})

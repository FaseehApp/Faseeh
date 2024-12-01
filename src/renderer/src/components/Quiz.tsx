import React, { useState } from 'react'
import { Box, Typography, Button, TextareaAutosize, Paper } from '@mui/material'

const Quiz: React.FC = () => {
  // State to track the answers for each question
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  // State to track whether evaluation is shown for each question
  const [showEvaluation, setShowEvaluation] = useState<boolean[]>([false, false, false])

  // Function to handle evaluate button click
  const handleEvaluate = (index: number) => {
    const updatedEvaluation = [...showEvaluation]
    updatedEvaluation[index] = true
    setShowEvaluation(updatedEvaluation)
  }

  // Function to handle input changes
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedAnswers = [...answers]
    updatedAnswers[index] = event.target.value
    setAnswers(updatedAnswers)
  }

  return (
    <Paper
      elevation={3}
      sx={{
        width: '100%',
        maxWidth: '580px',
        padding: '20px',
        backgroundColor: '#fff',
        marginTop: '30px',
        borderRadius: '12px'
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Cambria", serif',
          color: '#000',
          fontSize: '22px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center'
        }}
      >
        Quiz
      </Typography>

      {[1, 2, 3].map((questionNumber, index) => (
        <Box
          key={index}
          sx={{
            width: '100%',
            marginBottom: '30px'
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Cambria", serif',
              color: '#000',
              fontSize: '18px',
              marginBottom: '10px'
            }}
          >
            <span style={{ fontWeight: 'bold' }}>Question {questionNumber}:</span>{' '}
            <span style={{ fontWeight: 'normal' }}>
              .................................................. ?
            </span>
          </Typography>

          <input
            type="text"
            value={answers[index]} // Bind value to state
            onChange={(e) => handleAnswerChange(e, index)} // Handle input change
            placeholder="Type your answer here..."
            style={{
              width: '90%',
              padding: '8px 10px', // Minimum padding
              fontFamily: '"Cambria", serif',
              marginBottom: '15px',
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              outline: 'none',
              border: '1px solid #ddd', // Add a subtle border for the input
              fontSize: '16px'
            }}
          />

          {!showEvaluation[index] ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#000000',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                padding: '8px 20px',
                borderRadius: '8px',
                textTransform: 'none',
                fontFamily: '"Cambria", serif', // Cambria font family
                '&:hover': {
                  backgroundColor: '#00000'
                }
              }}
              onClick={() => handleEvaluate(index)}
            >
              Evaluate
            </Button>
          ) : (
            // Display the answer after evaluation
            <Typography
              sx={{
                fontFamily: '"Cambria", serif',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '15px',
                color: '#000'
              }}
            >
              Your Answer: {answers[index]}
            </Typography>
          )}

          {showEvaluation[index] && (
            <Box
              sx={{
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <TextareaAutosize
                minRows={3}
                placeholder="AI-generated feedback will appear here..."
                style={{
                  width: '70%',
                  border: '1px solid #000',
                  padding: '10px',
                  borderRadius: '5px',
                  fontFamily: '"Cambria", serif',
                  outline: 'none'
                }}
              />
              <Box sx={{ marginLeft: '10px' }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', fontFamily: '"Cambria", serif' }}
                >
                  8/10
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', fontFamily: '"Cambria", serif' }}
                >
                  10/10
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Paper>
  )
}

export default Quiz

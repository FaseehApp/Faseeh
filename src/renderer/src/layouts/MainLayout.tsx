import React, { useState } from 'react'
import { Box, Paper, Typography, Button, styled } from '@mui/material'
import OptionsSideBar from '../components/OptionsSideBar'
import WordInfo from '../components/WordInfo'
import MediaPlayer from '../components/MediaPlayer'
import Quiz from '../components/Quiz'

const SubmitButton = styled(Button)({
  backgroundColor: '#000000',
  color: '#fff',
  padding: '8.9px 25px',
  fontFamily: '"Cambria", serif', // Cambria font family
  borderRadius: '8px', // Consistent radius with input
  '&:hover': {
    backgroundColor: '#333333' // Darker color on hover
  },
  marginLeft: '10px', // Space between input and button
  transition: 'all 0.3s ease' // Smooth transition
})

const ContainerStyle = {
  backgroundColor: '#ffffff',
  color: 'white',
  padding: '20px',
  height: '100%',
  fontFamily: '"Cambria", serif',
  border: 'none',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflow: 'hidden'
}

const MainLayout: React.FC = () => {
  const [showQuiz, setShowQuiz] = useState(false)

  const handleGenerateQuiz = () => {
    setShowQuiz(true)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: '0', gap: '20px' }}>
      {/* Sidebar (Left) */}
      <Box sx={{ width: '20%', height: '100vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={ContainerStyle}>
          <OptionsSideBar />
        </Paper>
      </Box>

      {/* Center Section */}
      <Box
        sx={{
          width: '60%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflowY: 'auto'
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#000000',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: '"Cambria", serif',
            marginBottom: '20px'
          }}
        >
          Let's turn you into a Faseeh
        </Typography>

        <MediaPlayer src={'www.youtube.com'} />

        {/* Conditionally render the button or quiz */}
        {!showQuiz && (
          <SubmitButton
            variant="contained"
            sx={{
              marginTop: '20px',
              backgroundColor: '#000000',
              color: 'white',
              fontSize: '20px',
              padding: '10px 30px',
              borderRadius: '8px',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#00000'
              }
            }}
            onClick={handleGenerateQuiz}
          >
            Generate Quiz
          </SubmitButton>
        )}

        {showQuiz && <Quiz />}
      </Box>

      {/* Sidebar (Right) */}
      <Box sx={{ width: '20%', height: '100vh', overflow: 'hidden' }}>
        <Paper elevation={3} sx={ContainerStyle}>
          <WordInfo definition="Placeholder" synonyms={['Example']} opposites={['Contrary']} />
        </Paper>
      </Box>
    </Box>
  )
}

export default MainLayout

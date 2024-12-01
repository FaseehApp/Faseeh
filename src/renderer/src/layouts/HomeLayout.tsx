import React from 'react'
import { Box, Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { useNavigate } from 'react-router-dom'

const Root = styled(Box)({
  backgroundColor: '#ffffff',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '2rem'
})

const Title = styled(Typography)({
  fontSize: '4rem',
  fontWeight: 'bold',
  color: '#333333',
  fontFamily: '"Cambria", serif', // Cambria font family
  fontStyle: 'italic' // Italic text
})

const Subtitle = styled(Typography)({
  fontSize: '1rem',
  color: '#666666',
  fontFamily: '"Cambria", serif', // Cambria font family
  fontStyle: 'italic', // Italic text
  marginBottom: '2rem'
})

const InputFieldWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', // Center content horizontally
  marginBottom: '2rem', // Larger margin for better spacing
  borderRadius: '8px',
  width: '100%',
  maxWidth: '500px' // Limit width for aesthetic purposes
})

const InputField = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px', // Same border radius for the input
    '&:hover fieldset': {
      borderColor: '#000000' // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: '#000000' // Focused border color
    }
  },
  '& .MuiInputLabel-root': {
    color: '#333333' // Label color
  },
  '& .MuiInputBase-input': {
    padding: '10px' // Ensure input text is properly spaced
  }
})

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

// Feature cards styling
const FeatureCard = styled(Card)({
  backgroundColor: '#000000',
  height: '200px',
  width: '250px',
  color: '#ffffff',
  borderRadius: '50%',
  padding: '1.5rem',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column', // Ensure the content stacks vertically
  justifyContent: 'center', // Vertically center the content
  alignItems: 'center', // Horizontally center the content
  '&:hover': {
    transform: 'scale(1.05)'
  }
})

const CardTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  fontFamily: '"Cambria", serif', // Cambria font family

  color: '#ffffff',
  marginBottom: '1rem'
})

const CardContentText = styled(Typography)({
  color: '#dddddd',
  fontFamily: '"Cambria", serif' // Cambria font family
})

const HomePage: React.FC = () => {
  const navigate = useNavigate()

  const handleStartNowClick = () => {
    // Navigate to MainLayout
    navigate('/main-layout')
  }
  return (
    <Root>
      {/* Hero Section */}
      <Box sx={{ padding: '3rem', borderRadius: '10px', backgroundColor: '#ffffff' }}>
        <Title variant="h1">Faseeh</Title>
        <Subtitle variant="h6">Your all-in-one video transcription platform</Subtitle>

        {/* Merged Input and Button */}
        <InputFieldWrapper>
          <InputField
            variant="outlined"
            placeholder="Paste your video link here..."
            fullWidth
            sx={{ fontFamily: '"Cambria", serif' }}
          />
          <SubmitButton variant="contained">Generate</SubmitButton>
        </InputFieldWrapper>
      </Box>

      {/* Feature Cards Layout with Flexbox or Grid */}
      <Grid container spacing={4} justifyContent="center" mt={4}>
        <Grid item>
          <FeatureCard>
            <CardContent>
              <CardTitle variant="h5">Video Transcription</CardTitle>
              <CardContentText variant="body2">
                Automatically transcribe your videos for better accessibility.
              </CardContentText>
            </CardContent>
          </FeatureCard>
        </Grid>
        <Grid item>
          <FeatureCard>
            <CardContent>
              <CardTitle variant="h5">Quiz Generation</CardTitle>
              <CardContentText variant="body2">
                Generate quizzes based on your video's content for interactive learning.
              </CardContentText>
            </CardContent>
          </FeatureCard>
        </Grid>
        <Grid item>
          <FeatureCard>
            <CardContent>
              <CardTitle variant="h5">Grammar & Factuality Feedback</CardTitle>
              <CardContentText variant="body2">
                Receive grammar and factuality feedback to enhance your learning.
              </CardContentText>
            </CardContent>
          </FeatureCard>
        </Grid>
        <Grid item>
          <FeatureCard>
            <CardContent>
              <CardTitle variant="h5">Dictionary Integration</CardTitle>
              <CardContentText variant="body2">
                Easily access word meanings directly in the subtitles.
              </CardContentText>
            </CardContent>
          </FeatureCard>
        </Grid>
        <Grid item>
          <FeatureCard>
            <CardContent>
              <CardTitle variant="h5">Video Difficulty Estimation</CardTitle>
              <CardContentText variant="body2">
                Get a difficulty rating for each video (A1, A2, ..., C2).
              </CardContentText>
            </CardContent>
          </FeatureCard>
        </Grid>
      </Grid>
      {/* Optional Call-to-Action */}
      <Box mt={4}>
        <SubmitButton variant="contained" onClick={handleStartNowClick}>
          Get Started Now
        </SubmitButton>
      </Box>
    </Root>
  )
}

export default HomePage

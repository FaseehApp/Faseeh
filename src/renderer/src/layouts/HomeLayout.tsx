import React, { useState } from 'react'
import { Box, CardContent, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {
  Root,
  Title,
  Subtitle,
  InputFieldWrapper,
  InputField,
  SubmitButton,
  FeatureCard,
  CardTitle,
  CardContentText
} from '../components/styled/StyledComponents' // Adjust the import according to your project structure

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [videoLink, setVideoLink] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLink(event.target.value)
  }

  const handleSubmit = () => {
    const videoIdMatch = videoLink.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    )
    if (videoIdMatch && videoIdMatch[1]) {
      const videoId = videoIdMatch[1]
      localStorage.setItem('videoId', videoId)
      navigate('/main-layout')
    } else {
      alert('Invalid video link')
    }
  }

  const handleStartNowClick = () => {
    navigate('/main-layout')
  }

  const renderFeatureCard = (title: string, content: string) => (
    <Grid item>
      <FeatureCard>
        <CardContent>
          <CardTitle variant="h5">{title}</CardTitle>
          <CardContentText variant="body2">{content}</CardContentText>
        </CardContent>
      </FeatureCard>
    </Grid>
  )

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
            value={videoLink}
            onChange={handleInputChange}
          />
          <SubmitButton variant="contained" onClick={handleSubmit}>
            Generate
          </SubmitButton>
        </InputFieldWrapper>
      </Box>

      {/* Feature Cards Layout with Flexbox or Grid */}
      <Grid container spacing={4} justifyContent="center" mt={4}>
        {renderFeatureCard(
          'Video Transcription',
          'Automatically transcribe your videos for better accessibility.'
        )}
        {renderFeatureCard(
          'Quiz Generation',
          "Generate quizzes based on your video's content for interactive learning."
        )}
        {renderFeatureCard(
          'Grammar & Factuality Feedback',
          'Receive grammar and factuality feedback to enhance your learning.'
        )}
        {renderFeatureCard(
          'Dictionary Integration',
          'Easily access word meanings directly in the subtitles.'
        )}
        {renderFeatureCard(
          'Video Difficulty Estimation',
          'Get a difficulty rating for each video (A1, A2, ..., C2).'
        )}
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

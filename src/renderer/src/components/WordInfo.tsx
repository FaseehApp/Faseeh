// src/components/WordInfo.tsx
import React from 'react'
import { Box, Typography, Divider, Paper } from '@mui/material'

interface WordInfoProps {
  definition: string
  synonyms: string[]
  opposites: string[]
}

const WordInfo: React.FC<WordInfoProps> = ({ definition, synonyms, opposites }) => {
  return (
    <Box
      sx={{
        width: '190px', // Take full width of the parent container
        height: '87.5vh',
        backgroundColor: '#2c2c2c', // Same color as the left sidebar
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.2)', // More prominent shadow for depth
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        justifyContent: 'flex-start',
        alignItems: 'flex-start', // Align content to the left
        color: 'white',
        gap: '20px' // Add some gap between sections for better spacing
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 'bold', fontFamily: '"Cambria", serif', color: '#f29f67' }}
      >
        {'Word'} Info
      </Typography>
      <Divider sx={{ my: 2, borderColor: '#f29f67' }} /> {/* Gold divider line */}
      {/* Definition Section */}
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: '"Cambria", serif' }}>
          Definition:
        </Typography>
        <Typography variant="body2">
          {definition || 'Content for the definition of the word will go here.'}
        </Typography>
      </Box>
      <Divider sx={{ my: 2, borderColor: '#f29f67' }} /> {/* Gold divider line */}
      {/* Synonyms Section */}
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: '"Cambria", serif' }}>
          Synonyms:
        </Typography>
        <Typography variant="body2">
          {synonyms.length > 0 ? synonyms.join(', ') : 'Synonyms will appear here.'}
        </Typography>
      </Box>
      <Divider sx={{ my: 2, borderColor: '#f29f67' }} /> {/* Gold divider line */}
      {/* Opposites Section */}
      <Box sx={{ width: '100%' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', fontFamily: '"Cambria", serif' }}>
          Opposites:
        </Typography>
        <Typography variant="body2">
          {opposites.length > 0 ? opposites.join(', ') : 'Opposites will appear here.'}
        </Typography>
      </Box>
    </Box>
  )
}

export default WordInfo

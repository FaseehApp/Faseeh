import React, { useState } from 'react'
import { Box, Paper, Typography } from '@mui/material'
import OptionsSideBar from '../components/OptionsSideBar' // Sidebar component
import WordInfo from '../components/WordInfo' // WordInfo component
import MediaPlayer from '../components/MediaPlayer' // WordInfo component

// Unified container style for Sidebar and Media Player
const ContainerStyle = {
  backgroundColor: '#000000', // Black background
  color: 'white', // White text for visibility
  padding: '20px',
  height: '100%',
  borderRadius: '12px', // Rounded corners
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
}

const MainLayout: React.FC = () => {
  // Sample data for now, these would be updated dynamically
  const [definition, setDefinition] = useState('The word is a placeholder for now.')
  const [synonyms, setSynonyms] = useState(['Example', 'Sample', 'Placeholder'])
  const [opposites, setOpposites] = useState(['Contrary', 'Antonym'])

  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: '20px', gap: '20px' }}>
      {/* Sidebar (Left) */}
      <Box sx={{ width: '20%' }}>
        <Paper elevation={3}>
          <OptionsSideBar />
        </Paper>
      </Box>

      {/* Media Player Section */}
      <Box sx={{ width: '60%' }}>
        <Paper elevation={3} sx={ContainerStyle}>
          {/* Media Player Title */}
          <Typography
            variant="h4"
            sx={{
              color: '#f29f67',
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            Let's turn you into Faseeh
          </Typography>

          {/* Media Player Component */}
          <MediaPlayer src={'www.youtube.com'} />
        </Paper>
      </Box>

      {/* Sidebar (Right - Word Info) */}
      <Box sx={{ width: '20%' }}>
        <Paper elevation={3}>
          <WordInfo definition={definition} synonyms={synonyms} opposites={opposites} />
        </Paper>
      </Box>
    </Box>
  )
}

export default MainLayout

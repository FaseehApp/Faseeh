// src/components/Layout.tsx
import React from 'react'
import { Box, Drawer, Grid, Container, Typography } from '@mui/material'
import { styled } from '@mui/system'

// You can style the sidebar here or use a MUI component like Drawer.
const Sidebar = styled('div')({
  width: '250px',
  height: '100vh',
  backgroundColor: '#f4f4f4',
  padding: '20px'
})

const MediaPlayerContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
})

const WordInfoContainer = styled('div')({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
})

const Layout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar>
        <Typography variant="h6" gutterBottom>
          Sidebar
        </Typography>
        {/* Add more sidebar content here */}
      </Sidebar>

      {/* Main Content Area (Center) */}
      <Grid container spacing={2} sx={{ flexGrow: 1, padding: '20px' }}>
        <Grid item xs={12} md={8}>
          {/* Media Player and Transcription Section */}
          <MediaPlayerContainer>
            <Typography variant="h6" gutterBottom>
              Media Player
            </Typography>
            <Typography variant="body1">Transcription Area</Typography>
            {/* Embed your media player component here */}
          </MediaPlayerContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          {/* Word Info Section */}
          <WordInfoContainer>
            <Typography variant="h6" gutterBottom>
              Word Definition & Info
            </Typography>
            <Typography variant="body1">Definition</Typography>
            <Typography variant="body2">Synonym</Typography>
            <Typography variant="body2">Opposite</Typography>
          </WordInfoContainer>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Layout

// src/components/OptionsSideBar.tsx
import React from 'react'
import { Box, IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import { useNavigate } from 'react-router-dom'

const OptionsSideBar: React.FC = () => {
  const navigate = useNavigate()

  const handleStartNowClick = () => {
    // Navigate to MainLayout
    navigate('/')
  }
  return (
    <Box
      sx={{
        width: '240px', // Fixed sidebar width
        height: '90vh',
        backgroundColor: '#2c2c2c',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        paddingBottom: '20px' // Add padding to prevent sticking to the bottom
      }}
    >
      {/* Home Button */}
      <IconButton
        sx={{
          backgroundColor: '#808080',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '30px',
          '&:hover': {
            backgroundColor: '#555'
          }
        }}
      >
        <HomeIcon sx={{ color: 'white', fontSize: '30px' }} onClick={handleStartNowClick} />
      </IconButton>

      {/* Settings Button */}
      <IconButton
        sx={{
          backgroundColor: '#808080',
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#555'
          }
        }}
      >
        <SettingsIcon sx={{ color: 'white', fontSize: '30px' }} />
      </IconButton>
    </Box>
  )
}

export default OptionsSideBar

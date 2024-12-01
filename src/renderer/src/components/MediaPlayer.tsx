// src/components/MediaPlayer.tsx
import React from 'react'

interface MediaPlayerProps {
  src: string // The source of the media (audio or video)
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ src }) => {
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#2c2c2c',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '800px',
        margin: 'auto',
        textAlign: 'center'
      }}
    >
      {/* Title */}
      <h1
        style={{
          color: '#f29f67',
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}
      >
        Let's turn you into Faseeh
      </h1>

      {/* Placeholder for the Media Player */}
      <div
        style={{
          backgroundColor: '#808080',
          width: '400px',
          height: '200px',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          fontSize: '20px'
        }}
      >
        <p>Media Player Placeholder</p>
      </div>

      {/* Audio Player (placeholder for now) */}
      <audio controls style={{ width: '100%', marginTop: '20px' }}>
        <source src={src} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  )
}

export default MediaPlayer

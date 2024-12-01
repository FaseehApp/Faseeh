// src/components/WordInfo.tsx
import React, { Key } from 'react'
import { Box, Typography, Divider, Paper } from '@mui/material'
import { Book } from 'lucide-react'

interface WordInfoProps {
  definition: string
  synonyms: string[]
  opposites: string[]
}

const WordInfo: React.FC<WordInfoProps> = ({ definition, synonyms, opposites }) => {
  return (
    <div className="w-auto min-h-screen flex flex-col justify-center items-start gap-5 border-l border-zinc-100">
      <div className="w-full">
        <p className="text-2xl bg-orange-400 px-5 py-3 text-white font-bold w-full flex items-center gap-2">
          {' '}
          <Book />
          Dictionnary
        </p>
      </div>
      <div className="pr-8 pl-2 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">Definition</p>
          <p className="text-md">{definition}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">Synonymes</p>
          <div className="flex flex-wrap gap-2">
            {synonyms.map((synonym: string, key: Key) => {
              return (
                <p className="text-md" key={key}>
                  #{synonym}
                </p>
              )
            })}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xl font-bold">Opposites</p>
          <div className="flex flex-wrap gap-2">
            {opposites.map((opposite: string, key: Key) => {
              return (
                <p className="text-md" key={key}>
                  #{opposite}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WordInfo

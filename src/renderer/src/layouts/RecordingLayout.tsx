import OptionsSideBar from '@renderer/components/OptionsSideBar'
import React, { useState, useRef } from 'react'
import { Feedback } from 'src/types/types'

export const RecordingLayout: React.FC = () => {
  const [recording, setRecording] = useState<boolean>(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [timeline, setTimeline] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [highlightedSentence, setHighlightedSentence] = useState<Feedback | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [blobElem, setBlobElem] = useState<Blob | null>(null)
  const mediaChunks = useRef<Blob[]>([])
  const exampleText = `The wonders of nature never cease to amaze those who take the time to explore them.`

  const handleStartRecording = async () => {
    if (recording) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)

      recorder.ondataavailable = (event: BlobEvent) => {
        mediaChunks.current.push(event.data)
      }

      recorder.onstop = () => {
        const blob = new Blob(mediaChunks.current, { type: 'audio/webm' })
        setBlobUrl(URL.createObjectURL(blob))
        setBlobElem(blob)
        mediaChunks.current = []
        setTimeline([])
      }

      recorder.onstart = () => {
        setTimeline(['Recording started...'])
      }

      recorder.onpause = () => {
        setTimeline((prev) => [...prev, 'Recording paused.'])
      }

      recorder.onresume = () => {
        setTimeline((prev) => [...prev, 'Recording resumed.'])
      }

      recorder.start()
      setMediaRecorder(recorder)
      setRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const handleStopRecording = () => {
    if (!recording || !mediaRecorder) return

    mediaRecorder.stop()
    setRecording(false)
  }

  const handleSubmit = async () => {
    if (!blobElem) {
      setError('No audio recorded. Please record your speech first.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Convert Blob to ArrayBuffer
      const arrayBuffer = await blobElem.arrayBuffer()

      // Call the Electron API with the ArrayBuffer
      const feedbackResponse = await window.electronAPI.getPronDiagnosis(arrayBuffer, exampleText)
      console.log(feedbackResponse)
      // Update feedback state with the API response
      setFeedback(feedbackResponse.feedback)
      setHighlightedSentence(feedbackResponse.highlightedSentence)
    } catch (err) {
      setError('Failed to process the audio. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex">
      <div className="flex-2">
        <OptionsSideBar />
      </div>
      <div className="flex flex-col flex-1 items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-orange-500 mb-8">Pronunciation Diagnosis</h1>
        <p className="mb-4 text-gray-700 text-center max-w-md">
          Example text: <span className="font-bold text-orange-500">{exampleText}</span>
        </p>
        <div className="flex flex-col items-center space-y-4">
          {!recording ? (
            <button
              onClick={handleStartRecording}
              className="px-4 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition"
            >
              Start Recording
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="px-4 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition"
            >
              Stop Recording
            </button>
          )}
          {blobUrl && (
            <audio
              controls
              src={blobUrl}
              className="mt-4 rounded shadow-lg border border-orange-500"
            >
              Your browser does not support the audio element.
            </audio>
          )}
          <button
            onClick={handleSubmit}
            className={`px-4 py-2 text-white font-bold rounded transition ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Validate Speech'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="mt-8 w-full max-w-md">
          <h2 className="text-lg font-bold text-orange-500">Timeline:</h2>
          <div className="bg-white p-4 rounded shadow-lg border border-gray-200 mt-2">
            {timeline.length === 0 ? (
              <p className="text-gray-400 italic">No events yet.</p>
            ) : (
              <ul className="list-disc ml-4">
                {timeline.map((event, idx) => (
                  <li key={idx} className="text-gray-600">
                    {event}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {feedback && (
          <div className="my-8 w-full max-w-md bg-white p-4 rounded shadow-lg border border-orange-500">
            <h2 className="text-lg font-bold text-orange-500">Feedback:</h2>
            <p className="mt-2">
              <strong>Explanation:</strong> {feedback.explanation}
            </p>
            <p className="mt-2">
              {/* <strong>Mistaken Words:</strong> {feedback.mistaken_words.join(', ')} */}
            </p>
            <div className="mt-2">
              <strong>Pronunciation Guide:</strong>
              <ul className="list-disc ml-4">
                {Object.entries(feedback.pronunciation_guide).map(([word, guide], idx) => (
                  <li key={idx} className="text-gray-600">
                    <strong>{word}:</strong> {guide}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-2">
              <strong>Suggestions:</strong> {feedback.suggestions}
            </p>
            {/* <p className="mt-4">
              <strong>Highlighted Sentence:</strong>
            </p> */}
            {/* <div
            className="p-2 bg-orange-100 rounded mt-2"
            dangerouslySetInnerHTML={{ __html: feedback.highlightedSentence }}
          ></div> */}
          </div>
        )}
      </div>
    </div>
  )
}

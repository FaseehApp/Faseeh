import { QuestionComponentProp } from '@renderer/types/types'
import { useState } from 'react'
import { FactCheckRequestEvent, GrammarEvalRequestEvent } from '../../../types/events'
import { FactCheckFeedback, GrammarFeedback, Transcript } from '../../../types/types'

const QuestionComponent: React.FC<QuestionComponentProp> = ({ question }) => {
  const [grammarEvaluation, setGrammarEvaluation] = useState<GrammarFeedback>()
  const [userInput, setUserInput] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const videoId = localStorage.getItem('videoId')
  const json = JSON.parse(localStorage.getItem(`transcription_${videoId}`)!)
  const transcript = new Transcript(json.text, json.segments)

  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const grammarFeedbackResponse = await window.api.evalGrammar(
        new GrammarEvalRequestEvent(userInput)
      )

      console.log(grammarFeedbackResponse)
      setGrammarEvaluation(grammarFeedbackResponse)
      console.log(grammarEvaluation)

      setIsAnswered(true)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-5">
      <div className="">
        <p className="text-lg">{question.prompt}</p>
        {isAnswered ? (
          grammarEvaluation && (
            <div>
              <div>
                <p>Original Text</p>
                <p>{grammarEvaluation.original_text}</p>
              </div>
              <div>
                <p>Corrected Text</p>
                <p>{grammarEvaluation.corrected_text}</p>
              </div>
              <div>
                <p>Feedback</p>
                <p>Error: {grammarEvaluation.feedback.toString()}</p>
              </div>
            </div>
          )
        ) : (
          <div>
            <input
              className="py-2 px-1 my-2 w-full border rounded border-zinc-200"
              type="text"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value)
              }}
              placeholder="Give a 2-3 lines answer"
            />
            <button
              className={`bg-orange-200 px-4 py-2 rounded-lg ${isLoading ? 'disabled:bg-gray-400' : ''}`}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {!isLoading ? 'Evaluate' : <span className="loading loading-dots loading-md"></span>}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export { QuestionComponent }

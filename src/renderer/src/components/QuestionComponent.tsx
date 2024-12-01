import { QuestionComponentProp } from '@renderer/types/types'
import { useEffect, useState } from 'react'
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
      console.log(userInput)

      console.log("grammar feedback ", grammarFeedbackResponse)
      setGrammarEvaluation(grammarFeedbackResponse)

      setIsAnswered(true)
    } catch (e) {
      console.error(e)
      alert("An error occurred while evaluating grammar.")
    } finally {
      setIsLoading(false)
    }
  }

useEffect(() => {
  console.log("Updated grammar eval", grammarEvaluation);
}, [grammarEvaluation]);

  return (
    <div className="p-5">
      <div className="">
        <p className="text-lg">{question.prompt}</p>
        {isAnswered ? (
          grammarEvaluation && (
            <div className="space-y-4">
              <div className="p-3 rounded">
                <p className="font-semibold">Original Text:</p>
                <p>{grammarEvaluation.feedback.original_text}</p>
              </div>
              <div className="p-3 rounded ">
                <p className="font-semibold">Corrected Text:</p>
                <p>{grammarEvaluation.feedback.corrected_text}</p>
              </div>
              <div className="p-3 rounded">
                <p className="font-semibold">Feedback:</p>
                {Array.isArray(grammarEvaluation.feedback.feedback) ? (
                  grammarEvaluation.feedback.length > 0 ? (
                    grammarEvaluation.feedback.map((item, index) => (
                      <div key={index} className="mt-2">
                        <p>Type: {item.type}</p>
                        <p>Error: {item.error}</p>
                        {item.explanation && (
                          <p>Explanation: {JSON.stringify(item.explanation)}</p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="mt-2">
                      <p className="text-green-600">No grammar errors found!</p>
                    </div>
                  )
                ) : (
                  <div className="mt-2">
                    <p className="text-red-600">Invalid feedback format received</p>
                    <pre className="p-2 mt-1 text-sm text-gray-600 rounded">
                      {JSON.stringify(grammarEvaluation.feedback, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <div>
            <input
              className="w-full px-1 py-2 my-2 border rounded border-zinc-200"
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

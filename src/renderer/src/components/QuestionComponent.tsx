import { QuestionComponentProp } from '@renderer/types/types'
import { useState } from 'react'
import { GrammarEvalErrorEvent } from 'src/types/events'
import { GrammarFeedback } from 'src/types/types'

const QuestionComponent: React.FC<QuestionComponentProp> = ({ question }) => {
  const [evaluation, setEvaluation] = useState<GrammarFeedback>()
  const [userInput, setUserInput] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (): Promise<void> => {
    setIsLoading(true)
    try {
      console.log(userInput)
      console.log("----------------")
      const response: GrammarFeedback = await window.api.evalGrammar(userInput)
      setEvaluation(response)
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
        {/* <p className="bg-red-50 p-5">{question.skills}</p> */}
        {/* <p className="bg-red-50 p-5 w-fit">{question.difficulty}</p> */}
        {isAnswered ? (
          evaluation && (
            <div>
              <div>
                <p>userInput</p>
              </div>
              <div>
                <p>Corrected Text</p>
                <p>{evaluation.corrected_text}</p>
              </div>
              <div>
                <p>Feedback</p>
                <p>{evaluation.feedback['error']}</p>
                <p>{evaluation.feedback['type']}</p>
                <p>{evaluation.feedback['explanation']['problem']}</p>
                <p>{evaluation.feedback['explanation']['rule']}</p>
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

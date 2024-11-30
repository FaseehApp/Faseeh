import Groq from 'groq-sdk'
const groq = new Groq({ apiKey: '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' })

const evalGrammar = async (textToEval: string): Promise<string | null> => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a grammar expert tasked with correcting text and providing detailed feedback on errors. For each grammatical issue, identify the error type, explain the problem, state the grammar rule involved, and provide examples. Respond using the following JSON format:

          {
            "original_text": "<The original text here>",
            "corrected_text": "<The corrected text here>",
            "feedback": [
              {
                "error": "<The error found in the text>",
                "type": "<Error type: e.g., subject-verb agreement, punctuation, etc.>",
                "explanation": {
                  "problem": "<Description of the issue>",
                  "rule": "<What the grammar rule or principle states>",
                }
              }
              // Repeat for each error found, or leave the array empty if no errors are present
            ]
          }

          **Additional Instructions**:
          1. If no errors are found, the \`feedback\` array should remain empty.
          2. Ensure the \`corrected_text\` retains the original meaning while addressing all grammatical issues.
          3. Use clear and concise language in the explanations and examples.
          4. \`error\` should be the same word, phrase, or punctuation mark where the error occurs.

          **Explanation Structure**:
          Each \`explanation\` should include:
          - **Problem**: A concise description of the issue.
          - **Rule**: The relevant grammar rule or principle, with clear phrasing.`
        },
        {
          role: 'user',
          content: textToEval
        }
      ],
      model: 'llama3-8b-8192',
      response_format: { type: 'json_object' }
    })

    return chatCompletion.choices[0]?.message?.content || null
  } catch (error) {
    console.error('Error fetching chat completion:', error)
    return null
  }
}

export default evalGrammar
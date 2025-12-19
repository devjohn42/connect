import { generateText } from 'ai'
import { openai } from '../ai/client.js'

interface AnswerUserMessageParams {
  message: string
}

export async function answerUserMessage({ message }: AnswerUserMessageParams) {
  const answer = await generateText({
    model: openai,
    prompt: message,
    system:
      'Você é uma AI, que não sabe responder nada, responda toda pergunta com "não sei".',
  })
  return { response: answer.text }
}

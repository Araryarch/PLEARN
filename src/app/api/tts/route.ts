import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

function createWavHeader(
  dataLength: number,
  numChannels: number,
  sampleRate: number,
  bitsPerSample: number,
) {
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8
  const blockAlign = (numChannels * bitsPerSample) / 8
  const buffer = Buffer.alloc(44)
  buffer.write('RIFF', 0)
  buffer.writeUInt32LE(36 + dataLength, 4)
  buffer.write('WAVE', 8)
  buffer.write('fmt ', 12)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(numChannels, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(byteRate, 28)
  buffer.writeUInt16LE(blockAlign, 32)
  buffer.writeUInt16LE(bitsPerSample, 34)
  buffer.write('data', 36)
  buffer.writeUInt32LE(dataLength, 40)
  return buffer
}

function convertToWav(rawBase64: string) {
  const rawBuffer = Buffer.from(rawBase64, 'base64')
  const wavHeader = createWavHeader(rawBuffer.length, 1, 24000, 16)
  return Buffer.concat([wavHeader, rawBuffer]).toString('base64')
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json()
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    })
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['audio'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: 'Zephyr',
            },
          },
        },
      },
      contents: [{ role: 'user', parts: [{ text }] }],
    })
    const inlineData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData
    if (!inlineData || !inlineData.data) {
      return NextResponse.json(
        { error: 'Tidak ada hasil audio' },
        { status: 500 },
      )
    }

    const wavBase64 = convertToWav(inlineData.data)
    return NextResponse.json({ audio: wavBase64, mimeType: 'audio/wav' })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Gagal generate TTS' }, { status: 500 })
  }
}

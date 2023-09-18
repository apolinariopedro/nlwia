import { Pipeline, pipeline } from "@xenova/transformers"

export async function transcribe(audio) {
  try {
    console.log("Realizando a transcrição...")

    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )
    const transcription = await transcribe(audio, {
      chunk_lenght_s: 30,
      stride_lenght_s: 5,
      language: "portuguese",
      task: "transcribe",
    })

    console.log("Transcrição realizada com sucesso.")

    return transcription?.text.replace("[Música]", "")
  } catch (error) {
    console.log("Não foi possível ralizar a transcrição.", error)
    throw new Error(error)
  }
}

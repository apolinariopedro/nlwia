import { Pipeline, pipeline } from "@xenova/transformers"

export async function summarize(text) {
  try {
    console.log("Realizando o resumo...")

    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    )
    const output = await generator(text)

    console.log("Resumo realizado com sucesso.")

    return output[0].summary_text
  } catch (error) {
    console.log("Não foi possível ralizar o resumo.", error)
    throw new Error(error)
  }
}

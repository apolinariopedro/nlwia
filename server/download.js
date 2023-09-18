import ytdl from "ytdl-core"
import fs from "fs"
import { error } from "console"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoUrl = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando download do vídeo: " + videoId)

    ytdl(videoUrl, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000

        if (seconds > 60) {
          throw new Error("A duração deste vídeo é maior do que 60 segundos.")
        }
      })

      .on("end", () => {
        console.log("Download do vídeo finalizado.")
        resolve()
      })
      
      .on("error", (error) => {
        console.log(
          "Não foi possível realizar o download do vídeo. Detalhes do erro: ",
          error
        )
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })

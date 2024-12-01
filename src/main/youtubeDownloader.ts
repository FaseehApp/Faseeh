import { YtdlCore } from '@ybd-project/ytdl-core'

const DownloadVideo = async (vidoId: string): Promise<ReadableStream<unknown>> => {
  const ytdl = new YtdlCore()

  const url = `https://www.youtube.com/watch?v=${vidoId}`
  try {
    const stream = await ytdl.download(url, {
      quality: 'highestaudio',
      filter: 'audioonly'
    })
    return stream
  } catch (error) {
    console.error('Error fetching video info:', error)
    throw error
  }
}

export default DownloadVideo


const getTranscription = async (videoId: string) => {
    try {
        const transcription = await window.electron.ipcRenderer.invoke("get-transcription", videoId);
        return transcription;
    } catch (error) {
        console.error("Failed to get YouTube transcription:", error);
        throw error;
    }
};

export default getTranscription;

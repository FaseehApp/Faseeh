const BASE_URL = ' http://127.0.0.1:8787';

const getTranscription = async (videoId: string) => {
    try {

        const transcriptionUrl = `${BASE_URL}/transcription/${videoId}`;
        const response = await fetch(transcriptionUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const transcription = await response.json();
        return transcription;
    } catch (error) {
        console.error("Failed to get YouTube transcription:", error);
        throw error;
    }
};

export default getTranscription;

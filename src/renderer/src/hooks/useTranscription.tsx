import { useEffect, useState, RefObject, useMemo } from "react";

interface TranscriptionSegment {
  startTime: number;
  endTime: number;
  text: string;
}

function useTranscription(jsonFilePath: string, currentTime: number): string {
    const [transcriptionData, setTranscriptionData] = useState<TranscriptionSegment[]>([]);

    useEffect(() => {
        import(jsonFilePath)
            .then((data) => {
                setTranscriptionData(data.default);
            })
            .catch((error) => {
                console.error('Failed to load transcription data:', error);})
    }, [jsonFilePath]);
    
    console.log(transcriptionData);
    const currentTranscription = useMemo(() => {
        return transcriptionData.find(
            t => currentTime >= t.startTime && currentTime <= t.endTime
        );
    }, [transcriptionData, currentTime]);



    return currentTranscription?.text ?? '';};


export { useTranscription };
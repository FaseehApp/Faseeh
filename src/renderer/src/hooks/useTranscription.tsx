import { useEffect, useState, useMemo } from "react";
import transcription from './test.json';
interface TranscriptionSegment {
  startTime: number;
  endTime: number;
  text: string;
}

function useTranscription( currentTime: number): string {
    const [transcriptionData, setTranscriptionData] = useState<TranscriptionSegment[]>([]);
    useEffect(() => {
        setTranscriptionData(transcription);
      }, []);    
    const currentTranscription = useMemo(() => {
        return transcriptionData.find(
            t => currentTime >= t.startTime && currentTime <= t.endTime
        );
    }, [transcriptionData, currentTime]);



    return currentTranscription?.text ?? '';};


export { useTranscription };
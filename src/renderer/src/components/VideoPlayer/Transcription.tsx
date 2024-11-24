import { useTranscription } from "@renderer/hooks/useTranscription";
interface TranscriptionProps {
    currentTime: number;
}

const Transcription: React.FC<TranscriptionProps> = ({ currentTime }) => {
    const transcription = useTranscription( currentTime);
    return (
        <div className="absolute transform -translate-x-1/2 bottom-10 left-1/2">
            <div className="px-4 py-2 text-lg text-white bg-black rounded bg-opacity-70">
            <p className="text-center select-text " >{transcription}</p>
            </div>
        </div>
    );
};

export default Transcription;

